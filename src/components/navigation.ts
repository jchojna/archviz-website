const toggleMobileMenu = () => {
  const mobileMenu = document.querySelector('.mobile-menu--js');
  const burgerTop = document.querySelector('.burger__line--js-top');
  const burgerCenter = document.querySelector('.burger__line--js-center');
  const burgerBottom = document.querySelector('.burger__line--js-bottom');

  mobileMenu && mobileMenu.classList.toggle('mobile-menu--hidden');
  burgerTop && burgerTop.classList.toggle('burger__line--rotate-left');
  burgerCenter && burgerCenter.classList.toggle('burger__line--rotate-right');
  burgerBottom && burgerBottom.classList.toggle('burger__line--rotate-left');
};

const handleNavbar = () => {
  const navbarNextScroll = window.scrollY || document.documentElement.scrollTop;
  let delayStart = 0.3;
  const delayInc = 0.2;

  const handleItems = (operation: string) => {
    const menuItemsLarge = document.querySelectorAll(
      '.main-menu__item--js-large'
    );
    for (const item of menuItemsLarge) {
      operation === 'add'
        ? item.classList.add('main-menu__item--hidden')
        : item.classList.remove('main-menu__item--hidden');
      if (!(item instanceof HTMLElement)) return;
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

const toggleGoTopButton = () => {
  const goToTopButton = document.querySelector('.go-top--js');
  if (!goToTopButton) return;
  let scroll =
    window.scrollY ||
    document.body.scrollTop +
      ((document.documentElement && document.documentElement.scrollTop) || 0);
  if (scroll > 1000) {
    goToTopButton.classList.add('go-top--visible');
  } else {
    goToTopButton.classList.remove('go-top--visible');
  }
};

let navbarPrevScroll = window.scrollY || document.documentElement.scrollTop;

export const addNavigationEvents = () => {
  const burgerButton = document.querySelector('.burger--js');
  if (!burgerButton) return;

  window.addEventListener('scroll', toggleGoTopButton);
  burgerButton.addEventListener('click', toggleMobileMenu);
  window.addEventListener('scroll', handleNavbar);
};
