import { renderFooter } from './components/footer.js';
import { renderNavbar } from './components/navbar.js';
import { getCurrentRoute } from './router.js';

const app = document.querySelector('#app');

if (app) {
  app.innerHTML = `
    ${renderNavbar()}
    <main class="mx-auto max-w-5xl px-6 py-16">
      <p class="text-sm font-medium uppercase tracking-wide text-blue-600">${getCurrentRoute()}</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight">SIH Project</h1>
      <p class="mt-4 max-w-2xl text-gray-600">Your frontend workspace is ready.</p>
    </main>
    ${renderFooter()}
  `;
}