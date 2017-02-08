'use strict'

window.onload = function () {
  var screenSize = window.innerWidth || document.body.clientWidth
  var isSmallScreen = screenSize <= 767

  var keepScrolling = document.querySelector('.wedding-keep-scrolling')
  var langSelector = document.querySelector('#navbar-lang')

  var navbar = document.querySelector('.navbar.hidden-xs')
  var navHome = document.querySelector('#navbar-home')
  var navInvitation = document.querySelector('#navbar-invitation')
  var navChurch = document.querySelector('#navbar-church')
  var navParty = document.querySelector('#navbar-party')

  var mainContent = document.querySelector('#wedding-main-container')
  var sectionHome = document.querySelector('#home')
  var sectionInvitation = document.querySelector('#invitation')
  var sectionChurch = document.querySelector('#church')
  var sectionParty = document.querySelector('#party')

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

  var sections = [
    sectionHome,
    sectionInvitation,
    sectionChurch,
    sectionParty
  ].sort(function sortByOffsetTop(a, b) {
    return a.offsetTop - b.offsetTop
  })

  sections.forEach(freezeSectionSize)

  toggleActiveNavLink(navbar, navLinks, sections)()
  window.addEventListener('scroll', toggleActiveNavLink(navbar, navLinks, sections))
  if (!isSmallScreen) {
    toggleStickyNavbar(navbar, sectionHome, mainContent)()
    window.addEventListener('scroll', toggleStickyNavbar(navbar, sectionHome, mainContent))
  }
}

function freezeSectionSize (section) {
  section.style.height = section.offsetHeight + 'px'
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

function toggleActiveNavLink (navbar, navLinks, sections) {
  return function onScroll(evt) {
    setTimeout(function () {
      if (navLinks.length !== sections.length) {
        console.error('navLinks', navLinks, 'screens', sections)
        throw new Error('navLinks and screens length does not match')
      }

      var navbarOffset = navbar.offsetHeight

      var scrollTop = document.body.scrollTop
      var currentSectionPosition
      var nextSectionPosition
      var currentNavLink$
      var nextNavLink$

      // TODO optimize
      for (var i = 0; i < navLinks.length - 1; ++i) {
        currentSectionPosition = sections[i].offsetTop - navbarOffset
        nextSectionPosition = sections[i + 1].offsetTop - navbarOffset
        currentNavLink$ = $(navLinks[i])
        nextNavLink$ = $(navLinks[i + 1])
        currentNavLink$.removeClass('active')
        if (scrollTop > currentSectionPosition && scrollTop <= nextSectionPosition) {
          currentNavLink$.addClass('active')
          nextNavLink$.removeClass('active')
        } else if (scrollTop > nextSectionPosition && i === navLinks.length - 2) {
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
