'use strict'
module.exports = function getAllPhotoNames (models, req, res) {
  models.weddingMedia.getMediaByKey(req.params.photoKey)
    .pipe(res)
}
