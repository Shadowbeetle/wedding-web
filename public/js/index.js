'use strict'

var idsAndHashes = {

}

window.onload = function () {
  var navHome = document.querySelector('#navbar-home')
  navHome.onclick = scrollTo('home')
  var title = document.querySelector('.navbar-header')
  title.onclick = scrollTo('home')

  var invitationHeaderLink = document.querySelector('#navbar-invitation')
  invitationHeaderLink.onclick = scrollTo('invitation')
  var keepScrolling = document.querySelector('.keep-scrolling')
  keepScrolling.onclick = scrollTo('invitation')

  var langSelector = document.querySelector('#navbar-lang')
  var targetLang = langSelector.dataset.targetLang
  langSelector.onclick = toggleLanguage(targetLang)
}

function scrollTo (id) {
  return function onScrollStart (evt) {
    var target = document.querySelector('#' + id)

    target.scrollIntoView({
      behavior: 'smooth'
    })

    window.location.hash = id
    evt.preventDefault()
  }
}

function toggleLanguage (targetLang) {
  return function onStartToggle (evt) {
    if (targetLang === 'en') {
      updateQueryString('lang', 'en')
    } else {
      updateQueryString('lang', 'hu')
    }
    evt.preventDefault()
  }
}

function updateQueryString(key, value) {
  var regex = new RegExp('(' + key + '=)\\w+')
  window.location.search = window.location.search.replace(regex, '$1' + value)
}