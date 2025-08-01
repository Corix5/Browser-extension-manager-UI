export function createExtensionFilter(text, filter) {
  const filterButton = document.createElement('button');
  filterButton.classList.add('filter-button');
  filterButton.type = 'button';
  filterButton.textContent = text;

  filterButton.addEventListener('click', () => {
    filter();
  });

  return filterButton;
}
