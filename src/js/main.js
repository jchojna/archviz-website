"use strict";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("serviceworker.js").then(
      function(registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
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
const pageOverlay = document.querySelector('.page-overlay--js');
const portfolio = document.querySelector('.portfolio--js');

/********** MENU **********/

const mainMenuList = document.querySelector('.main-menu__list--js');
const mobileMenu = document.querySelector('.mobile-menu--js');
const burgerButton = document.querySelector('.burger--js');

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

const fadeIn = () => {
  if (!pageOverlay.classList.contains('page-overlay--onload')) {
    pageOverlay.classList.add('page-overlay--onload');
  }
  pageOverlay.classList.remove('page-overlay--onload');
}

/*
##     ## ######## ##    ## ##     ##
###   ### ##       ###   ## ##     ##
#### #### ##       ####  ## ##     ##
## ### ## ######   ## ## ## ##     ##
##     ## ##       ##  #### ##     ##
##     ## ##       ##   ### ##     ##
##     ## ######## ##    ##  #######
*/

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
  const portfolioGridImages = document.querySelectorAll('.grid__image--js');

  //const lazyPlaceholders = [...portfolioPlaceholders];
  let lazyLoadOffset = 500;
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

  // Checks index of first unloaded image visible in the current viewport
  const checkFirstImageIndex = (items) => {
    for (let i=0; i<items.length; i++) {
      const imageOffset = items[i].offsetTop;
      const viewportOffset = window.pageYOffset - lazyLoadOffset;
      const itemSrc = items[i].lastElementChild.lastElementChild.getAttribute('src');
      if ( imageOffset >= viewportOffset && itemSrc === "assets/img/blank-image.png" ) {
        return i;
      }
    }
  }


  const lazyLoad = (imageIndex) => {

    // when there's no argument passed
    if (!imageIndex) {
      imageIndex = checkFirstImageIndex(portfolioGridItems);
    }

    // quit if number exceed total no. of items
    if (imageIndex === portfolioGridItems.length) {
      return;
    }

    const image = portfolioGridImages[imageIndex];
    image.setAttribute('src', '');
    const imageSrc = image.getAttribute('data-src');
    image.setAttribute('src', imageSrc);
    
    image.onload = () => {
      image.classList.add('loaded');
      imageIndex++;
      lazyLoad(imageIndex);
    }
    
    
  }




  function lazyLoadOld(item) {
    
    if ( imageOffset < window.pageYOffset - lazyLoadOffset) {
      item++;
      lazyLoadOld(item);
    // checks if image is inside the viewport
    } else if ( imageOffset < window.innerHeight + window.pageYOffset + lazyLoadOffset ) {
      // checks if there's unloaded image in the viewport before the currently loading
      if ( item > firstThumbIndex || lazyLoadPause ) {
        return;
      } else if ( !portfolioThumbnails[item].firstElementChild.lastElementChild.classList.contains("portfolio__image--loaded") ) {
        portfolioImages[item].onload = () => {
          portfolioImages[item].classList.add("portfolio__image--loaded");
          item++;
          lazyLoadOld(item);
        }
        portfolioImages[item].src = portfolioImages[item].getAttribute("data-src");
      } else {
        item++;
        lazyLoadOld(item);
      }
    };
  }



























  /********** FUNCTION CALLS **********/
  
  setFlexBasis();
  lazyLoad();
  window.addEventListener('resize', setFlexBasis);
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

const cardHeader = document.querySelectorAll('.card__header--js');
const cardDescription = document.querySelectorAll('.card__description--js');
const cardDropdown = document.querySelectorAll('.card__dropdown--js');
const dropdownTransition = 500 + "ms";

if (cardHeader) {

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





/*   window.onload = () => {
    minimizeCards();
  } */

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

if (submitButton) {

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

/* window.onload = () => {
  fadeIn();
} */

/* const pageOverlay = document.querySelector('.page-overlay--js');

const fadeInPage = () => {
  pageOverlay.classList.remove('page-overlay--onload');
}

window.onload = () => {
  fadeInPage();
} */

