export function createExtensionCard(extension, onRemove, toogleCheckbox) {
  const card = document.createElement("div");
  card.classList.add("extension-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  const titleDescription = document.createElement("div");
  titleDescription.classList.add("title-description");

  const logo = document.createElement("img");
  logo.src = extension.logo;
  logo.alt = `${extension.title} logo`;

  const title = document.createElement("h3");
  title.textContent = extension.title;

  const description = document.createElement("p");
  description.textContent = extension.description;

  card.appendChild(cardContainer);

  cardContainer.appendChild(logo);
  cardContainer.appendChild(titleDescription);
  titleDescription.appendChild(title);
  titleDescription.appendChild(description);

  const controls = document.createElement("div");
  controls.classList.add("controls-card");

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    onRemove(extension.id);
  });

  const isActive = document.createElement("label");
  isActive.classList.add("switch");

  controls.appendChild(removeButton);
  controls.appendChild(isActive);

  const isActiveCheckbox = document.createElement("input");
  isActiveCheckbox.type = "checkbox";
  isActiveCheckbox.checked = extension.isActive;
  isActiveCheckbox.addEventListener("change", () => {
    toogleCheckbox(extension.id);
  }); 

  const isActiveSpan = document.createElement("span");
  isActiveSpan.classList.add("slider");

  isActive.appendChild(isActiveCheckbox);
  isActive.appendChild(isActiveSpan);

  card.appendChild(controls);

  return card;
}
