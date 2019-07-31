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

fetch("https://api.github.com/users/jchojna/repos?sort=updated&direction=desc")
  .then(resp => resp.json())
  .then(resp => {
    const repos = resp;
    for (const repo of repos) {
      const {html_url, name} = repo;
      reposList.innerHTML += `
        <li class="repos__item">
          <a
            class="repos__link"
            href="${html_url}"
            target="_blank"
          >
            ${name}
          </a>
        </li>
      `;
    }
  });
