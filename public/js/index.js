'use strict'

var idsAndHashes = {

}

window.onload = function () {
  var keepScrolling = document.querySelector('.keep-scrolling')
  keepScrolling.onclick = scrollTo('invitation')
  var invitationHeaderLink = document.querySelector('#navbar > ul > li:nth-child(2)')
  invitationHeaderLink.onclick = scrollTo('invitation')

  var navHome = document.querySelector('#navbar > ul > li:nth-child(1)')
  navHome.onclick = scrollTo('home')
  var title = document.querySelector('.navbar-header')
  title.onclick = scrollTo('home')
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