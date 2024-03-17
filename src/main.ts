import { renderAbout } from './components/about';
import { renderContact } from './components/contact';
import { renderFooter } from './components/footer';
import { renderGallery } from './components/gallery';
import { renderGrid } from './components/grid';
import { renderHeader } from './components/navbar';
import './sass/main.scss';

window.onload = () => {
  renderHeader();
  renderGrid();
  renderGallery();
  renderFooter();
  renderAbout();
  renderContact();
};
