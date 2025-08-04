export function applyTheme(isLight, themeIcon = null) {
  document.body.classList.toggle("light", isLight);

  const staticTargets = [
    document.querySelector(".extension-header"),
    document.querySelector(".header-toggle-btn"),
    document.querySelector(".theme-toggle-btn"),
    document.querySelector(".header-title img"),
  ];

  staticTargets.forEach((el) => {
    if (el) el.classList.toggle("light", isLight);
  });

  // Elementos dinámicos
  document.querySelectorAll(".extension-card").forEach((card) => {
    card.classList.toggle("light", isLight);
    card.querySelectorAll("*").forEach((child) => {
      child.classList.toggle("light", isLight);
    });
  });

  document.querySelectorAll("#filters button").forEach((filter) => {
    filter.classList.toggle("light", isLight);
  });

  if (themeIcon) {
    themeIcon.src = isLight
      ? "../assets/images/icon-moon.svg"
      : "../assets/images/icon-sun.svg";
  }
}
