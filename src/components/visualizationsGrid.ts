import visualizations from '../visualizations.json';
import { breakpoints } from './constants';

type Visualization = {
  title: string;
  description: string;
  viewBox: { width: number; height: number };
  filename: string;
};

const visualization = ({
  title,
  description,
  viewBox: { width, height },
  filename,
}: Visualization) => `
  <section class="grid__item grid__item--js">
    <h3 class="grid__title grid__title--js">${title}</h3>
    <button class="button grid__button grid__button--js">
      <svg
        class="grid__svg-solid grid__svg-solid--js"
        viewBox="0 0 ${width} ${height}"
      >
        <use href="svg/placeholders.svg#${filename}-solid" />
      </svg>
      <svg class="grid__svg-line" viewBox="0 0 ${width} ${height}">
        <use href="svg/placeholders.svg#${filename}-line" />
      </svg>
      <img
        src="img/blank.PNG"
        data-src="img/1000px/${filename}.jpg"
        data-src2="img/1920px/${filename}.jpg"
        class="grid__image grid__image--js"
        alt="${description}"
      />
    </button>
  </section>
`;

export const setFlexBasis = () => {
  const portfolioGrid = document.querySelector('.grid--js');
  if (!portfolioGrid) return;
  const portfolioGridItems = portfolioGrid.querySelectorAll('.grid__item--js');
  const portfolioSvgs = document.querySelectorAll('.grid__svg-solid--js');
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;

  const imageRatios = [...portfolioSvgs].map((svg) => {
    const { width, height } = (svg as SVGViewElement).viewBox.baseVal;
    svg.classList.add('grid__svg-solid--flex');
    return width / height;
  });
  portfolioGrid.classList.add('grid--flex');

  let imageRatio = 0;
  for (let i = 0; i < portfolioGridItems.length; i++) {
    const item = portfolioGridItems[i];
    if (!(item instanceof HTMLElement)) return;

    if (viewportWidth < breakpoints.tablet) {
      // on mobiles
      item.style.flex = '1 1 100%';
    } else if (viewportWidth > breakpoints.desktop) {
      // on desktops
      switch (i % 3) {
        case 0:
          imageRatio =
            imageRatios[i] /
            (imageRatios[i] + imageRatios[i + 1] + imageRatios[i + 2]);
          break;
        case 1:
          imageRatio =
            imageRatios[i] /
            (imageRatios[i - 1] + imageRatios[i] + imageRatios[i + 1]);
          break;
        case 2:
          imageRatio =
            imageRatios[i] /
            (imageRatios[i - 2] + imageRatios[i - 1] + imageRatios[i]);
          break;
      }
      item.style.flex = imageRatio * 100 + '%';
    } else {
      // on tablets
      switch (i % 2) {
        case 0:
          imageRatio = imageRatios[i] / (imageRatios[i] + imageRatios[i + 1]);
          break;
        case 1:
          imageRatio = imageRatios[i] / (imageRatios[i - 1] + imageRatios[i]);
          break;
      }
      item.style.flex = imageRatio * 100 + '%';
    }
  }
};

export const lazyLoad = (imageIndex: number = 0) => {
  const lazyLoadBuffer = 500;
  const portfolioGridImages = document.querySelectorAll('.grid__image--js');
  const portfolioGridItems = document.querySelectorAll('.grid__item--js');
  if (imageIndex === portfolioGridItems.length) return;

  const image = portfolioGridImages[imageIndex];
  const imageItem = portfolioGridItems[imageIndex];
  if (!(image instanceof HTMLElement)) return;
  if (!(imageItem instanceof HTMLElement)) return;
  const imageOffset = imageItem.offsetTop;
  const viewportTopOffset = window.pageYOffset - lazyLoadBuffer;
  const viewportBottomOffset =
    window.pageYOffset + window.innerHeight + lazyLoadBuffer;
  const imageSrc = image.getAttribute('src');
  const imageNewSrc = image.getAttribute('data-src');
  if (!imageNewSrc) return;

  if (imageOffset >= viewportTopOffset && imageOffset >= viewportBottomOffset) {
    return;
  }

  if (imageSrc === 'img/blank.PNG') {
    image.setAttribute('src', '');
    image.setAttribute('src', imageNewSrc);
    image.onload = () => {
      image.classList.add('grid__image--loaded');
      lazyLoad(++imageIndex);
    };
  } else {
    lazyLoad(++imageIndex);
  }
};

export const generateVisualizations = () => {
  const grid = document.querySelector('.grid--js');
  if (!grid) return;
  visualizations.forEach((viz) => {
    grid.innerHTML += visualization(viz);
  });
};
