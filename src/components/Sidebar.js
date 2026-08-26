export function renderSidebar() {
  return `
    <aside class="hidden w-56 shrink-0 border-r border-gray-200 bg-white p-4 lg:block">
      <nav aria-label="Sidebar navigation" class="space-y-1 text-sm">
        <a class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" href="./index.html">Home</a>
        <a class="block rounded px-3 py-2 text-gray-700 hover:bg-gray-100" href="./index.html#dashboard">Dashboard</a>
      </nav>
    </aside>
  `;
}