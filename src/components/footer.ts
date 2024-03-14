import socialMediaIcons from '../footer.json';

export const generateFooter = () => {
  const footer = document.querySelector('.footer--js');
  if (!footer) return;
  footer.innerHTML = `
    <section class="footer__container">
      <nav class="social" role="navigation" aria-label="Social media links">
        <ul class="social__list social__list--horizontal">
        ${socialMediaIcons
          .map(({ href, ariaLabel, icon }) => {
            return `
              <li class="social__item">
                <a
                  href="${href}"
                  class="social__link"
                  target="_blank"
                  rel="nofollow noreferrer"
                  aria-label="${ariaLabel}"
                >
                  <i class="social__icon fab ${icon}"></i>
                </a>
              </li>
            `;
          })
          .join('')}
        </ul>
      </nav>
    </section>
    <section class="copyright">
      <p class="copyright__text">
        Copyright &copy; 2024 Jakub Chojna. All rights reserved. Website
        designed and developed by Jakub Chojna
      </p>
    </section>
  `;
};
