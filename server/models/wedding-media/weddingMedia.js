'use strict'
const AWS = require('aws-sdk')
const promisify = require('es6-promisify')
const _ = require('lodash')

const s3 = new AWS.S3()

const listObjects = promisify(s3.listObjects, s3)
const BUCKET_NAME = 'anna-tamas-eskuvo'

/**
 *
 * @param {string} creator: Either professional or user
 * @param {string} type: Either photos or videos
 * @returns {Promise<[string]>}
 */
function listMediaByType (creator, type) {
  return listObjects({
    Bucket: BUCKET_NAME,
    Prefix: `${creator}/${type}/`
  })
    .then((objects) => {
      return _.chain(objects.Contents)
        .tail()
        .map('Key')
        .value()
    })
}

/**
 * @typedef {{ AcceptRanges: string, LastModified: Date, ContentLength: Number, ETag: string, ContentType: string, Metadata: Object, Body: Buffer }} S3Object
 */

/**
 *
 * @param name
 * @returns {ReadStream}
 */
function getMediaByKey (name) {
  return s3.getObject({
    Bucket: BUCKET_NAME,
    Key: name
  }).createReadStream()
}

module.exports = {
  listMediaByType,
  getMediaByKey
}

module.exports.s3 = s3
