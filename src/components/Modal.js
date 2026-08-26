export function renderModal({ title, content }) {
  return `
    <dialog aria-labelledby="modal-title" class="rounded-lg p-6 shadow-xl">
      <h2 id="modal-title" class="text-lg font-semibold text-gray-900">${title}</h2>
      <div class="mt-3 text-sm text-gray-600">${content}</div>
    </dialog>
  `;
}