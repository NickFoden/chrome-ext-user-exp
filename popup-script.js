const body = document.querySelector("body");
const ranking_form = document.querySelector("#ranking_form");
const ranking = document.querySelector("#ranking");
const comments = document.querySelector("#comments");
const thank_you = document.querySelector("#thank_you");

function init() {
  if (
    window &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    console.log("dark mode preferred");
    change_theme("dark");
  } else {
    chrome.runtime.sendMessage({ message: "get_theme" }, (response) => {
      if (response.message === "success") {
        change_theme(response.payload);
      }
    });
  }
  chrome.runtime.sendMessage({ message: "get_ranking_data" }, (response) => {
    if (response.message === "success") {
      change_ranking_data(response.payload.ranking, response.payload.comment);
    }
  });
}

function change_theme(theme) {
  body.classList = "";
  if (theme === "dark") {
    body.classList.add("dark_theme");
  } else {
    body.classList.add("light_theme");
  }
}

function change_ranking_data(user_rank, user_comment) {
  ranking.value = user_rank;
  comments.value = user_comment;
}
init();

ranking_form.addEventListener("submit", (event) => {
  event.preventDefault();
  ranking_form.style.transitionDuration = "1.0s";
  thank_you.style.transitionDuration = "1.0s";
  ranking_form.style.opacity = 0;
  thank_you.style.opacity = 1;
  ranking_form.style.pointerEvents = "none";
  chrome.runtime.sendMessage({
    message: "set_ranking_data",
    payload: {
      ranking: ranking.value,
      comment: comments.value,
    },
  });
});
