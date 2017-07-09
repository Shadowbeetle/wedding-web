'use strict'
function renderImages (imageContainer, imageKeys) {
  _.forEach(imageKeys, (imageKey) => {
    var img = document.createElement('img')
    img.src = '/api/media/professional/photos/' + encodeURIComponent(imageKey)
    img.className = 'wedding-media-item'
    imageContainer.appendChild(img)
  })
}

window.onload = function () {
  var imageContainer = document.querySelector('#media-container')
  $.get('/api/media/professional/photos')
    .then(renderImages.bind(null, imageContainer))
}
