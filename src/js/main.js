/*
##     ##    ###    ########  ####    ###    ########  ##       ########  ######
##     ##   ## ##   ##     ##  ##    ## ##   ##     ## ##       ##       ##    ##
##     ##  ##   ##  ##     ##  ##   ##   ##  ##     ## ##       ##       ##
##     ## ##     ## ########   ##  ##     ## ########  ##       ######    ######
 ##   ##  ######### ##   ##    ##  ######### ##     ## ##       ##             ##
  ## ##   ##     ## ##    ##   ##  ##     ## ##     ## ##       ##       ##    ##
   ###    ##     ## ##     ## #### ##     ## ########  ######## ########  ######
*/

////////////////////////////////////////////////////////////////////// OVERALL 
const pageContainer = document.querySelector('.page-container--js');
const portfolio = document.querySelector('.portfolio--js');
const gallery = document.querySelector('.gallery--js');
const about = document.querySelector('.about--js');
const form = document.querySelector('.form--js');

//////////////////////////////////////////////////////////////////// PORTFOLIO 
const portfolioGridImages = document.querySelectorAll('.grid__image--js');
const portfolioSvgs = document.querySelectorAll('.grid__svg-solid--js');

///////////////////////////////////////////////////////////////////////// FORM 
const submitButton = document.querySelector('.form__submit--js');

///////////////////////////////////////////////////////////////// VERIFICATION 
const checkboxContainer = document.querySelector('.form__verification--js');
const checkboxes = document.querySelectorAll('.checkbox__input--js');
const checkboxReject = document.querySelector('.checkbox__input--js-reject');
const checkboxAccept = document.querySelector('.checkbox__input--js-accept');
const checkboxOptional = document.querySelector('.checkbox__input--js-optional');
let responseState = "empty";

//////////////////////////////////////////////////////////////////// MODAL BOX 
const modalContainer = document.querySelector('.modal--js');
const modalText = document.querySelector('.modal__text--js');
const modalClose = document.querySelector('.modal__close--js');

let timeoutHandler = null;

//////////////////////////////////////////////////////////////////////// MEDIA 
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

//////////////////////////////////////////////////////////////////// VARIABLES 
const pageOverlay = document.querySelector('.page-overlay--js');
const fadeOutLinks = document.querySelectorAll('.fadeOut--js');

// F0 ///////////////////////////////////////////////////////// FADE IN EFFECT 

const fadeIn = () => {

  if (!pageOverlay.classList.contains('page-overlay--onload')) {
    pageOverlay.classList.add('page-overlay--onload');
  }
  pageOverlay.classList.remove('page-overlay--onload');

}
// F0 ////////////////////////////////////////// GO TO NEXT PAGE AFTER TIMEOUT 

const toNextPage = (e, callback, timeout) => {
  e.preventDefault();
  const linkClicked = e.target;
  if (linkClicked.tagName === "A") {
    pageOverlay.classList.add('page-overlay--visible');
    setTimeout(() => callback(linkClicked), timeout);
  }
}
// F0 ///////////////////////////////////////////////////////////// DELAY LINK 
const delayLink = (element) => {
  window.location = element.href;
}

////////////////////////////////////////////////////////////// EVENT LISTENERS 
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

// F0 /////////////////////////////////////////////////// GENERATE MOBILE MENU 

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
// F0 ///////////////////////////////////////////////////// TOGGLE MOBILE MENU 

const toggleMobileMenu = () => {
  mobileMenu.classList.toggle('mobile-menu--hidden');
  burgerTop.classList.toggle('burger__line--rotate-left');
  burgerCenter.classList.toggle('burger__line--rotate-right');
  burgerBottom.classList.toggle('burger__line--rotate-left');
}
// F0 ///////////////////////////////////////////////////// HANDLE MOBILE MENU 

const handleMobileMenu = (e) => {
  e.preventDefault();
  if ( mobileMenu.children.length === 1 ) {
    generateMobileMenu();
  }
  toggleMobileMenu();
}
// F0 ////////////////////////////////////////////////////////// HANDLE NAVBAR 

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

// F0 /////////////////////////////////////////////////////// GO TO TOP BUTTON 

const goToTopButton = document.querySelector('.go-top--js');

