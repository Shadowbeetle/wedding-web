'use strict'
window.onload = function () {
  var keepScrolling = document.querySelector('.keep-scrolling')
  var aboutUs = document.querySelector('#about-us')

  keepScrolling.onclick = function scrollNext (evt) {
    aboutUs.scrollIntoView({
      behavior: 'smooth'
    })

    window.location.hash = 'about-us'
  }

  var navHome = document.querySelector('#navbar > ul > li:nth-child(1)')
  navHome.onclick = scrollHome

  var title = document.querySelector('.navbar-header')
  title.onclick = scrollHome
}

function scrollHome (evt) {
  var home = document.querySelector('.wedding-home')
  home.scrollIntoView({
    behavior: 'smooth'
  })
  evt.preventDefault()
}


