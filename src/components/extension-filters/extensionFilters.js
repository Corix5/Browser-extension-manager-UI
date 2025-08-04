export function createExtensionFilter(status, filter) {
  const filterButton = document.createElement('button');
  filterButton.classList.add('filter-button');
  filterButton.type = 'button';
  filterButton.textContent = status;

  filterButton.dataset.status = status;

  filterButton.addEventListener('click', () => {
    filter();
  });

  return filterButton;
}