const toggleGoTopButton = () => {
  let scroll = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
  if (scroll > 1000) {
    goToTopButton.classList.add('go-top--visible');
  } else {
    goToTopButton.classList.remove('go-top--visible');
  }
}
//////////////////////////////////////////////////////////////////// VARIABLES 
const mainMenuList = document.querySelector('.main-menu__list--js');
const mobileMenu = document.querySelector('.mobile-menu--js');
const burgerButton = document.querySelector('.burger--js');
const burgerTop = document.querySelector('.burger__line--js-top');
const burgerCenter = document.querySelector('.burger__line--js-center');
const burgerBottom = document.querySelector('.burger__line--js-bottom');

////////////////////////////////////////////////////////////// EVENT LISTENERS 
window.addEventListener('scroll', toggleGoTopButton );
burgerButton.addEventListener('click', handleMobileMenu );

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

  ////////////////////////////////////////////////////////////////// VARIABLES 

  const portfolioGrid = document.querySelector('.grid--js');
  const portfolioGridItems = document.querySelectorAll('.grid__item--js');
  const portfolioGridLinks = document.querySelectorAll('.grid__link--js');

  //const lazyPlaceholders = [...portfolioPlaceholders];
  let lazyLoadBuffer = 500;
  let lazyLoadPause = false;

  // F0 ///////////////////////////////////////////// GET VIEWPORT WIDTH VALUE 

  const getViewportWidth = () => {
    return window.innerWidth || document.documentElement.clientWidth;
  }
  // F0 ///////////////////// SET ASPECT RATIOS (WIDTH / HEIGHT) OF EACH IMAGE 

  const setAspectRatios = () => {
    const ratios = [];
    for ( const svg of portfolioSvgs ) {
      ratios.push( 1000 / svg.viewBox.baseVal.height );
    };
    return ratios;
  }
  // F0 ///////////////////////////////////////////////////// ADD FLEX CLASSES 

  const addFlexClasses = () => {
    portfolioGrid.classList.add('grid--flex');
    for (const svg of portfolioSvgs) {
      svg.classList.add('grid__svg-solid--flex');
    }
  }
  // F1 //////////////////////////////////////////// SET WIDTH OF EACH WRAPPER 

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
  // F1 ///////////////////////////////////////////////////////// LAZY LOADING 

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

  ///////////////////////////////////////////////////////////// FUNCTION CALLS 
  
  setFlexBasis();
  window.addEventListener('resize', setFlexBasis);
}

/*
 ######      ###    ##       ##       ######## ########  ##    ##
##    ##    ## ##   ##       ##       ##       ##     ##  ##  ##
##         ##   ##  ##       ##       ##       ##     ##   ####
##   #### ##     ## ##       ##       ######   ########     ##
##    ##  ######### ##       ##       ##       ##   ##      ##
##    ##  ##     ## ##       ##       ##       ##    ##     ##
 ######   ##     ## ######## ######## ######## ##     ##    ##
*/

