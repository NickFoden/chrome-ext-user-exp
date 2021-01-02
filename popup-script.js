const body = document.querySelector("body");
const ranking_form = document.querySelector("#ranking_form");
const ranking = document.querySelector("#ranking");
const comments = document.querySelector("#comments");
const thank_you = document.querySelector("#thank_you");

function change_theme(theme) {
  body.classList = "";
  if (theme === "dark") {
    body.classList.add("light_theme");
  } else {
    body.classList.add("dark_theme");
  }
}

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
