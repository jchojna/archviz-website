import './sass/main.scss';

import { breakpoints } from './components/constants';
import { addGalleryEvents, generateGallery } from './components/gallery';
import { generateGrid, lazyLoad, setFlexBasis } from './components/grid';

const fadeOutLinks = document.querySelectorAll('.fadeOut--js');
const portfolio = document.querySelector('.portfolio--js');
const about = document.querySelector('.about--js');
const form = document.querySelector('.form--js');

// F0 ///////////////////////////////////////////////////////// FADE IN EFFECT

const fadeIn = () => {
  const pageOverlay = document.querySelector('.overlay--js');
  if (!pageOverlay) return;
  if (!pageOverlay.classList.contains('overlay--onload')) {
    pageOverlay.classList.add('overlay--onload');
  }
  pageOverlay.classList.remove('overlay--onload');
};
// F0 ////////////////////////////////////////// GO TO NEXT PAGE AFTER TIMEOUT

const toNextPage = (e, callback, timeout) => {
  e.preventDefault();
  const pageOverlay = document.querySelector('.overlay--js');
  if (!pageOverlay) return;
  const linkClicked = e.target;
  if (linkClicked.tagName === 'A') {
    pageOverlay.classList.add('overlay--visible');
    setTimeout(() => callback(linkClicked), timeout);
  }
};
// F0 ///////////////////////////////////////////////////////////// DELAY LINK

const delayLink = (element) => {
  window.location = element.href;
};

