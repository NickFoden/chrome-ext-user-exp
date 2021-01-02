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
  chrome.runtime.sendMessage({
    message: "set_theme",
    payload: theme_button.innerText.toLowerCase(),
  });
  // change_theme(theme_button.innerText.toLowerCase());
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.message === "change_theme") {
    change_theme(req.payload);
    sendResponse({ message: "success" });
  }
});
