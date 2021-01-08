const body = document.querySelector("body");
const theme_button = document.querySelector("#color_theme_button");

function init() {
  if (
    window &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    console.log("dark mode preferreed");
    change_theme("dark");
  } else {
    chrome.runtime.sendMessage({ message: "get_theme" }, (response) => {
      if (response.message === "success") {
        change_theme(response.payload);
      }
    });
  }
}

init();
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
