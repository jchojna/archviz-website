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
   ###    ########   #######  ##     ## ########
  ## ##   ##     ## ##     ## ##     ##    ##
 ##   ##  ##     ## ##     ## ##     ##    ##
##     ## ########  ##     ## ##     ##    ##
######### ##     ## ##     ## ##     ##    ##
##     ## ##     ## ##     ## ##     ##    ##
##     ## ########   #######   #######     ##
*/

const cards = document.querySelector('.info--js');
const cardHeader = document.querySelectorAll('.card__header--js');
const cardDescription = document.querySelectorAll('.card__description--js');
const dropdownTransition = 500 + "ms";

if (cards) {

  const translateCard = (card) => {
    const cardHeight = card.clientHeight;
    const cardTranslation = card.style.marginTop;
    console.log(cardHeight);
    
    if ( cardTranslation === "0px" || cardTranslation === "" ) {
      card.style.marginTop = `${(-1) * cardHeight - 2}px`;
    } else {
      card.style.marginTop = "0px";
    }
  }
  
  const minimizeCards = () => {    
    for ( const card of cardDescription ) {
      translateCard(card);
    }
  }
    
  const handleCards = (e) => {
    const cardText = e.target.nextElementSibling;
    translateCard(cardText);
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

  for (const card of cardHeader) {
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



/* const pageOverlay = document.querySelector('.page-overlay--js');

const fadeInPage = () => {
  pageOverlay.classList.remove('page-overlay--onload');
}

window.onload = () => {
  fadeInPage();
} */