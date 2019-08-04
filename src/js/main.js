"use strict";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("serviceworker.js").then(
      function(registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function(err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

const reposList = document.querySelector(".repos__list--js");

/* const pageOverlay = document.querySelector('.page-overlay--js');

const fadeInPage = () => {
  pageOverlay.classList.remove('page-overlay--onload');
}

window.onload = () => {
  fadeInPage();
} */