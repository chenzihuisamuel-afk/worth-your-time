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

const noSizes = [
  { width: 100, height: 44, font: 17 },
  { width: 88, height: 40, font: 16 },
  { width: 76, height: 36, font: 15 },
  { width: 62, height: 32, font: 14 },
  { width: 45, height: 26, font: 12 },
  { width: 0, height: 0, font: 0 }
];

let noClicks = 0;

no.addEventListener("click", () => {
  tease.textContent = noReplies[noClicks] || "Guess there's only one option left.";

  if (noClicks >= 5) {
    no.style.display = "none";
  } else {
    const size = noSizes[noClicks];
    no.style.width = size.width + "px";
    no.style.height = size.height + "px";
    no.style.fontSize = size.font + "px";
    no.style.opacity = Math.max(0.25, 1 - (noClicks + 1) * 0.12);
  }

  noClicks++;
});

yes.addEventListener("click", () => {
  document.querySelector(".buttons").style.display = "none";
  tease.style.display = "none";
  success.classList.remove("hidden");
});
