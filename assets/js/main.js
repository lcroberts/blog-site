import "./copy-button.js";

document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches),
);

function handleNavbar() {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".navigation-menu");

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("max-h-30");
  });
}

function handleLightSwitch() {
  const lightSwitches = document.querySelectorAll(".light-switch");
  if (lightSwitches.length > 0) {
    lightSwitches.forEach((lightSwitch, i) => {
      if (document.documentElement.classList.contains("dark")) {
        lightSwitch.checked = true;
      }
      lightSwitch.onchange = () => {
        const { checked } = lightSwitch;
        lightSwitches.forEach((el, n) => {
          if (n !== i) {
            el.checked = checked;
          }
        });
        if (lightSwitch.checked) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      };
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#copyright-year").innerHTML =
    new Date().getFullYear();
  handleLightSwitch();
  handleNavbar();
});