if (gallery) {

  let prevScroll = null;

  // F2 ///////////////////////////////////////////////////////// SHOW GALLERY 
  const showGallery = (e) => {

    e.preventDefault();
    const self = e.target;
    let currentIndex = self.index;

    // F0 /////////////////////////////////// GENERATE GALLERY << SHOW GALLERY 

    const generateGallery = () => {
      const imagesAmount = portfolioGridImages.length;

      for (let i = 0; i < imagesAmount; i++) {

        const image = portfolioGridImages[i];
        const imageAlt = image.alt;
        const imageHeading = imageAlt.split(' | ').slice(0,1).join();

        const svg = portfolioSvgs[i];
        const svgSolidHref = svg.firstElementChild.getAttribute('href');
        const svgLineHref = svgSolidHref.replace('solid', 'line');
        const viewBoxWidth = svg.viewBox.baseVal.width;
        const viewBoxHeight = svg.viewBox.baseVal.height;
        const number = getTwoDigit(i + 1);
        
        gallery.innerHTML += `
        <section class="images images--js">
          <div class="images__description">
            <p class="images__counter images__counter--js">
              ${number} / ${imagesAmount}
            </p>
            <h3 class="images__heading">${imageHeading}</h3>
          </div>
          <div class="images__container">
            <svg class="images__svg-solid images__svg-solid--js" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}">
              <use href="${svgSolidHref}"></use>
            </svg>
            <svg class="images__svg-line" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}">
              <use href="${svgLineHref}"></use>
            </svg>
            <img
              src=""
              alt="${imageAlt}"
              class="images__image images__image--js"
            >
          </div>
        </section>
        `;
      }
    }
    // F0 /////////////////////////////// GET TWO-DIGIT NUMBER << SHOW GALLERY 

    const getTwoDigit = (number) => {

      let strNumber = number.toString();
      strNumber.length === 1 ? strNumber = `0${strNumber}` : false;
      return strNumber;

    }
    // F0 ///////////////////////////////////////// LOOP INDEX << SHOW GALLERY 

    const loopIndex = (collection, index, action) => {

      const maxIndex = collection.length-1;
      if (action === 'increase') {
        index >= maxIndex ? index = 0 : index++;
      } else if (action === 'decrease') {
        index <= 0 ? index = maxIndex : index--;
      }
      return index;
    }
    // F0 ////////////////////////////////////// REMOVE EVENTS << SHOW GALLERY 

    const removeAllEvents = () => {

      window.removeEventListener('scroll', slideVertically);
      gallery.removeEventListener('click', viewImage);
      window.removeEventListener('keydown', viewImage);

    }
    // F1 ///////////////////////////// SLIDE IMAGE VERTICALLY << SHOW GALLERY 

    const slideVertically = () => {

      const nextScroll = window.pageYOffset || document.documentElement.scrollTop;
      const currentImageSection = imageSections[currentIndex];

      if (prevScroll === null) {
        prevScroll = nextScroll;
      }

      if (nextScroll !== prevScroll) {
        
        if (nextScroll > prevScroll) {
          currentImageSection.classList.add("images--hidden-top");
        } else {
          currentImageSection.classList.add("images--hidden-bottom");
        }
        
        setTimeout(() => {
          currentImageSection.classList.remove("images--hidden-top");
          currentImageSection.classList.remove("images--hidden-bottom");
          displayGallery(e);
        }, 1000);

        removeAllEvents();
        prevScroll = null;
      }
    }
    // F2 //////////////////////////////////// DISPLAY GALLERY << SHOW GALLERY 

    const displayGallery = (e, action) => {

      const self = e.keyCode || e.target;
      const prevIndex = loopIndex(imageSections, currentIndex, 'decrease');
      const nextIndex = loopIndex(imageSections, currentIndex, 'increase');
      const currentImageSection = imageSections[currentIndex];
      const prevImageSection = imageSections[prevIndex];
      const nextImageSection = imageSections[nextIndex];
      
      // F1 /////////////// LAZY LOAD IMAGE << DISPLAY GALLERY << SHOW GALLERY 

      const lazyLoadImage = (index, option, amount) => {

        //const currentlyDisplayedImageSection = document.querySelector('.images--js-current');
        const currentImage = images[index];
        const currentGridImage = portfolioGridImages[index];
        const currentSrc = currentImage.getAttribute('src');
        const currentImageSrc = currentGridImage.getAttribute('data-src2');
        const indexToInc = index;
        const indexToDec = index;

        if (currentSrc === "") {
          currentImage.src = currentImageSrc;

        } else if (currentImage.complete) {
          
          if (amount > 0) {
            amount--;
            currentImage.classList.add('images__image--loaded');
  
            if (option === 'prev' || option === 'start') {
              index = loopIndex(imageSections, indexToDec, 'decrease');
              lazyLoadImage(index, 'prev', amount);
            }
  
            if (option === 'next' || option === 'start') {
              index = loopIndex(imageSections, indexToInc, 'increase');
              lazyLoadImage(index, 'next', amount);
            }
          }
        }

        currentImage.onload = () => {
          if (amount > 0) {
            amount--;
            currentImage.classList.add('images__image--loaded');
  
            if (option === 'prev' || option === 'start') {
              index = loopIndex(imageSections, indexToDec, 'decrease');
              lazyLoadImage(index, 'prev', amount);
            }
  
            if (option === 'next' || option === 'start') {
              index = loopIndex(imageSections, indexToInc, 'increase');
              lazyLoadImage(index, 'next', amount);
            }
          }
        }
      }
      // F1 //////// END OF LAZY LOAD IMAGE << DISPLAY GALLERY << SHOW GALLERY 
      switch (self) {
  
        case 27:
        case portfolioGridImage:
        case currentImageSection:
        case closeButton:
          gallery.classList.toggle('gallery--visible');
          prevImageSection.classList.toggle('images--visible');
          prevImageSection.classList.toggle('images--hidden-left');
          currentImageSection.classList.toggle('images--visible');
          currentImageSection.classList.toggle('images--js-current');
          nextImageSection.classList.toggle('images--visible');
          nextImageSection.classList.toggle('images--hidden-right');
          lazyLoadImage(currentIndex, 'start', 2);
        break;

        case 37:
        case leftButton:
          if (action === 'hideImage') {
            nextImageSection.classList.toggle('images--visible');
            nextImageSection.classList.toggle('images--hidden-right');
          } else if (action === 'showImage') {
            prevImageSection.classList.toggle('images--visible');
            prevImageSection.classList.toggle('images--hidden-left');
            currentImageSection.classList.toggle('images--js-current');
            currentImageSection.classList.toggle('images--hidden-left');
            nextImageSection.classList.toggle('images--js-current');
            nextImageSection.classList.toggle('images--hidden-right');
            lazyLoadImage(currentIndex, 'prev', 2);
          }
        break;
        
        case 39:
        case rightButton:
          if (action === 'hideImage') {
            prevImageSection.classList.toggle('images--visible');
            prevImageSection.classList.toggle('images--hidden-left');
          } else if (action === 'showImage') {
            nextImageSection.classList.toggle('images--visible');
            nextImageSection.classList.toggle('images--hidden-right');
            currentImageSection.classList.toggle('images--js-current');
            currentImageSection.classList.toggle('images--hidden-right');
            prevImageSection.classList.toggle('images--js-current');
            prevImageSection.classList.toggle('images--hidden-left');
            lazyLoadImage(currentIndex, 'next', 2);
          }
        break;

        default:
          return;
      }
    }
    // F1 ///////////////////////////////////////// VIEW IMAGE << SHOW GALLERY 
    const viewImage = (e) => {

      const self = e.keyCode || e.target;
      const currentImageSection = imageSections[currentIndex];

      switch (self) {

        case 37:
        case leftButton:
          e.preventDefault();
          displayGallery(e,'hideImage');
          currentIndex = loopIndex(imageSections, currentIndex, 'decrease');
          displayGallery(e,'showImage');
          break;

        case 39:
        case rightButton:
          e.preventDefault();
          displayGallery(e,'hideImage');
          currentIndex = loopIndex(imageSections, currentIndex, 'increase');
          displayGallery(e,'showImage');
          break;

        case 13:
        case 38:
        case 40:
        case switchButton:
          e.preventDefault();
          break;
        
        case 27:
        case portfolioGridImage:
        case currentImageSection:
        case closeButton:
          e.preventDefault();
          displayGallery(e);
          removeAllEvents();
          break;

        default:
          return;
      }
    }
    /////////////////////////////////// INITIAL FUNCTION CALLS << SHOW GALLERY 
    gallery.children.length <= 1 ? generateGallery() : false;

    //////////////////////////////////////////////// VARIABLES << SHOW GALLERY 
    const imageSections = document.querySelectorAll('.images--js');
    const images = document.querySelectorAll('.images__image--js');
    const switchButton = document.querySelector('.gallery-nav__button--js-switch');
    const leftButton = document.querySelector('.gallery-nav__button--js-left');
    const rightButton = document.querySelector('.gallery-nav__button--js-right');
    const closeButton = document.querySelector('.gallery-nav__button--js-close');
    const portfolioGridImage = portfolioGridImages[currentIndex];

    /////////////////////////////////////////// FUNCTION CALLS << SHOW GALLERY 
    displayGallery(e);

    ////////////////////////////////////////// EVENT LISTENERS << SHOW GALLERY 
    gallery.addEventListener('click', viewImage);
    window.addEventListener('keydown', viewImage);
    window.addEventListener('scroll', slideVertically);
  }
  // F2 ////////////////////////////////////////////////// END OF SHOW GALLERY 
  ///////////////////////////////////////////////////////////// FUNCTION CALLS 
  //////////////////////////////////////////////////////////// EVENT LISTENERS 

  for (let i = 0; i < portfolioGridImages.length; i++) {
    const gridImage = portfolioGridImages[i];
    gridImage.index = i;
    gridImage.addEventListener('click', showGallery);
  }
}

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

}

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
}

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