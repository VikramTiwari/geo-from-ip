'use strict'

const debug = require('debug')('geo-from-ip:updater')
const fs = require('fs')
const zlib = require('zlib')
const async = require('async')
const request = require('request')

if (process.env.MAXMIND_LICENSE_KEY === undefined) {
  debug('Seems like you forgot to add MAXMIND_LICENSE_KEY to your environment variables. Read more: https://github.com/VikramTiwari/geo-from-ip#how-to-use')
  process.exit(1)
}

const config = require('../mmdb/config')

/**
 * check if remote file is newer
 * @param  {String}   dest   path for local file
 * @param  {String}   remote path for remote file
 * @param  {Function} cb     true/false
 */
function isRemoteNewer (dest, remote, cb) {
  // if no file
  if (!fs.existsSync(dest)) {
    cb(null, false)
  } else {
    // if dest file is not a file, remove it
    const stats = fs.statSync(dest)
    if (!stats.isFile()) {
      debug(`${dest} is not a file`)
      fs.unlink(dest, () => {
        debug(`${dest} deleted`)
      })
    }

    request(
      {
        url: remote,
        headers: {
          'If-Modified-Since': stats.mtime.toUTCString()
        }
      },
      res => {
        if (res === null) {
          cb(null, true)
        } else {
          cb(null, false)
        }
      }
    )
  }
}

/**
 * downloads file
 * @param  {String}   dest   path for local file
 * @param  {String}   remote path for remote file
 * @param  {Function} cb     true/false
 */
function download (dest, remote, cb) {
  request
    .get(remote)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(dest))
    .on('error', error => {
      cb(error, false)
    })
    .on('finish', () => {
      cb(null, true)
    })
}

/**
 * runs downloads for all the files
 * @param  {String}   item   which database
 * @param  {Function} cb     true/false
 */
function dl (item, cb) {
  const dest = config.dbDir + '/' + item.local

  isRemoteNewer(dest, item.remote, (err, newer) => {
    if (err) {
      cb(err, false)
    } else if (!err && newer) {
      cb(null, false)
    } else if (!err && !newer) {
      // begin downloading
      debug(`downloading ${dest}`)

      download(dest, item.remote, (err, done) => {
        if (err) {
          cb(err, false)
        } else if (!err && !done) {
          cb(null, false)
        } else if (!err && done) {
          cb(null, true)
        }
      })
    }
  })
}

/**
 * Runs a sync function to download the files
 *
 * @param {any} cb
 */
function sync (cb) {
  async.eachSeries(config.geoIpDbs, dl, err => {
    cb(err, true)
  })
}

async.eachSeries(config.geoIpDbs, dl, err => {
  if (err) {
    debug(`🚨 Error: ${err}`)
  } else {
    debug(`🚀 All set!`)
  }
})

module.exports.sync = sync
