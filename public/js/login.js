'use strict'
window.onload = function () {
  var contentContainer = document.querySelector('.wedding-home-content')
  var loginInput = document.querySelector('.wedding-login-input')
  var loginForm = document.querySelector('#login-form')

  contentContainer.addEventListener('click', function (evt) {
    loginInput.focus()
  })

  loginForm.addEventListener('submit', function (evt) {
    var enteredName = loginInput.value
    var url = 'guest-name/' + enteredName
    window.location.pathname += url
    evt.preventDefault()
  })
}