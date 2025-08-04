import { applyTheme } from "../../utils/theme-utils.js";

export function createHeader() {
  const extensionHeader = document.createElement("header");
  extensionHeader.classList.add("extension-header");

  const headerTitle = document.createElement("div");
  headerTitle.classList.add("header-title");

  const logoExtensionTitle = document.createElement("img");
  logoExtensionTitle.src = "../../../assets/images/logo.svg";
  logoExtensionTitle.alt = "logo";

  headerTitle.appendChild(logoExtensionTitle);
  extensionHeader.appendChild(headerTitle);

  const themeToggleBtn = document.createElement("button");
  themeToggleBtn.classList.add("theme-toggle-btn");

  const themeIcon = document.createElement("img");
  themeIcon.classList.add("theme-icon");
  themeToggleBtn.appendChild(themeIcon);
  extensionHeader.appendChild(themeToggleBtn);

  themeToggleBtn.addEventListener("click", () => {
    const isNowLight = !document.body.classList.contains("light");
    applyTheme(isNowLight, themeIcon);
    localStorage.setItem("theme", isNowLight ? "light" : "dark");
  });

  return {
    extensionHeader,
    themeToggleBtn,
    themeIcon,
  };
}
