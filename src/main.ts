import './sass/main.scss';

import { renderAbout } from './components/about';
import { breakpoints } from './components/constants';
import { renderContact } from './components/contact';
import { renderFooter } from './components/footer';
import { renderGallery } from './components/gallery';
import { lazyLoad, renderGrid, setFlexBasis } from './components/grid';
import { renderHeader } from './components/navbar';

const about = document.querySelector('.about--js');

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

window.onload = () => {
  renderHeader();
  renderGrid();
  renderGallery();
  renderFooter();
  renderAbout();

  // renderContact();
  const contactContainer = document.querySelector('.contact--js');
  console.log(contactContainer);
  contactContainer.innerHTML = renderContact();
  // document.querySelector('.contact--js')?.innerHTML = renderContact();

  setFlexBasis();
  window.addEventListener('resize', setFlexBasis);

  lazyLoad(0);
  window.addEventListener('scroll', () => lazyLoad(0));

  if (about) {
    window.innerWidth < breakpoints.tablet ? minimizeCards() : false;
  }
};
