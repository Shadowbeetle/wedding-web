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

  var home = document.querySelector('.wedding-home')
  var navHome = document.querySelector('#navbar > ul > li:nth-child(1)')

  navHome.onclick = function scrollHome (evt) {
    home.scrollIntoView({
      behavior: 'smooth'
    })
  }
}