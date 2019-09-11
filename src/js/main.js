"use strict";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("serviceworker.js").then(
      function(registration) {
        // Registration was successful
        /* console.log("ServiceWorker registration successful with scope: ",
          registration.scope
        ); */
      },
      function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

/*
##     ##    ###    ########  ####    ###    ########  ##       ########  ######
##     ##   ## ##   ##     ##  ##    ## ##   ##     ## ##       ##       ##    ##
##     ##  ##   ##  ##     ##  ##   ##   ##  ##     ## ##       ##       ##
##     ## ##     ## ########   ##  ##     ## ########  ##       ######    ######
 ##   ##  ######### ##   ##    ##  ######### ##     ## ##       ##             ##
  ## ##   ##     ## ##    ##   ##  ##     ## ##     ## ##       ##       ##    ##
   ###    ##     ## ##     ## #### ##     ## ########  ######## ########  ######
*/

/********** OVERALL **********/

const pageContainer = document.querySelector('.page-container--js');
const portfolio = document.querySelector('.portfolio--js');
const gallery = document.querySelector('.gallery--js');
const about = document.querySelector('.about--js');
const form = document.querySelector('.form--js');

/********** PORTFOLIO **********/

const portfolioGridImages = document.querySelectorAll('.grid__image--js');

/********** FORM **********/

const submitButton = document.querySelector('.form__submit--js');

/********** VERIFICATION **********/

const checkboxContainer = document.querySelector('.form__verification--js');
const checkboxes = document.querySelectorAll('.checkbox__input--js');
const checkboxReject = document.querySelector('.checkbox__input--js-reject');
const checkboxAccept = document.querySelector('.checkbox__input--js-accept');
const checkboxOptional = document.querySelector('.checkbox__input--js-optional');
let responseState = "empty";

/********** MODAL BOX **********/

const modalContainer = document.querySelector('.modal--js');
const modalText = document.querySelector('.modal__text--js');
const modalClose = document.querySelector('.modal__close--js');

let timeoutHandler = null;

/********** MEDIA **********/
const tabletBreakpoint = 768;
const desktopBreakpoint = 1200;

/*
 #######  ##     ## ######## ########     ###    ##       ##
##     ## ##     ## ##       ##     ##   ## ##   ##       ##
##     ## ##     ## ##       ##     ##  ##   ##  ##       ##
##     ## ##     ## ######   ########  ##     ## ##       ##
##     ##  ##   ##  ##       ##   ##   ######### ##       ##
##     ##   ## ##   ##       ##    ##  ##     ## ##       ##
 #######     ###    ######## ##     ## ##     ## ######## ########
*/

const pageOverlay = document.querySelector('.page-overlay--js');
const fadeOutLinks = document.querySelectorAll('.fadeOut--js');

const fadeIn = () => {
  if (!pageOverlay.classList.contains('page-overlay--onload')) {
    pageOverlay.classList.add('page-overlay--onload');
  }
  pageOverlay.classList.remove('page-overlay--onload');
}

const toNextPage = (e, callback, timeout) => {
  e.preventDefault();
  const linkClicked = e.target;
  if (linkClicked.tagName === "A") {
    pageOverlay.classList.add('page-overlay--visible');
    setTimeout(() => callback(linkClicked), timeout);
  }
}

const delayLink = (element) => {
  window.location = element.href;
}

for ( const link of fadeOutLinks ) {
  link.addEventListener('click', () => toNextPage(event, delayLink, 600));
}

/*
 ######      ###
##    ##    ## ##
##         ##   ##
##   #### ##     ##
##    ##  #########
##    ##  ##     ##
 ######   ##     ##
*/

/*
// Google Analytics: change UA-XXXXX-X to be your site's ID.

(function(b, o, i, l, e, r) {
  b.GoogleAnalyticsObject = l;
  b[l] ||
    (b[l] = function() {
      (b[l].q = b[l].q || []).push(arguments);
    });
  b[l].l = +new Date();
  e = o.createElement(i);
  r = o.getElementsByTagName(i)[0];
  e.src = "//www.google-analytics.com/analytics.js";
  r.parentNode.insertBefore(e, r);
})(window, document, "script", "ga");
ga("create", "UA-XXXXX-X", "auto");
ga("send", "pageview");
 */

/*
######## ##     ## ########   #######  ######## ######## ##       ########
   ##    ##     ## ##     ## ##     ##    ##       ##    ##       ##
   ##    ##     ## ##     ## ##     ##    ##       ##    ##       ##
   ##    ######### ########  ##     ##    ##       ##    ##       ######
   ##    ##     ## ##   ##   ##     ##    ##       ##    ##       ##
   ##    ##     ## ##    ##  ##     ##    ##       ##    ##       ##
   ##    ##     ## ##     ##  #######     ##       ##    ######## ########
*/

// Underscore.js 1.9.1
// http://underscorejs.org
// (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Underscore may be freely distributed under the MIT license.

const timestamp = () => {
  return new Date().getTime();
};

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.

const throttle = (func, wait, options) => {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  const later = () => {
    previous = options.leading === false ? 0 : timestamp();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  const throttled = () => {
    var now = timestamp();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = () => {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};

/*
##     ## ######## ##    ## ##     ##
###   ### ##       ###   ## ##     ##
#### #### ##       ####  ## ##     ##
## ### ## ######   ## ## ## ##     ##
##     ## ##       ##  #### ##     ##
##     ## ##       ##   ### ##     ##
##     ## ######## ##    ##  #######
*/

/********** MENU **********/

const mainMenuList = document.querySelector('.main-menu__list--js');
const mobileMenu = document.querySelector('.mobile-menu--js');
const burgerButton = document.querySelector('.burger--js');

const generateMobileMenu = () => {
  const mobileMenuList = mainMenuList.cloneNode(true);
  const mobileMenuItems = mobileMenuList.children;
  const regex = /active/;
  
  mobileMenu.appendChild(mobileMenuList);
  mobileMenuList.className = "mobile-menu__list";

  for (const mobileMenuItem of mobileMenuItems) {
    const mobileMenuLink = mobileMenuItem.firstElementChild;
    mobileMenuItem.className = "mobile-menu__item";
    if ( regex.test(mobileMenuLink.className) ) {
      mobileMenuLink.className = "mobile-menu__link mobile-menu__link--active";
    } else {
      mobileMenuLink.className = "mobile-menu__link";
    }
  }
}

const toggleMobileMenu = () => {
  mobileMenu.classList.toggle('mobile-menu--hidden');
}

const handleMobileMenu = (e) => {
  e.preventDefault();
  if ( mobileMenu.children.length === 1 ) {
    generateMobileMenu();
  }
  toggleMobileMenu();
}

burgerButton.addEventListener('click', handleMobileMenu );

/********** HIDING NAVBAR **********/

const menuItemsLarge = document.querySelectorAll('.main-menu__item--js-large');
let navbarPrevScroll = window.pageYOffset || document.documentElement.scrollTop;

const handleNavbar = () => {
  const navbarNextScroll = window.pageYOffset || document.documentElement.scrollTop;
  let delayStart = 0.3;
  const delayInc = 0.2;

  const handleItems = (operation) => {
    for ( const item of menuItemsLarge ) {
      operation === "add"
        ? item.classList.add("main-menu__item--hidden")
        : item.classList.remove("main-menu__item--hidden");
      item.style.transitionDelay = `${delayStart}s`;
      delayStart += delayInc;
    }
  }

  if (navbarNextScroll > navbarPrevScroll ) {
    handleItems('add');
  } else {
    delayStart = 0;
    handleItems('remove');
  }
  navbarPrevScroll = navbarNextScroll;
}

window.addEventListener('scroll', handleNavbar);

/********** GO TO TOP BUTTON **********/

const goToTopButton = document.querySelector('.go-top--js');

const toggleGoTopButton = () => {
  let scroll = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
  if (scroll > 1000) {
    goToTopButton.classList.add('go-top--visible');
  } else {
    goToTopButton.classList.remove('go-top--visible');
  }
}

window.addEventListener('scroll', toggleGoTopButton );

/*
########   #######  ########  ######## ########  #######  ##       ####  #######
##     ## ##     ## ##     ##    ##    ##       ##     ## ##        ##  ##     ##
##     ## ##     ## ##     ##    ##    ##       ##     ## ##        ##  ##     ##
########  ##     ## ########     ##    ######   ##     ## ##        ##  ##     ##
##        ##     ## ##   ##      ##    ##       ##     ## ##        ##  ##     ##
##        ##     ## ##    ##     ##    ##       ##     ## ##        ##  ##     ##
##         #######  ##     ##    ##    ##        #######  ######## ####  #######
*/

if (portfolio) {

  /********** VARIABLES **********/

  const portfolioGrid = document.querySelector('.grid--js');
  const portfolioSvgs = document.querySelectorAll('.grid__svg-solid--js');
  const portfolioGridItems = document.querySelectorAll('.grid__item--js');
  const portfolioGridLinks = document.querySelectorAll('.grid__link--js');

  //const lazyPlaceholders = [...portfolioPlaceholders];
  let lazyLoadBuffer = 500;
  let lazyLoadPause = false;

  /********** LAYOUT **********/

  // get viewport width value
  const getViewportWidth = () => {
    return window.innerWidth || document.documentElement.clientWidth;
  }

  // Set aspect ratios ( width / height ) of each image
  const setAspectRatios = () => {
    const ratios = [];
    for ( const svg of portfolioSvgs ) {
      ratios.push( 1000 / svg.viewBox.baseVal.height );
    };
    return ratios;
  }

  const addFlexClasses = () => {
    portfolioGrid.classList.add('grid--flex');
    for (const svg of portfolioSvgs) {
      svg.classList.add('grid__svg-solid--flex');
    }
  }

  // Set width of each image wrapper
  const setFlexBasis = () => {
    const viewportWidth = getViewportWidth();
    const imageRatios = setAspectRatios();
    let imageRatio;

    addFlexClasses();

    for ( let i = 0; i < portfolioGridItems.length; i++ ) {

      if ( viewportWidth < tabletBreakpoint ) { // on mobiles
        portfolioGridItems[i].style.flex = "1 1 100%";

      } else if ( viewportWidth > desktopBreakpoint ) { // on desktops
        switch ( i % 3) {
          case 0:
            imageRatio = imageRatios[i] / (imageRatios[i] + imageRatios[i+1] + imageRatios[i+2]);
            break;
          case 1:
            imageRatio = imageRatios[i] / (imageRatios[i-1] + imageRatios[i] + imageRatios[i+1]);
            break;
          case 2:
            imageRatio = imageRatios[i] / (imageRatios[i-2] + imageRatios[i-1] + imageRatios[i]);
            break;
        };
        portfolioGridItems[i].style.flex = imageRatio * 100 + "%";

      } else { // on tablets
        switch ( i % 2) {
          case 0:
            imageRatio = imageRatios[i] / (imageRatios[i] + imageRatios[i+1]);
            break;
          case 1:
            imageRatio = imageRatios[i] / (imageRatios[i-1] + imageRatios[i]);
            break;
        };
        portfolioGridItems[i].style.flex = imageRatio * 100 + "%";
      }
    }
  }

  /********** LAZY LOADING **********/

  var lazyLoad = (imageIndex) => {
    // when there's no argument passed
    if (!imageIndex) imageIndex = 0;
    // quit if number exceed total no. of items
    if (imageIndex === portfolioGridItems.length) return;
  
    const image = portfolioGridImages[imageIndex];
    const imageOffset = portfolioGridItems[imageIndex].offsetTop;
    const viewportTopOffset = window.pageYOffset - lazyLoadBuffer;
    const viewportBottomOffset = window.pageYOffset + window.innerHeight + lazyLoadBuffer;
    const imageSrc = image.getAttribute('src');
    const imageNewSrc = image.getAttribute('data-src');

    if (imageOffset >= viewportTopOffset) { // if image is below top viewport border
      if (imageOffset < viewportBottomOffset) { // if image is inside viewport
        if (imageSrc === "assets/img/blank-image.png") { // if proper src is not applied yet
          image.setAttribute('src', '');
          image.setAttribute('src', imageNewSrc);
          image.onload = () => {
            image.classList.add('grid__image--loaded');
            lazyLoad(++imageIndex);
            return;
          }
        } else { // if proper src is already applied
          lazyLoad(++imageIndex);
          return;
        }
      } else { // if image is below bottom viewport border
        return;
      }
    } else { // if image is above top viewport border
      lazyLoad(++imageIndex);
      return;
    }
  }

  /********** FUNCTION CALLS **********/
  
  setFlexBasis();
  window.addEventListener('resize', setFlexBasis);
} // END OF PORTFOLIO

/*
 ######      ###    ##       ##       ######## ########  ##    ##
##    ##    ## ##   ##       ##       ##       ##     ##  ##  ##
##         ##   ##  ##       ##       ##       ##     ##   ####
##   #### ##     ## ##       ##       ######   ########     ##
##    ##  ######### ##       ##       ##       ##   ##      ##
##    ##  ##     ## ##       ##       ##       ##    ##     ##
 ######   ##     ## ######## ######## ######## ##     ##    ##
*/

if (gallery) { //······················································ GALLERY

  const showGallery = (e) => { //································· SHOW GALLERY

  e.preventDefault();
  const self = e.target;
  let currentIndex = self.index;

  const generateGallery = () => { //······················ GENERATE GALLERY ...

    for (const image of portfolioGridImages) {

      const imageAlt = image.alt;
      const imageSrc = image.getAttribute('data-src2');
      const imageHeading = imageAlt.split(' | ').slice(0,1).join();
      
      gallery.innerHTML += `
      <section class="images images--js">
        <h3 class="images__heading">
          ${imageHeading}
        </h3>
        <img
          src="${imageSrc}"
          alt="${imageAlt}"
          class="images__image"
        >
      </section>
      `;
    }
  } //............................................. END OF GENERATE GALLERY ...
  const loopIndex = (collection, index, action) => { //......... LOOP INDEX ...

    const maxIndex = collection.length-1;
    if (action === 'increase') {
      index >= maxIndex ? index = 0 : index++;
    } else if (action === 'decrease') {
      index <= 0 ? index = maxIndex : index--;
    }
    return index;

  } //.......................................................... LOOP INDEX ...
  const toggleGallery = (action, direction) => { //......... TOGGLE GALLERY ...

    const prevIndex = loopIndex(imageSections, currentIndex, 'decrease');
    const nextIndex = loopIndex(imageSections, currentIndex, 'increase');
    const currentImage = imageSections[currentIndex];
    const prevImage = imageSections[prevIndex];
    const nextImage = imageSections[nextIndex];

    switch (action) {

      case 'toggle':
      gallery.classList.toggle('gallery--visible');
      prevImage.classList.toggle('images--visible');
      prevImage.classList.toggle('images--hidden-left');
      currentImage.classList.toggle('images--visible');
      nextImage.classList.toggle('images--visible');
      nextImage.classList.toggle('images--hidden-right');
      break;

      case 'hideImage':
      if (direction === 'left') {
        nextImage.classList.toggle('images--visible');
        nextImage.classList.toggle('images--hidden-right');
      } else if (direction === 'right') {
        prevImage.classList.toggle('images--visible');
        prevImage.classList.toggle('images--hidden-left');
      }
      break;

      case 'showImage':
      if (direction === 'left') {
        prevImage.classList.toggle('images--visible');
        prevImage.classList.toggle('images--hidden-left');
        currentImage.classList.toggle('images--hidden-left');
        nextImage.classList.toggle('images--hidden-right');
      } else if (direction === 'right') {
        nextImage.classList.toggle('images--visible');
        nextImage.classList.toggle('images--hidden-right');
        currentImage.classList.toggle('images--hidden-right');
        prevImage.classList.toggle('images--hidden-left');
      }
      break;
    }
  } //................................................... END OF SHOW IMAGE ...
  const switchImage = () => { //.............................. SWITCH IMAGE ...

    

  } //................................................. END OF SWITCH IMAGE ...
  const viewImage = (e) => { //................................. VIEW IMAGE ...

    const self = e.target;
    if (self === leftButton) {
      toggleGallery('hideImage','left');
      currentIndex = loopIndex(imageSections, currentIndex, 'decrease');
      toggleGallery('showImage','left');
    } else if (self === rightButton) {
      toggleGallery('hideImage','right');
      currentIndex = loopIndex(imageSections, currentIndex, 'increase');
      toggleGallery('showImage','right');
    }

  } //................................................... END OF VIEW IMAGE ...
  const closeGallery = (e) => { //........................... CLOSE GALLERY ...

    if (e.target === imageSections[currentIndex] || e.target === closeButton) {
      toggleGallery('toggle');
    } else return;
    switchButton.removeEventListener('click', switchImage);
    leftButton.removeEventListener('click', viewImage);
    rightButton.removeEventListener('click', viewImage);
    closeButton.removeEventListener('click', closeGallery);
    gallery.removeEventListener('click', closeGallery);

  } //................................................ END OF CLOSE GALLERY ...

  //................................................. INITIAL FUNCTION CALL ...

  gallery.children.length <= 1 ? generateGallery() : false;

  //............................................................. VARIABLES ...

  const imageSections = document.querySelectorAll('.images--js');

  const switchButton = document.querySelector('.navigation__button--js-switch');
  const leftButton = document.querySelector('.navigation__button--js-left');
  const rightButton = document.querySelector('.navigation__button--js-right');
  const closeButton = document.querySelector('.navigation__button--js-close');

  //........................................................ FUNCTION CALLS ...

  toggleGallery('toggle');

  //....................................................... EVENT LISTENERS ...
  
  switchButton.addEventListener('click', switchImage);
  leftButton.addEventListener('click', viewImage);
  rightButton.addEventListener('click', viewImage);
  closeButton.addEventListener('click', closeGallery);
  gallery.addEventListener('click', closeGallery);

 } //...................................................... END OF SHOW GALLERY

 //............................................................. FUNCTION CALLS

 //............................................................ EVENT LISTENERS

  for (let i = 0; i < portfolioGridImages.length; i++) {
    const gridImage = portfolioGridImages[i];
    gridImage.index = i;
    gridImage.addEventListener('click', showGallery);
  }

} //............................................................ END OF GALLERY

/*
   ###    ########   #######  ##     ## ########
  ## ##   ##     ## ##     ## ##     ##    ##
 ##   ##  ##     ## ##     ## ##     ##    ##
##     ## ########  ##     ## ##     ##    ##
######### ##     ## ##     ## ##     ##    ##
##     ## ##     ## ##     ## ##     ##    ##
##     ## ########   #######   #######     ##
*/

if (about) {

  const cardHeader = document.querySelectorAll('.card__header--js');
  const cardDescription = document.querySelectorAll('.card__description--js');
  const cardDropdown = document.querySelectorAll('.card__dropdown--js');
  const dropdownTransition = 500 + "ms";
  const translateCard = (card) => {
    const cardHeight = card.clientHeight;
    const cardTranslation = card.style.marginTop;
    
    if ( cardTranslation === "0px" || cardTranslation === "" ) {
      card.style.marginTop = `${(-1) * cardHeight - 2}px`;
    } else {
      card.style.marginTop = "0px";
    }
  }

  const rotateDropdown = (dropdown) => {
    dropdown.classList.toggle('card__dropdown--reversed');
  }
  
  const minimizeCards = () => {    
    for ( const card of cardDescription ) {
      translateCard(card);
    }
  }
    
  const handleCards = (e) => {
    const idx = e.target.index;

    const cardArrow = cardDropdown[idx];
    const cardText = cardDescription[idx];
    translateCard(cardText);
    rotateDropdown(cardArrow);
  }
  
  const adjustCards = () => {
    
    for (const card of cardDescription) {
      const cardHeight = card.clientHeight;
      card.style.marginTop = `${(-1) * cardHeight - 3}px`;
    }
  }

  window.onload = () => {
    minimizeCards();
  }

  for (let i = 0; i < cardHeader.length; i++ ) {
    const card = cardHeader[i];
    card.index = i;
    card.addEventListener('click', handleCards);
  }

  window.addEventListener('resize', adjustCards);

} // END OF ABOUT

/*
 ######   #######  ##    ## ########    ###     ######  ########
##    ## ##     ## ###   ##    ##      ## ##   ##    ##    ##
##       ##     ## ####  ##    ##     ##   ##  ##          ##
##       ##     ## ## ## ##    ##    ##     ## ##          ##
##       ##     ## ##  ####    ##    ######### ##          ##
##    ## ##     ## ##   ###    ##    ##     ## ##    ##    ##
 ######   #######  ##    ##    ##    ##     ##  ######     ##
*/

if (form) {

  const resetCheckboxes = () => {
    for ( const checkbox of checkboxes ) {
      checkbox.disabled = false;
      checkbox.checked = false;
      checkbox.parentNode.classList.remove('checkbox--hidden');
    }
  }

  const hideOtherOptions = (element) => {
    element.disabled ? element.disabled = false : element.disabled = true;
    element.parentNode.classList.toggle('checkbox--hidden');
  }
  
  const handleCheckboxes = (e) => {
    if ( e.target === checkboxReject ) {
      checkboxReject.checked ? responseState = "reject" : responseState = "empty";
      hideOtherOptions(checkboxAccept);
      hideOtherOptions(checkboxOptional);
      
    } else if ( e.target === checkboxAccept ) {
      checkboxAccept.checked ? responseState = "accept" : responseState = "empty";
      checkboxOptional.checked ? checkboxOptional.checked = false : false;
      hideOtherOptions(checkboxReject);

    } else if ( e.target === checkboxOptional ) {
      checkboxReject.disabled ? false : hideOtherOptions(checkboxReject);
      checkboxAccept.checked = true;
      responseState = "accept";

    } else {
      responseState = "empty";
    }
  }
    
  const validateCheckboxes = (e) => {
    switch ( responseState ) {
      case "reject":
        e.preventDefault();
        toggleModal("reject");
        break;
      case "accept":
        e.preventDefault(); // remove later
        return;
      case "empty":
        e.preventDefault();
        toggleModal("empty");
        break;
    }
  }

  const toggleModal = (response) => {
    if ( response === "reject" ) {
      modalText.textContent = "Sorry ... There's no room for robots here ...";
    } else if ( response === "empty" ) {
      modalText.textContent = "You have to declare you're not a robot!";
    }
    modalContainer.classList.toggle('modal--visible');
    resetCheckboxes();
  }
  
  const windowQuit = (e) => {
    if ( e.target === modalContainer ) {
      toggleModal();
    }
  }

  checkboxContainer.addEventListener('click', handleCheckboxes );
  submitButton.addEventListener('click', validateCheckboxes);
  modalClose.addEventListener('click', toggleModal);
  modalContainer.addEventListener('click', windowQuit);
} // END OF CONTACT

/*
 #######  ##    ## ##        #######     ###    ########
##     ## ###   ## ##       ##     ##   ## ##   ##     ##
##     ## ####  ## ##       ##     ##  ##   ##  ##     ##
##     ## ## ## ## ##       ##     ## ##     ## ##     ##
##     ## ##  #### ##       ##     ## ######### ##     ##
##     ## ##   ### ##       ##     ## ##     ## ##     ##
 #######  ##    ## ########  #######  ##     ## ########
*/

window.onload = () => {
  fadeIn();
  if (portfolio) {
    lazyLoad();
    window.addEventListener('scroll', throttle(() => lazyLoad(0), 1000));
  }
}