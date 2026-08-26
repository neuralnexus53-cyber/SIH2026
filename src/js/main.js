import { renderFooter } from '../components/Footer.js';
import { renderNavbar } from '../components/Navbar.js';
import { renderHome } from '../pages/Home.js';
import { getCurrentRoute } from './router.js';

const app = document.querySelector('#app');

if (app) {
  app.innerHTML = `
    ${renderNavbar()}
    ${renderHome(getCurrentRoute())}
    ${renderFooter()}
  `;
}