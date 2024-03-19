import about from '../content/about.json';
import clients from '../content/clients.json';
import { breakpoints } from './constants';

type Card = {
  heading: string;
  text?: string | null;
  list?: string[] | null;
  button?: {
    label: string | null;
    url: string | null;
  };
};

type Client = {
  name: string;
  url: string;
  icon: string;
};

const card = ({
  heading,
  text = null,
  list = null,
  button: { label, url } = { label: null, url: null },
}: Card) => `
  <section class="card card--js">
    <div class="card__header card__header--js" role="banner">
      <button
        class="button card__header-button card__header-button--js"
        aria-label="Toggle card"
      >
        <span class="card__title">${heading}</span>
        <svg class="card__dropdown card__dropdown--js" viewBox="0 0 512 512">
          <use href="svg/icons.svg#dropdown"></use>
        </svg>
      </button>
    </div>
    <div class="card__description card__description--js">
      ${text ? `<p class="card__text">${text}</p>` : ''}
      ${
        list
          ? `<ul class="card__text card__text--list">${list
              .map((item: string) => `<li class="card__list-item">${item}</li>`)
              .join('')}</ul>
        `
          : ''
      }
      ${
        label && url
          ? `
          <a href="${url}"
            class="button card__button"
            target="_blank"
            rel="nofollow noreferrer"
            aria-label="Open architectural portfolio pdf"
          >
            ${label}
          </a>
        `
          : ''
      }
    </div>
  </section>
`;

const client = ({ name, url, icon }: Client) => {
  return `
    <li class="clients__item">
      <a
        href="${url}"
        target="_blank"
        rel="nofollow noreferrer"
        class="clients__link"
        aria-label="${name} website"
      >
        <svg class="clients__svg" viewBox="0 0 512 512">
          <use href="svg/icons.svg#${icon}"></use>
        </svg>
      </a>
    </li>
  `;
};

const handleCard = (card: HTMLElement) => {
  const cardDescription = card.querySelector('.card__description--js');
  const cardDropdown = card.querySelector('.card__dropdown--js');
  if (!cardDescription || !cardDropdown) return;
  if (!(cardDescription instanceof HTMLElement)) return;
  const { marginTop } = cardDescription.style;

  if (!cardDescription.classList.contains('card__description--transition')) {
    cardDescription.classList.add('card__description--transition');
    cardDropdown.classList.add('card__dropdown--transition');
  }
  cardDescription.classList.toggle('card--rolled-up');
  cardDescription.style.marginTop =
    marginTop === '0px' || marginTop === ''
      ? `${-1 * cardDescription.clientHeight - 3}px`
      : '0px';
  cardDropdown.classList.toggle('card__dropdown--reversed');
};

const handleCardsOnResize = () => {
  const cardDescriptions = document.querySelectorAll('.card__description--js');
  [...cardDescriptions].forEach((card) => {
    if (!(card instanceof HTMLElement)) return;
    card.style.marginTop =
      card.style.marginTop === '0px' || card.style.marginTop === ''
        ? '0px'
        : `${-1 * card.clientHeight - 3}px`;
  });
};

const registerEvents = () => {
  const cards = document.querySelectorAll('.card--js');

  // handle cards expansion
  [...cards].forEach((card) => {
    const button = card.querySelector('.card__header-button--js');
    if (!button || !(card instanceof HTMLElement)) return;
    button.addEventListener('click', () => handleCard(card));
  });
  window.addEventListener('resize', () => handleCardsOnResize());
};

export const renderAbout = () => {
  const aboutContainer = document.querySelector('.about--js');
  if (!aboutContainer) return;
  aboutContainer.innerHTML = `
    <section class="info info--js">
      ${about.map(card).join('')}
    </section>
    <nav class="clients" role="navigation">
      <ul class="clients__list">
        ${clients.map(client).join('')}
      </ul>
    </nav>
  `;
  registerEvents();
};