for (const link of fadeOutLinks) {
  link.addEventListener('click', () => toNextPage(event, delayLink, 600));
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

// F0 ///////////////////////////////////////////////////// TOGGLE MOBILE MENU

const toggleMobileMenu = () => {
  mobileMenu.classList.toggle('mobile-menu--hidden');
  burgerTop.classList.toggle('burger__line--rotate-left');
  burgerCenter.classList.toggle('burger__line--rotate-right');
  burgerBottom.classList.toggle('burger__line--rotate-left');
};
// F0 ////////////////////////////////////////////////////////// HANDLE NAVBAR

const handleNavbar = () => {
  const navbarNextScroll =
    window.pageYOffset || document.documentElement.scrollTop;
  let delayStart = 0.3;
  const delayInc = 0.2;

  const handleItems = (operation) => {
    for (const item of menuItemsLarge) {
      operation === 'add'
        ? item.classList.add('main-menu__item--hidden')
        : item.classList.remove('main-menu__item--hidden');
      item.style.transitionDelay = `${delayStart}s`;
      delayStart += delayInc;
    }
  };

  if (navbarNextScroll > navbarPrevScroll) {
    handleItems('add');
  } else {
    delayStart = 0;
    handleItems('remove');
  }
  navbarPrevScroll = navbarNextScroll;
};

window.addEventListener('scroll', handleNavbar);

// F0 /////////////////////////////////////////////////////// GO TO TOP BUTTON

const toggleGoTopButton = () => {
  let scroll =
    window.scrollY ||
    window.pageYOffset ||
    document.body.scrollTop +
      ((document.documentElement && document.documentElement.scrollTop) || 0);
  if (scroll > 1000) {
    goToTopButton.classList.add('go-top--visible');
  } else {
    goToTopButton.classList.remove('go-top--visible');
  }
};
//////////////////////////////////////////////////////////////////// VARIABLES
const mobileMenu = document.querySelector('.mobile-menu--js');
const burgerButton = document.querySelector('.burger--js');
const burgerTop = document.querySelector('.burger__line--js-top');
const burgerCenter = document.querySelector('.burger__line--js-center');
const burgerBottom = document.querySelector('.burger__line--js-bottom');
const goToTopButton = document.querySelector('.go-top--js');
const menuItemsLarge = document.querySelectorAll('.main-menu__item--js-large');
let navbarPrevScroll = window.pageYOffset || document.documentElement.scrollTop;

////////////////////////////////////////////////////////////// EVENT LISTENERS
window.addEventListener('scroll', toggleGoTopButton);
burgerButton.addEventListener('click', toggleMobileMenu);

const progressBar = document.querySelector('.overlay__progressBar--js');
const url = window.location;

///////////////////////////////////////////////////////////// FUNCTION CALLS

const pageLoading = new XMLHttpRequest();
pageLoading.open('GET', url, true);
pageLoading.onprogress = (e) => {
  if (e.lengthComputable) {
    const percentNumber = (parseInt(e.loaded) / parseInt(e.total)) * 100;
    progressBar.style.width = `${percentNumber}%`;
  }
};
pageLoading.onloadstart = function (e) {};
pageLoading.onloadend = function (e) {
  progressBar.style.width = '100%';
};
pageLoading.send();

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
  var minimizeCards = () => {
    [...cards].forEach((c) => c.classList.toggle('card--rolled-up'));
    [...cardDescriptions].forEach(
      (c) => (c.style.marginTop = `${-1 * c.clientHeight - 3}px`)
    );
    [...cardDropdowns].forEach((d) =>
      d.classList.toggle('card__dropdown--reversed')
    );
  };

  const handleCard = (e) => {
    const { index } = e.target;
    const cardContainer = cards[index];
    const card = cardDescriptions[index];
    const dropdown = cardDropdowns[index];
    const { marginTop } = card.style;

    if (!card.classList.contains('card__description--transition')) {
      card.classList.add('card__description--transition');
      dropdown.classList.add('card__dropdown--transition');
    }
    cardContainer.classList.toggle('card--rolled-up');
    card.style.marginTop =
      marginTop === '0px' || marginTop === ''
        ? `${-1 * card.clientHeight - 3}px`
        : '0px';
    dropdown.classList.toggle('card__dropdown--reversed');
  };

  const handleCardsOnResize = () => {
    [...cardDescriptions].forEach(
      (c) =>
        (c.style.marginTop =
          c.style.marginTop === '0px' || c.style.marginTop === ''
            ? '0px'
            : `${-1 * c.clientHeight - 3}px`)
    );
  };

  const cards = document.querySelectorAll('.card--js');
  const cardTitleButtons = document.querySelectorAll(
    '.card__header-button--js'
  );
  const cardDescriptions = document.querySelectorAll('.card__description--js');
  const cardDropdowns = document.querySelectorAll('.card__dropdown--js');

  [...cardTitleButtons].forEach((a, i) => {
    a.index = i;
    a.addEventListener('click', handleCard);
  });
  window.addEventListener('resize', handleCardsOnResize);
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
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i];
      checkbox.disabled = false;
      checkbox.checked = false;
      checkbox.parentNode.classList.remove('checkbox--disabled');
      checkbox.nextElementSibling.classList.remove('checkbox__field--hidden');
      checkboxMarks[i].classList.remove('checkbox__mark--visible');
    }
  };

  const toggleOption = (element) => {
    element.disabled = element.disabled ? false : true;
    element.parentNode.classList.toggle('checkbox--disabled');
  };

  const handleCheckboxes = (e) => {
    const { index } = e.target;
    const [reject, accept, optional] = checkboxes;
    const [rejectSvg, acceptSvg, optionalSvg] = checkboxMarks;
    checkboxMarks[index].classList.toggle('checkbox__mark--visible');

    switch (index) {
      case 0:
        toggleOption(accept);
        toggleOption(optional);
        break;
      case 1:
        optional.checked = false;
        optionalSvg.classList.remove('checkbox__mark--visible');
        toggleOption(reject);
        break;
      case 2:
        accept.checked = true;
        acceptSvg.classList.add('checkbox__mark--visible');
        reject.disabled ? false : toggleOption(reject);
        break;
    }

    [...checkboxes].forEach((a) =>
      a.checked
        ? a.nextElementSibling.classList.add('checkbox__field--hidden')
        : a.nextElementSibling.classList.remove('checkbox__field--hidden')
    );
  };

  const validateForm = (e) => {
    e.preventDefault();
    // backend validation => send form using ajax request
    const formSubmit = document.querySelector('.form__submit--js').value;
    const userName = document.querySelector('.input__data--js-userName').value;
    const userTitle = document.querySelector(
      '.input__data--js-userTitle'
    ).value;
    const userEmail = document.querySelector(
      '.input__data--js-userEmail'
    ).value;
    const userCountryCode = document.querySelector(
      '.input__data--js-userCountryCode'
    ).value;
    const userPhone = document.querySelector(
      '.input__data--js-userPhone'
    ).value;
    const userMessage = document.querySelector(
      '.input__data--js-userMessage'
    ).value;
    const checkboxAccept = document.querySelector(
      '.checkbox__input--js-accept'
    ).checked;
    const checkboxReject = document.querySelector(
      '.checkbox__input--js-reject'
    ).checked;

    $.ajax({
      url: 'form-handler.php',
      type: 'post',
      dataType: 'json',
      data: {
        submit: formSubmit,
        userName: userName,
        userTitle: userTitle,
        userEmail: userEmail,
        userCountryCode: userCountryCode,
        userPhone: userPhone,
        userMessage: userMessage,
        checkboxAccept: checkboxAccept,
        checkboxReject: checkboxReject,
      },
    })
      .done((data) => handleAlerts(data, false))
      .fail((data) => handleAlerts(data, true));
    return;
  };

  const handleAlerts = (data, isFailed) => {
    const {
      emailError,
      phoneError,
      messageError,
      checkboxError,
      success,
      failure,
    } = data;

    const toggleBoxAlert = () => {
      alert.classList.add('alert--visible');
      window.clearTimeout(alertTimeoutId);
      alertTimeoutId = setTimeout(
        () => alert.classList.remove('alert--visible'),
        3000
      );
    };
    const toggleInputAlert = (input, error) => {
      if (error !== '') {
        input.textContent = error;
        input.classList.add('error__text--visible');
      } else {
        input.classList.remove('error__text--visible');
      }
    };
    if (isFailed) {
      alertMessage.textContent = 'Upss... something went wrongs...';
      toggleBoxAlert();
    } else {
      // show box alert
      if (success !== '' || failure !== '' || checkboxError !== '') {
        const alert = [success, failure, checkboxError]
          .filter((elem) => elem !== '')
          .toString();
        alertMessage.textContent = alert;
        // hide input alerts
        if (alert === success) {
          [...errors].forEach((error) =>
            error.classList.remove('error__text--visible')
          );
          [...formInputs].forEach((input) => (input.value = ''));
          resetCheckboxes();
        }
        toggleBoxAlert();
      }
      // show input(s) alert
      toggleInputAlert(errorPhone, phoneError);
      toggleInputAlert(errorEmail, emailError);
      toggleInputAlert(errorMessage, messageError);
    }
  };

  ////////////////////////////////////////////////////////////////// VARIABLES
  const checkboxes = document.querySelectorAll('.checkbox__input--js');
  const checkboxMarks = document.querySelectorAll('.checkbox__mark--js');
  const formInputs = document.querySelectorAll('.input__data--js');

  const errors = document.querySelectorAll('[class*="error__text--js"]');
  const errorEmail = document.querySelector('.error__text--js-email');
  const errorPhone = document.querySelector('.error__text--js-phone');
  const errorMessage = document.querySelector('.error__text--js-message');
  const formSubmitButton = document.querySelector('.form__submit--js');

  const alert = document.querySelector('.alert--js');
  const alertMessage = document.querySelector('.alert__message--js');
  const alertClose = document.querySelector('.alert__button--js-close');
  let alertTimeoutId;
  //////////////////////////////////////////////////////////// EVENT LISTENERS
  formSubmitButton.addEventListener('click', validateForm);
  alertClose.addEventListener('click', () => {
    alert.classList.remove('alert--visible');
  });

  [...checkboxes].forEach((checkbox, index) => {
    checkbox.index = index;
    checkbox.addEventListener('click', handleCheckboxes);
  });
  /////////////////////////////////////////////////////// HANDLE LOCAL STORAGE

  // CONTACT FORM LOCAL STORAGE FUNCTIONALITY
  /*
  [...formInputs].forEach(input => {
    const key = `jc-${input.getAttribute('id')}`;
    input.value = localStorage.getItem(key) ? localStorage.getItem(key) : "";
    input.addEventListener('keyup', () => localStorage.setItem(key, input.value));
  });
  */
}

window.onload = () => {
  generateGrid();
  generateGallery();
  addGalleryEvents();

  setFlexBasis();
  window.addEventListener('resize', setFlexBasis);

  if (portfolio) {
    const progressBar = document.querySelector('.overlay__progressBar--js');
    if (!progressBar) return;
    setTimeout(() => {
      fadeIn();
      progressBar.classList.remove('overlay__progressBar--visible');
    }, 1000);
    lazyLoad(0);
    window.addEventListener('scroll', () => lazyLoad(0));
  } else {
    fadeIn();
  }

  if (about) {
    window.innerWidth < breakpoints.tablet ? minimizeCards() : false;
  }
};
