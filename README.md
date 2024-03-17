![website cover](src/assets/img/cover.jpg)

# My personal archviz portfolio website

The main idea for this project was to **compromise a large** amount of high quality pictures with **page load performance**. Because of that I decided to create svg placeholders for every image as a starting content and load the raster images regarding their actual visibility on the screen and using **lazy loading** functionality. In this project I decided **not to use any external libraries** and write all the functions by myself _(exception: throttle function from Underscore.js)_. All the visualization used on this website were created by me, while I have been working as an architectural visualizer.

#

## Main features:

- **Responsive grid** of images written in JS. Each row's height depends on an **aspect ratios** of the neighbouring images located in a particular row and taking the whole width of the container,
- **Sprite map** of svg placeholders for every visualization loaded up as starting content to improve **perceived performance** of the page load and set grid layout for images,
- **Lazy loading** for grid images and gallery pictures (**recursive** function),
- Responsive **slider** gallery of images,
- Two display modes in gallery view (image and **svg** placeholder modes),
- Fully functional contact **form** with checkbox verification and backend validation,
- Simple **accordions** in about section,
- Page **preloader** for the main page,

#

## Technologies used:

- HTML5 (Flexbox, Grid, Form),
- CSS3, SCSS,
- Vanilla JS,
- Gulp, Babel, Webpack,
- AJAX, phpmailer (contact form submission)

#

[Live Demo](https://jakubchojna.pl/)

#

![website screenshots](src/assets/img/markdown.JPG)
