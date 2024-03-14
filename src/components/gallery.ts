import visualizations from '../visualizations.json';

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
    <section class="images images--js" data-index=${index}>
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

export const addGalleryEvents = () => {
  const portfolioGridButtons = document.querySelectorAll('.grid__button--js');
  const closeButton = document.querySelector('.gallery-nav__button--js-close');
  const leftButton = document.querySelector('.gallery-nav__button--js-left');
  const rightButton = document.querySelector('.gallery-nav__button--js-right');
  if (!closeButton || !leftButton || !rightButton) return;

  [...portfolioGridButtons].forEach((button, index) => {
    button.addEventListener('click', () => showGallery(index));
  });
  leftButton.addEventListener('click', () => switchImage('left'));
  rightButton.addEventListener('click', () => switchImage('right'));
  closeButton.addEventListener('click', () => hideGallery());
  window.addEventListener('keydown', supportKeyboard);
};

const lazyLoadImage = (index: number, option: string, amount: number) => {
  const images = document.querySelectorAll('.images--js');
  const currentImage = images[index].querySelector('.images__image--js');
  if (!currentImage || !(currentImage instanceof HTMLImageElement)) return;
  const currentFilename = visualizations[index].filename;
  const currentSrc = currentImage.getAttribute('src');
  const currentImageSrc = `img/1920px/${currentFilename}.jpg`;

  if (amount <= 0) return;
  if (currentSrc === '') {
    currentImage.src = currentImageSrc;
  } else {
    return;
  }

  currentImage.onload = () => {
    const newAmount = amount - 1;
    currentImage.classList.add('images__image--loaded');

    if (option === 'prev' || option === 'start') {
      lazyLoadImage(index <= 1 ? 0 : index - 1, 'prev', newAmount);
    }
    if (option === 'next' || option === 'start') {
      lazyLoadImage(
        index >= visualizations.length - 2
          ? visualizations.length - 1
          : index + 1,
        'next',
        newAmount
      );
    }
  };
};

const showImage = (index: number) => {
  const image = document.querySelectorAll('.images--js')[index];
  image.classList.toggle('images--visible');
  lazyLoadImage(index, 'start', 2);
};

const switchImage = (direction: string) => {
  const images = document.querySelectorAll('.images--js');
  const currentImage = document.querySelector('.images--js.images--visible');
  if (!currentImage || !(currentImage instanceof HTMLElement)) return;
  if (!currentImage.dataset.index) return;
  const currentIndex = +currentImage.dataset.index;
  const visibleClass = 'images--visible';

  switch (direction) {
    case 'left':
      if (currentIndex === 0) return;
      const prevIndex = currentIndex - 1;
      const prevImage = images[prevIndex] as HTMLElement;
      currentImage.classList.add('images--transition');
      currentImage.classList.remove(visibleClass);
      prevImage.classList.add(visibleClass);
      prevImage.classList.remove('images--transition');
      prevImage.style.transform = 'translateX(-100%)';
      lazyLoadImage(prevIndex, 'prev', 2);
      setTimeout(() => {
        prevImage.classList.add('images--transition');
        prevImage.style.transform = 'translateX(0)';
        currentImage.style.transform = 'translateX(100%)';
      }, 0);
      break;

    case 'right':
      if (currentIndex === images.length - 1) return;
      const nextIndex = currentIndex + 1;
      const nextImage = images[nextIndex] as HTMLElement;
      currentImage.classList.add('images--transition');
      currentImage.classList.remove(visibleClass);
      nextImage.classList.add(visibleClass);
      nextImage.classList.remove('images--transition');
      nextImage.style.transform = 'translateX(100%)';
      lazyLoadImage(nextIndex, 'next', 2);
      setTimeout(() => {
        nextImage.classList.add('images--transition');
        nextImage.style.transform = 'translateX(0)';
        currentImage.style.transform = 'translateX(-100%)';
      }, 0);
      break;
  }
};

export const showGallery = (index: number) => {
  const gallery = document.querySelector('.gallery--js');
  if (!gallery) return;
  gallery.classList.add('gallery--visible');
  showImage(index);
};

const hideGallery = () => {
  const gallery = document.querySelector('.gallery--js');
  const images = document.querySelectorAll('.images--js');
  if (!gallery) return;
  gallery.classList.remove('gallery--visible');
  [...images].forEach((image) => {
    image.classList.remove('images--visible');
    image.classList.remove('images--transition');
    (image as HTMLElement).style.transform = 'translateX(0)';
  });
  //       switchCenter.classList.remove('switch__center--solid');
  //       switchButton.classList.remove('switch--solid');
  //       switchButton.classList.add('switch--disabled');
};

// const handleSwitchDisplay = (image) => {
//   if (image.complete) {
//     switchButton.classList.add('switch--solid');
//     switchCenter.classList.add('switch__center--solid');
//     switchButton.classList.remove('switch--disabled');
//   } else {
//     switchButton.classList.remove('switch--solid');
//     switchCenter.classList.remove('switch__center--solid');
//     switchButton.classList.add('switch--disabled');
//   }
// };

const supportKeyboard = ({ key }) => {
  switch (key) {
    case 'ArrowLeft':
      switchImage('left');
      //   handleSwitchDisplay(images[currentIndex]);
      break;

    case 'ArrowRight':
      switchImage('right');
      //   handleSwitchDisplay(images[currentIndex]);
      break;

    case 'ArrowDown':
      //   if (currentImage.complete) {
      //     switchButton.classList.toggle('switch--solid');
      //     currentImage.classList.toggle('images__image--loaded');
      //     switchCenter.classList.toggle('switch__center--solid');
      //   }
      break;

    case 'Escape':
      hideGallery();
      break;

    default:
      return;
  }
};

// const slideVertically = () => {
//   const nextScroll = window.pageYOffset || document.documentElement.scrollTop;
//   const currentImageSection = imageSections[currentIndex];

//   if (prevScroll === null) {
//     prevScroll = nextScroll;
//   }

//   if (nextScroll !== prevScroll) {
//     if (nextScroll > prevScroll) {
//       currentImageSection.classList.add('images--hidden-top');
//     } else {
//       currentImageSection.classList.add('images--hidden-bottom');
//     }
//     showImage();

//     setTimeout(() => {
//       currentImageSection.classList.remove('images--hidden-top');
//       currentImageSection.classList.remove('images--hidden-bottom');
//     }, 700);

//     removeAllEvents();
//     prevScroll = null;
//   }
// };

// const switchButton = document.querySelector(
//   '.gallery-nav__button--js-switch'
// );
// const switchCenter = document.querySelector('.switch__center--js');

// window.addEventListener('scroll', slideVertically);
