'use strict'

const debug = require('debug')('geo-from-ip:updater')
const fs = require('fs')
const path = require('path')
const util = require('util')
const streamPipeline = util.promisify(require('stream').pipeline)
const fetch = require('node-fetch')
const targz = require('targz')

if (process.env.MAXMIND_LICENSE_KEY === undefined) {
  debug(
    'Seems like you forgot to add MAXMIND_LICENSE_KEY to your environment variables. Read more: https://github.com/VikramTiwari/geo-from-ip#how-to-use',
  )
  process.exit(1)
}

const config = require('../mmdb/config')

/**
 * uncompresses the zipped file into folders and does cleanup of remaining files and folders
 * @param {String} zipped path to zipped file
 * @param {Object} database database object
 */
async function uncompress(zipped, database) {
  new Promise((resolve, reject) => {
    targz.decompress(
      {
        src: zipped,
        dest: config.dbDir,
        tar: {
          ignore: function (name) {
            return path.extname(name) !== '.mmdb'
          },
        },
      },
      (err) => {
        if (err) {
          debug(err)
          reject()
        } else {
          fs.readdirSync(config.dbDir).forEach((file) => {
            if (fs.lstatSync(`${config.dbDir}/${file}`).isDirectory()) {
              fs.renameSync(
                `${config.dbDir}/${file}/${database.filename}.mmdb`,
                `${config.dbDir}/${database.filename}.mmdb`,
              )
              fs.rmdirSync(`${config.dbDir}/${file}`)
            }
          })
          fs.unlinkSync(`${config.dbDir}/${database.filename}.tar.gz`)
          resolve()
        }
      },
    )
  })
}

/**
 * download database and unzip
 *
 * @param {Object} database database to download
 */
async function download(database) {
  const zipped = `${config.dbDir}/${database.filename}.tar.gz`
  const response = await fetch(database.remote)
  await streamPipeline(response.body, fs.createWriteStream(zipped))
  debug('download complete, uncompressing')
  await uncompress(zipped, database)
  debug('ready!')
}

/**
 * check if remote file is newer
 *
 * @param  {Object}   database  database to download
 */
async function isRemoteNewer(database) {
  const mmdb = `${config.dbDir}/${database.filename}.mmdb`
  // if no file
  if (!fs.existsSync(mmdb)) {
    debug('file does not exist')
    return true
  } else {
    // if dest file is not a file, remove it
    const stats = fs.statSync(mmdb)
    if (!stats.isFile()) {
      debug(`${mmdb} is not a file`)
      fs.unlinkSync(mmdb, () => {
        debug(`${mmdb} deleted`)
      })
    }

    const response = await fetch(database.remote, {
      method: 'GET',
      headers: {
        'If-Modified-Since': stats.mtime.toUTCString(),
      },
    })

    if (response === null) {
      return true
    }
    return false
  }
}

/**
 * sync databases to local
 */
function sync() {
  config.geoIpDbs.forEach(async (database) => {
    if (await isRemoteNewer(database)) {
      debug('remote is newer, downloading')
      await download(database)
    }
  })
}

sync()

module.exports.sync = sync
