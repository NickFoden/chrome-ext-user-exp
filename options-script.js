const body = document.querySelector("body");
const theme_button = document.querySelector("#color_theme_button");
function change_theme(theme) {
  body.classList = "";
  theme_button.classList = "";
  if (theme === "dark") {
    body.classList.add("dark_theme");
    theme_button.classList.add("light_theme");
    theme_button.innerText = "Light";
  } else {
    body.classList.add("light_theme");
    theme_button.classList.add("dark_theme");
    theme_button.innerText = "Dark";
  }
}
theme_button.addEventListener("click", (event) => {
  change_theme(theme_button.innerText.toLowerCase());
});
