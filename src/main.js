import { createHeader } from "./components/header/header.js";
import { createExtensionFilter } from "./components/extension-filters/extensionFilters.js";
import { extensions } from "./data/data.js";
import { createExtensionCard } from "./components/extension-card/extensionCard.js";
import { applyTheme } from "./utils/theme-utils.js";

let currentExtensions = [...extensions];
const container = document.getElementById("extensions-container");
const headerController = document.getElementById("extension-header-controller");
const filters = document.getElementById("filters");

const onRemove = (id) => {
  currentExtensions = currentExtensions.filter((ext) => ext.id !== id);
  renderCards(currentExtensions);
};

const toggleCheckbox = (id) => {
  const ext = currentExtensions.find((e) => e.id === id);
  if (ext) ext.isActive = !ext.isActive;
};

const renderCards = (extensionsToRender) => {
  container.innerHTML = "";
  extensionsToRender.forEach((extension) => {
    const card = createExtensionCard(extension, onRemove, toggleCheckbox);
    container.appendChild(card);
  });

  // === Al cargar: aplicar el tema guardado ===
  const savedTheme = localStorage.getItem("theme");
  const isLightTheme = savedTheme === "light";
  applyTheme(isLightTheme, themeIcon);
  console.log("icono: " + themeIcon);
};

const filterByStatus = (status) => {
  if (status === "all") return currentExtensions;
  return currentExtensions.filter(
    (ext) => ext.isActive === (status === "active")
  );
};

const { extensionHeader, themeToggleBtn, themeIcon } = createHeader();

headerController.appendChild(extensionHeader);

filters.appendChild(
  createExtensionFilter("All", () => renderCards(filterByStatus("all")))
);
filters.appendChild(
  createExtensionFilter("Active", () => renderCards(filterByStatus("active")))
);
filters.appendChild(
  createExtensionFilter("Inactive", () =>
    renderCards(filterByStatus("inactive"))
  )
);

renderCards(currentExtensions);
