'use strict'
window.onload = function () {
  var contentContainer = document.querySelector('.wedding-home-content')
  var loginInput = document.querySelector('.wedding-login-input')

  contentContainer.addEventListener('click', function (evt) {
    loginInput.focus()
  })
}