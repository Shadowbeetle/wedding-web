'use strict'

window.onload = function () {
  var screenSize = window.innerWidth || document.body.clientWidth
  var isSmallScreen = screenSize <= 767
  $('pre').addClass('hljs wedding-church-code')
  $('code').addClass('hljs')

  var keepScrolling = document.querySelector('.wedding-keep-scrolling')
  var langSelector = document.querySelector('#navbar-lang')

  var navbar = document.querySelector('.navbar.hidden-xs')
  var navHome = document.querySelector('#navbar-home')
  var navInvitation = document.querySelector('#navbar-invitation')
  var navChurch = document.querySelector('#navbar-church')
  var navParty = document.querySelector('#navbar-party')

  var mainContent = document.querySelector('#wedding-main-container')
  var screenHome = document.querySelector('#home')
  var screenInvitation = document.querySelector('#invitation')
  var screenChurch = document.querySelector('#church')
  var screenParty = document.querySelector('#party')

  navHome.onclick = scrollTo('home')
  // title.onclick = scrollTo('home')
  navInvitation.onclick = scrollTo('invitation')
  keepScrolling.onclick = scrollTo('invitation')
  navChurch.onclick = scrollTo('church')
  navParty.onclick = scrollTo('party')

  var targetLang = langSelector.dataset.targetLang
  langSelector.onclick = toggleLanguage(targetLang)

  var navLinks = [
    navHome,
    navInvitation,
    navChurch,
    navParty
  ].sort(function sortByOffsetLeft(a, b) {
    return a.offsetLeft - b.offsetLeft
  })

  var screens = [
    screenHome,
    screenInvitation,
    screenChurch,
    screenParty
  ].sort(function sortByOffsetTop(a, b) {
    return a.offsetTop - b.offsetTop
  })

  toggleActiveNavLink(navbar, navLinks, screens)()
  window.addEventListener('scroll', toggleActiveNavLink(navbar, navLinks, screens))
  toggleStickyNavbar(navbar, screenHome, mainContent)()
  window.addEventListener('scroll', toggleStickyNavbar(navbar, screenHome, mainContent))
}

function scrollTo(id) {
  return function onScrollStart(evt) {
    var target = document.querySelector('#' + id)

    target.scrollIntoView({
      behavior: 'smooth'
    })

    window.location.hash = id
    evt.preventDefault()
  }
}

function toggleLanguage(targetLang) {
  return function onStartToggle(evt) {
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
  var urlHasKey = regex.test(window.location.search)
  if (window.location.search && urlHasKey) {
    window.location.search = window.location.search.replace(regex, '$1' + value)
  } else if (window.location.search && !urlHasKey) {
    window.location.search += '&lang=' + value
  } else {
    window.location.search = '?lang=' + value
  }
}

function toggleActiveNavLink(navbar, navLinks, screens) {
  return function onScroll(evt) {
    setTimeout(function () {
      if (navLinks.length !== screens.length) {
        console.error('navLinks', navLinks, 'screens', screens)
        throw new Error('navLinks and screens length does not match')
      }

      var navbarOffset = navbar.offsetHeight

      var scrollTop = document.body.scrollTop
      var currentScreenPosition
      var nextScreenPosition
      var currentNavLink$
      var nextNavLink$

      // TODO optimize
      for (var i = 0; i < navLinks.length - 1; ++i) {
        currentScreenPosition = screens[i].offsetTop - navbarOffset
        nextScreenPosition = screens[i + 1].offsetTop - navbarOffset
        currentNavLink$ = $(navLinks[i])
        nextNavLink$ = $(navLinks[i + 1])
        currentNavLink$.removeClass('active')
        if (scrollTop > currentScreenPosition && scrollTop <= nextScreenPosition) {
          currentNavLink$.addClass('active')
          nextNavLink$.removeClass('active')
        } else if (scrollTop > nextScreenPosition && i === navLinks.length - 2) {
          nextNavLink$.addClass('active')
        }
      }
    }, 100)
  }
}

function toggleStickyNavbar(navbar, screenHome, mainContent) {
  var navbar$ = $(navbar)
  var screenInvitation$ = $(mainContent)
  // TODO optimize
  return function stickNavbar(evt) {
    var screenSize = window.innerWidth || document.body.clientWidth
    var isSmallScreen = screenSize <= 767
    if (isSmallScreen) return;
    setTimeout(function () {
        if (document.body.scrollTop >= screenHome.offsetHeight) {
          navbar$.addClass('navbar-fixed-top')
          screenInvitation$.addClass('wedding-no-navbar')
        } else {
          navbar$.removeClass('navbar-fixed-top')
          screenInvitation$.removeClass('wedding-no-navbar')
        }
      }
    )
  }
}
