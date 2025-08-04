import { createHeader } from "./components/header/header.js";
import { createExtensionFilter } from "./components/extension-filters/extensionFilters.js";
import { extensions } from "./data/data.js";
import { createExtensionCard } from "./components/extension-card/extensionCard.js";
import { applyTheme } from "./utils/theme-utils.js";

let currentExtensions = [...extensions];
const container = document.getElementById("extensions-container");
const headerController = document.getElementById("extension-header-controller");
const filters = document.getElementById("filters");
let currentFilterStatus = "all";

const onRemove = (id, currentFilterStatus) => {
  currentExtensions = currentExtensions.filter((ext) => ext.id !== id);
  if (currentFilterStatus === "all") {
    renderCards(currentExtensions, currentFilterStatus);
  } else if (currentFilterStatus === "active") {
    renderCards(filterByStatus("active"), currentFilterStatus);
  } else {
    renderCards(filterByStatus("inactive"), currentFilterStatus);
  }
};

const renderCards = (extensionsToRender, currentFilterStatus) => {
  container.innerHTML = "";
  extensionsToRender.forEach((extension) => {
    const card = createExtensionCard(
      extension,
      onRemove,
      toggleCheckbox,
      currentFilterStatus
    );
    container.appendChild(card);
  });

  const noExtensionMessage = document.getElementById("no-extension-message");
  noExtensionMessage.classList.toggle("active", extensionsToRender.length === 0);

  const savedTheme = localStorage.getItem("theme");
  const isLightTheme = savedTheme === "light";
  applyTheme(isLightTheme, themeIcon);
};

const filterByStatus = (status) => {
  if (status === "all") return currentExtensions;
  return currentExtensions.filter(
    (ext) => ext.isActive === (status === "active")
  );
};

const toggleCheckbox = (id, status) => {
  const ext = currentExtensions.find((e) => e.id === id);
  if (ext) ext.isActive = !ext.isActive;
  setTimeout(() => {
    if (status === "active") {
      renderCards(filterByStatus("active"), "active");
    } else if (status === "inactive") {
      renderCards(filterByStatus("inactive"), "inactive");
    } else {
      renderCards(currentExtensions, "all");
    }
  }, 500);
};

const { extensionHeader, themeToggleBtn, themeIcon } = createHeader();

headerController.appendChild(extensionHeader);

const updateSelectedButton = () => {
  allButton.classList.toggle("selected", currentFilterStatus === "all");
  activeButton.classList.toggle("selected", currentFilterStatus === "active");
  inactiveButton.classList.toggle(
    "selected",
    currentFilterStatus === "inactive"
  );
};

const allButton = createExtensionFilter("All", () => {
  currentFilterStatus = "all";
  renderCards(filterByStatus("all"), currentFilterStatus);
  updateSelectedButton();
});

const activeButton = filters.appendChild(
  createExtensionFilter("Active", () => {
    currentFilterStatus = "active";
    renderCards(filterByStatus("active"), currentFilterStatus);
    updateSelectedButton();
  })
);

const inactiveButton = filters.appendChild(
  createExtensionFilter("Inactive", () => {
    currentFilterStatus = "inactive";
    renderCards(filterByStatus("inactive"), currentFilterStatus);
    updateSelectedButton();
  })
);

filters.appendChild(allButton);
filters.appendChild(activeButton);
filters.appendChild(inactiveButton);

renderCards(currentExtensions, currentFilterStatus);
updateSelectedButton();
