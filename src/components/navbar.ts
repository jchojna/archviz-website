type Routes = {
  [key: string]: {
    linkLabel: string;
    container: string;
  };
};

const burgerButton = `
  <button class="button burger burger--js" aria-label="Toggle mobile menu">
    <svg
      class="burger__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        class="burger__line burger__line--top burger__line--js-top"
        x1="-24"
        y1="8"
        x2="100"
        y2="8"
      />
      <line
        class="burger__line burger__line--center burger__line--js-center"
        x1="-12"
        y1="50"
        x2="112"
        y2="50"
      />
      <line
        class="burger__line burger__line--bottom burger__line--js-bottom"
        x1="0"
        y1="92"
        x2="124"
        y2="92"
      />
    </svg>
  </button>
`;

const goToTopButton = `
  <a href="#page-container" class="go-top go-top--js" aria-label="Go to top">
    <i class="go-top__icon fas fa-arrow-up fa-2x"></i>
  </a>
`;

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

const addNavigationEvents = () => {
  const burgerButton = document.querySelector('.burger--js');
  if (!burgerButton) return;

  window.addEventListener('scroll', toggleGoTopButton);
  burgerButton.addEventListener('click', toggleMobileMenu);
  window.addEventListener('scroll', handleNavbar);
};

// generate HTML for navigation links
const getLinksHTML = (routes: Routes): string => {
  const navLinks = Object.keys(routes)
    .map(
      (route) =>
        `<li class="main-menu__item main-menu__item--large main-menu__item--js-large">
          <a
            href="${route}"
            class="main-menu__link main-menu__link--large ${
              route === '/' && 'main-menu__link--active'
            } route--js"
          >
            ${routes[route].linkLabel}
          </a>
        </li>`
    )
    .join('');
  return navLinks;
};

const registerLinks = (routes: Routes) => {
  const links = document.querySelectorAll('.route--js');
  const routeContainers = document.querySelectorAll('.route-container');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const { pathname } = e.target as HTMLAnchorElement;
      const { container } = routes[pathname];
      const routeContainer = document.querySelector(`.${container}`);
      history.pushState({}, '', pathname);

      links.forEach((l) => {
        l.classList[l === link ? 'add' : 'remove']('main-menu__link--active');
      });

      routeContainers.forEach((container) => {
        container.classList[container === routeContainer ? 'add' : 'remove'](
          'visible'
        );
      });
    });
  });
};

export const renderHeader = (): void => {
  const header = document.querySelector('.header--js');
  if (!header) return;
  const routes: Routes = {
    '/': {
      linkLabel: 'Works',
      container: 'portfolio--js',
    },
    '/about': {
      linkLabel: 'About',
      container: 'about--js',
    },
    '/contact': {
      linkLabel: 'Contact',
      container: 'contact--js',
    },
  };

  const linksHTML = getLinksHTML(routes);
  header.innerHTML = `
    <nav
      class="main-menu main-menu--align-top"
      role="navigation"
      aria-label="Main navigation"
    >
      <a href="/" class="logo route--js" aria-label="Page logo">
        <svg class="logo__svg">
          <use xlink:href="svg/icons.svg#page-logo"></use>
        </svg>
      </a>
      <ul class="main-menu__list">
        ${linksHTML}
      </ul>
      ${burgerButton}
      ${goToTopButton}
    </nav>
  `;

  registerLinks(routes);
  addNavigationEvents();
};
