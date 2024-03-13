import visualizations from '../visualizations.json';
import { breakpoints } from './constants';

const getTwoDigit = (number: number) => {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

const galleryViz = (viz: Visualization, index: number, imagesTotal: number) => {
  const {
    description,
    viewBox: { width, height },
    filename,
  } = viz;
  const imageHeading = description.split(' | ').slice(0, 1).join();
  const number = getTwoDigit(index + 1);
  return `
    <section class="images images--js">
      <div class="images__description">
        <p class="images__counter images__counter--js">
          <span class="images__counter--current">${number}</span>/${imagesTotal}
        </p>
        <h3 class="images__heading">${imageHeading}</h3>
      </div>
      <div class="images__container images__container--js">
        <svg
          class="images__svg-solid images__svg-solid--js"
          viewBox="0 0 ${width} ${height}"
        >
          <use href="svg/placeholders.svg#${filename}-solid"></use>
        </svg>
        <svg class="images__svg-line" viewBox="0 0 ${width} ${height}">
          <use href="svg/placeholders.svg#${filename}-line"></use>
        </svg>
        <img
          src=""
          alt="${description}"
          class="images__image images__image--js"
        >
      </div>
    </section>
  `;
};

export const generateGallery = () => {
  const gallery = document.querySelector('.gallery--js');
  if (!gallery) return;
  visualizations.forEach((viz, index) => {
    gallery.innerHTML += galleryViz(viz, index, visualizations.length);
  });
};

export const showGallery = (e) => {
  let prevScroll = null;

  const setImageSize = () => {
    currentImageContainer = imageContainers[currentIndex];
    const currentSvg = svgs[currentIndex];

    const { width, height } = currentSvg.viewBox.baseVal;
    const { innerWidth, innerHeight } = window;
    const heightOffset =
      innerWidth >= breakpoints.desktop
        ? 150
        : innerWidth >= breakpoints.tablet
        ? 120
        : 80;

    const areaHeight = innerHeight - heightOffset;
    const svgAspectRatio = width / height;
    const areaAspectRatio = innerWidth / areaHeight;

    if (svgAspectRatio >= areaAspectRatio) {
      currentImageContainer.style.width = '100%';
      currentImageContainer.style.height = `${innerWidth / svgAspectRatio}px`;
    } else {
      currentImageContainer.style.width = `${areaHeight * svgAspectRatio}px`;
      currentImageContainer.style.height = `${areaHeight}px`;
    }
  };

  const showImage = () => {
    gallery.classList.toggle('gallery--visible');
    currentImageSection.classList.toggle('images--visible');
    currentImageDescription.classList.toggle('images__description--visible');
    currentImageContainer.classList.toggle('images__container--visible');

    if (gallery.classList.contains('gallery--visible')) {
      currentImageContainer.classList.remove(
        'images__container--visible-from-left'
      );
      currentImageContainer.classList.remove(
        'images__container--visible-from-right'
      );
      currentImageContainer.classList.remove(
        'images__container--hidden-to-left'
      );
      currentImageContainer.classList.remove(
        'images__container--hidden-to-right'
      );
      switchCenter.classList.remove('switch__center--linear');
      lazyLoadImage(currentIndex, 'start', 2);
    }
  };

  const handleClassesChange = (direction) => {
    const opposite = direction === 'left' ? 'right' : 'left';
    const action = direction === 'left' ? 'decrease' : 'increase';

    currentImageContainer.classList.remove(
      `images__container--visible-from-${direction}`
    );
    currentImageContainer.classList.remove(
      `images__container--visible-from-${opposite}`
    );
    currentImageSection.classList.remove('images--visible');
    currentImageDescription.classList.remove('images__description--visible');
    currentImageContainer.classList.remove('images__container--visible');
    currentImageContainer.classList.add(
      `images__container--hidden-to-${opposite}`
    );

    currentIndex = loopIndexRange(imageSections, currentIndex, action);
    currentImageSection = imageSections[currentIndex];
    currentImageDescription = currentImageSection.firstElementChild;
    currentImageContainer = currentImageSection.lastElementChild;

    currentImageContainer.classList.remove(
      `images__container--hidden-to-${direction}`
    );
    currentImageContainer.classList.remove(
      `images__container--hidden-to-${opposite}`
    );
    currentImageSection.classList.add('images--visible');
    currentImageDescription.classList.add('images__description--visible');
    currentImageContainer.classList.add('images__container--visible');
    currentImageContainer.classList.add(
      `images__container--visible-from-${direction}`
    );
  };

  const viewImage = (e) => {
    const self = e.keyCode || e.target;
    let currentImage = images[currentIndex];

    const handleSwitchDisplay = (image) => {
      if (image.complete) {
        switchButton.classList.add('switch--solid');
        switchCenter.classList.add('switch__center--solid');
        switchButton.classList.remove('switch--disabled');
      } else {
        switchButton.classList.remove('switch--solid');
        switchCenter.classList.remove('switch__center--solid');
        switchButton.classList.add('switch--disabled');
      }
    };

    switch (self) {
      case 37:
      case leftButton:
        handleClassesChange('left');
        lazyLoadImage(currentIndex, 'prev', 2);
        handleSwitchDisplay(images[currentIndex]);
        setImageSize();
        break;

      case 39:
      case rightButton:
        handleClassesChange('right');
        lazyLoadImage(currentIndex, 'next', 2);
        handleSwitchDisplay(images[currentIndex]);
        setImageSize();
        break;

      case 38:
      case switchButton:
        if (currentImage.complete) {
          switchButton.classList.toggle('switch--solid');
          currentImage.classList.toggle('images__image--loaded');
          switchCenter.classList.toggle('switch__center--solid');
        }
        break;

      case 27:
      case closeButton:
        switchCenter.classList.remove('switch__center--solid');
        switchButton.classList.remove('switch--solid');
        switchButton.classList.add('switch--disabled');
        showImage();
        removeAllEvents();
        break;

      default:
        return;
    }
  };

  const lazyLoadImage = (index, option, amount) => {
    const currentImage = images[index];
    const currentGridImage = portfolioGridImages[index];
    const currentSrc = currentImage.getAttribute('src');
    const currentImageSrc = currentGridImage.getAttribute('data-src2');
    const indexToInc = index;
    const indexToDec = index;

    if (currentSrc === '') {
      currentImage.src = currentImageSrc;
    } else if (currentImage.complete) {
      if (amount > 0) {
        amount--;
        currentImage.classList.add('images__image--loaded');
        switchCenter.classList.add('switch__center--solid');
        switchButton.classList.add('switch--solid');
        switchButton.classList.remove('switch--disabled');

        if (option === 'prev' || option === 'start') {
          index = loopIndexRange(imageSections, indexToDec, 'decrease');
          lazyLoadImage(index, 'prev', amount);
        }

        if (option === 'next' || option === 'start') {
          index = loopIndexRange(imageSections, indexToInc, 'increase');
          lazyLoadImage(index, 'next', amount);
        }
      }
    }
    currentImage.onload = () => {
      if (amount > 0) {
        amount--;
        currentImage.classList.add('images__image--loaded');
        if (index === currentIndex) {
          switchCenter.classList.add('switch__center--solid');
          switchButton.classList.add('switch--solid');
          switchButton.classList.remove('switch--disabled');
        }

        if (option === 'prev' || option === 'start') {
          index = loopIndexRange(imageSections, indexToDec, 'decrease');
          lazyLoadImage(index, 'prev', amount);
        }

        if (option === 'next' || option === 'start') {
          index = loopIndexRange(imageSections, indexToInc, 'increase');
          lazyLoadImage(index, 'next', amount);
        }
      }
    };
  };

  const slideVertically = () => {
    const nextScroll = window.pageYOffset || document.documentElement.scrollTop;
    const currentImageSection = imageSections[currentIndex];

    if (prevScroll === null) {
      prevScroll = nextScroll;
    }

    if (nextScroll !== prevScroll) {
      if (nextScroll > prevScroll) {
        currentImageSection.classList.add('images--hidden-top');
      } else {
        currentImageSection.classList.add('images--hidden-bottom');
      }
      showImage();

      setTimeout(() => {
        currentImageSection.classList.remove('images--hidden-top');
        currentImageSection.classList.remove('images--hidden-bottom');
      }, 700);

      removeAllEvents();
      prevScroll = null;
    }
  };

  const removeAllEvents = () => {
    gallery.removeEventListener('click', viewImage);
    window.removeEventListener('keydown', viewImage);
    window.removeEventListener('scroll', slideVertically);
  };

  // INDEX
  const self = e.target;
  let currentIndex = self.index;
  // IMAGES
  const gallery = document.querySelector('.gallery--js');
  if (!gallery) return;
  const imageSections = document.querySelectorAll('.images--js');
  const imageContainers = document.querySelectorAll('.images__container--js');
  const images = document.querySelectorAll('.images__image--js');
  const svgs = document.querySelectorAll('.images__svg-solid--js');
  let currentImageSection = imageSections[currentIndex];
  let currentImageContainer = imageContainers[currentIndex];
  let currentImageDescription = currentImageSection.firstElementChild;

  // NAVIGATION
  const switchButton = document.querySelector(
    '.gallery-nav__button--js-switch'
  );
  const leftButton = document.querySelector('.gallery-nav__button--js-left');
  const rightButton = document.querySelector('.gallery-nav__button--js-right');
  const closeButton = document.querySelector('.gallery-nav__button--js-close');
  const switchCenter = document.querySelector('.switch__center--js');

  /////////////////////////////////////////// FUNCTION CALLS << SHOW GALLERY
  setImageSize();
  showImage();

  ////////////////////////////////////////// EVENT LISTENERS << SHOW GALLERY
  gallery.addEventListener('click', viewImage);
  window.addEventListener('keydown', viewImage);
  window.addEventListener('scroll', slideVertically);
  window.addEventListener('resize', setImageSize);
};
