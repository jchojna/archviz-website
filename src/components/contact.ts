import socialMediaIcons from '../content/footer.json';

export const renderContact = () => {
  const contactContainer = document.querySelector('.contact--js');
  if (!contactContainer) return;

  contactContainer.innerHTML = `

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
  `;
};
