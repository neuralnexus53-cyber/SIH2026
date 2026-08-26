export function renderHome(route) {
  return `
    <main class="mx-auto max-w-5xl px-6 py-16">
      <p class="text-sm font-medium uppercase tracking-wide text-blue-600">${route}</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight">SIH Project</h1>
      <p class="mt-4 max-w-2xl text-gray-300">Your frontend workspace is ready.</p>
    </main>
  `;
}