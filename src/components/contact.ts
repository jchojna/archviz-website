import socialMediaIcons from '../content/contact.json';

export const renderContact = () => {
  const contactContainer = document.querySelector('.contact--js');
  if (!contactContainer) return;

  contactContainer.innerHTML = `
    <h3 class="heading">Feel free to contact me!</h3>
    <ul class="icons">
      ${socialMediaIcons
        .map(({ href, ariaLabel, icon }) => {
          return `
            <li class="icon">
              <a
                href="${href}"
                class="icon-link"
                target="_blank"
                rel="nofollow noreferrer"
                aria-label="${ariaLabel}"
              >
                <i class="fab ${icon}"></i>
              </a>
            </li>
          `;
        })
        .join('')}
      </ul>
    </nav>
  `;
};
