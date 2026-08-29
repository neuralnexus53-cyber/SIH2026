document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('gemSearchForm');
  const searchInput = document.getElementById('searchInput');
  const searchCategory = document.getElementById('searchCategory');
  const languageSelect = document.getElementById('languageSelect');

  // Handle Search Submission
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      const category = searchCategory.value;
      
      if (query) {
        alert(`Searching for "${query}" in category: ${category}`);
      }
    });
  }

  // Handle Language Selector Change
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      const selectedLang = e.target.value;
      console.log(`Language changed to: ${selectedLang}`);
    });
  }
});