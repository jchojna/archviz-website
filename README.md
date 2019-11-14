![website cover](assets/img/cover.jpg)

# My personal archviz portfolio website

### The main idea for this project was to __compromise a large__ amount of high quality pictures with __page load performance__. Because of that I decided to create svg placeholders for every image as a starting content and load the raster images regarding their actual visibility on the screen and using __lazy loading__ functionality. In this project I decided __not to use any external libraries__ and write all the functions by myself _(exception: throttle function from Underscore.js)_. All the visualization used on this website were created by me, while I have been working as an architectural visualizer.
---
## Main features:
* __Responsive grid__ of images written in JS. Each row's height depends on an __aspect ratios__ of the neighbouring images located in a particular row and taking the whole width of the container,
* __Sprite map__ of svg placeholders for every visualization loaded up as starting content to improve __perceived performance__ of the page load and set grid layout for images,
* __Lazy loading__ for grid images and gallery pictures (__recursive__ function),
* Responsive __slider__ gallery of images,
* Two display modes in gallery view (image and __svg__ placeholder modes),
* Fully functional contact __form__ with checkbox verification and backend validation,
* Simple __accordions__ in about section,
* Page __preloader__ for the main page,
---
## Technologies used:
* HTML5 (Flexbox, Grid, Form),
* CSS3, SCSS,
* Vanilla JS,
* Gulp, Babel, Webpack,
* PHP (contact form validation), xampp,
* AJAX, phpmailer (contact form submission)
---
[Live Demo](https://jakubchojna.pl/)
---
![website screenshots](assets/img/markdown.JPG)