'use strict'

const debug = require('debug')('geo-from-ip:updater')
const fs = require('fs')
const util = require('util')
const streamPipeline = util.promisify(require('stream').pipeline)
const fetch = require('node-fetch')
const unzipper = require('unzipper')

if (process.env.MAXMIND_LICENSE_KEY === undefined) {
  debug('Seems like you forgot to add MAXMIND_LICENSE_KEY to your environment variables. Read more: https://github.com/VikramTiwari/geo-from-ip#how-to-use')
  process.exit(1)
}

const config = require('../mmdb/config')

/**
 * download database and unzip
 * 
 * @param {Object} database database to download
 */
async function download (database) {
  const zipped = `${config.dbDir}/${database.filename}.tar.gz`
  const response = await fetch(database.remote)
  await streamPipeline(
    response.body,
    fs.createWriteStream(zipped),
  )
  debug('download complete, unzipping')
  await streamPipeline(
    fs.createReadStream(zipped),
    unzipper.Extract({path: config.dbDir})
  )
}

/**
 * check if remote file is newer
 * 
 * @param  {Object}   database  database to download
 */
async function isRemoteNewer (database) {
  const mmdb = `${config.dbDir}/${database.filename}.mmdb`
  // if no file
  if (!fs.existsSync(mmdb)) {
    debug('file does not exist')
    return true
  } else {
    // if dest file is not a file, remove it
    const stats = fs.statSync(dest)
    if (!stats.isFile()) {
      debug(`${mmdb} is not a file`)
      fs.unlinkSync(mmdb, () => {
        debug(`${mmdb} deleted`)
      })
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'If-Modified-Since': stats.mtime.toUTCString()
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
  config.geoIpDbs.forEach(async database => {
    debug('database:', database)
    if (await isRemoteNewer(database)){
      debug('remote is newer, downloading')
      await download(database)
    }
  });
}

sync()

module.exports.sync = sync
