const intro = document.getElementById("intro");
const main = document.getElementById("main");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const tease = document.getElementById("tease");
const success = document.getElementById("success");

setTimeout(() => {
  intro.classList.remove("active");
  main.classList.add("active");
}, 2000);

const noReplies = [
  "Really?",
  "I'd like to see you.",
  "Nothing boring, you have my word.",
  "Still no?",
  "Okay, the Nah button is getting weaker.",
  "Guess there's only one option left."
];

const noScales = [0.9, 0.8, 0.7, 0.6, 0.45, 0];
const yesScales = [1.05, 1.12, 1.2, 1.3, 1.45, 1.6];

let noClicks = 0;

no.addEventListener("click", () => {
  tease.textContent = noReplies[noClicks] || "Guess there's only one option left.";

  yes.style.transform = `scale(${yesScales[noClicks] || 1.6})`;

  if (noClicks >= 5) {
    no.style.display = "none";
  } else {
    no.style.transform = `scale(${noScales[noClicks]})`;
    no.style.opacity = Math.max(0.25, 1 - (noClicks + 1) * 0.12);
  }

  noClicks++;
});

yes.addEventListener("click", () => {
  document.querySelector(".buttons").style.display = "none";
  tease.style.display = "none";
  success.classList.remove("hidden");
});
