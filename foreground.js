const div_modal = document.createElement("div");
div_modal.id = "chrome_ext_modal_backing";
div_modal.innerHTML = `<span id="chrome_ext_modal_text1">Thanks for ranking this page . . .</span>
  <span id="chrome_ext_modal_text2">
    <span id="chrome_ext_modal_ranking"></span>'s out of 5
  </span>
`;
document.querySelector("body").appendChild(div_modal);

const modal_backing = document.querySelector("#chrome_ext_modal_backing");
const modal_text1 = document.querySelector("#chrome_ext_modal_text1");
const modal_text2 = document.querySelector("#chrome_ext_modal_text2");
const modal_ranking = document.querySelector("#chrome_ext_modal_ranking");
function display_message(ranking) {
  modal_ranking.innerText = "*".repeat(ranking);

  modal_backing.style.transitionDuration = "3.0s";
  modal_text1.style.transitionDuration = "2.5s";
  modal_text2.style.transitionDuration = "2.5s";
  modal_ranking.style.transitionDuration = "2.5s";

  modal_backing.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  modal_text1.style.color = "rgba(255, 255, 255, 1)";
  modal_text2.style.color = "rgba(255, 255, 255, 1)";
  modal_ranking.style.color = "rgba(255, 255, 255, 1)";

  setTimeout(() => {
    modal_backing.style.transitionDuration = "2.5s";
    modal_backing.style.backgroundColor = "rgba(0, 0, 0, 0)";
    modal_text1.style.color = "rgba(255, 255, 255, 0)";
    modal_text2.style.color = "rgba(255, 255, 255, 0)";
    modal_ranking.style.color = "rgba(255, 255, 255, 0)";
  }, 3001);
}
