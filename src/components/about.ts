import clients from '../clients.json';

type Client = {
  name: string;
  url: string;
  icon: string;
};

export const renderAbout = () => {
  const about = document.querySelector('.about--js');
  if (!about) return;
  about.innerHTML = `
  <section class="info info--js">
    <section class="card card--js">
      <header class="card__header card__header--js" role="banner">
        <h3 class="card__heading visuallyhidden">About me</h3>
        <button
          class="button card__header-button card__header-button--js"
          aria-label="Toggle about me section"
        >
          <span class="card__title">About Me</span>
          <svg class="card__dropdown card__dropdown--js" viewBox="0 0 512 512">
            <use href="svg/icons.svg#dropdown"></use>
          </svg>
        </button>
      </header>
      <div class="card__description card__description--js">
        <p class="card__text">
          I am an architect and 3d graphics enthusiast, specializing in
          <em class="card__emphasized">3d visualization</em> of architecture,
          interiors and every form of design. While creating a new project I
          focus on appropriate form of narration and
          <em class="card__emphasized">story-telling</em>. Because of that a
          rendering becomes something more than just a still image – a scene of
          life, an inspiration, an art.
        </p>
        <a
          href="/assets/pdf/architectural_portfolio.pdf"
          class="button card__button"
          target="_blank"
          rel="nofollow noreferrer"
          aria-label="Open architectural portfolio pdf"
        >
          ARCHITECTURAL PORTFOLIO
        </a>
      </div>
    </section>
    <section class="card card--js">
      <header class="card__header card__header--js" role="banner">
        <h3 class="card__heading visuallyhidden">Experience</h3>
        <button
          class="button card__header-button card__header-button--js"
          aria-label="Toggle experience section"
        >
          <span class="card__title">Experience</span>
          <svg class="card__dropdown card__dropdown--js" viewBox="0 0 512 512">
            <use href="svg/icons.svg#dropdown"></use>
          </svg>
        </button>
      </header>
      <div class="card__description card__description--js">
        <p class="card__text">
          I have been working in the field of visual presentation for
          <em class="card__emphasized">over the last 10 years</em>. As a
          graduate with a Master’s Degree in Architecture I have a strong
          <em class="card__emphasized">architectural background</em> and
          experience gained in design studios in Poland and abroad. Due to that,
          I am fully aware how a project development process runs and how a good
          cooperation between designer, visualizer and investor should look
          like.
        </p>
        <a
          href="/assets/pdf/archviz_portfolio.pdf"
          class="button card__button"
          target="_blank"
          rel="nofollow noreferrer"
          aria-label="Open archviz portfolio pdf"
        >
          ARCHVIZ PORTFOLIO
        </a>
      </div>
    </section>
    <section class="card card--js">
      <header class="card__header card__header--js" role="banner">
        <h3 class="card__heading visuallyhidden">Offer</h3>
        <button
          class="button card__header-button card__header-button--js"
          aria-label="Toggle offer section"
        >
          <span class="card__title">Offer</span>
          <svg class="card__dropdown card__dropdown--js" viewBox="0 0 512 512">
            <use href="svg/icons.svg#dropdown"></use>
          </svg>
        </button>
      </header>
      <div class="card__description card__description--js">
        <ul class="card__text card__text--list">
          <li class="card__list-item">architectural visualization</li>
          <li class="card__list-item">commercial visualization</li>
          <li class="card__list-item">product visualization, packshots</li>
        </ul>
      </div>
    </section>
    <section class="card card--js">
      <header class="card__header card__header--js" role="banner">
        <h3 class="card__heading visuallyhidden">Clients</h3>
        <button
          class="button card__header-button card__header-button--js"
          aria-label="Toggle clients section"
        >
          <span class="card__title">Clients</span>
          <svg class="card__dropdown card__dropdown--js" viewBox="0 0 512 512">
            <use href="svg/icons.svg#dropdown"></use>
          </svg>
        </button>
      </header>
      <div class="card__description card__description--js">
        <p class="card__text">
          Up till now I collaborated with many companies and private clients
          from Poland, Great Britain, Australia, Denmark, Austria, Slovenia,
          including
          <em class="card__emphasized">architectural offices</em> and studios,
          <em class="card__emphasized">real estate developers</em> and
          <em class="card__emphasized">advertising agencies</em>.
        </p>
      </div>
    </section>
  </section>
  <nav class="clients" role="navigation" aria-label="Clients websites">
    <h2 class="clients__heading visuallyhidden">Clients</h2>
    <ul class="clients__list">
      ${clients.map(client).join('')}
    </ul>
  </nav>
`;
};

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
