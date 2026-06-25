const intro = document.getElementById("intro");
const invite = document.getElementById("invite");
const success = document.getElementById("success");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const replyText = document.getElementById("replyText");

function show(section) {
  [intro, invite, success].forEach(panel => panel.classList.remove("active"));
  section.classList.add("active");
}

intro.addEventListener("click", () => show(invite));

const replies = [
  "Really?",
  "I'd like to see you.",
  "Nothing boring, you have my word.",
  "Still no?",
  "Okay, the Nah button is getting weaker.",
  "Guess there's only one option left."
];

const noWidths = [112, 96, 78, 58, 38, 0];
const noLabels = ["Nah.", "Nah", "Na", "N", "·", ""];

let noClicks = 0;

noBtn.addEventListener("click", () => {
  replyText.textContent = replies[noClicks] || "Guess there's only one option left.";

  if (noClicks >= 5) {
    noBtn.style.display = "none";
  } else {
    noBtn.style.width = noWidths[noClicks] + "px";
    noBtn.textContent = noLabels[noClicks];
    noBtn.style.opacity = Math.max(0.25, 1 - (noClicks + 1) * 0.12);
  }

  noClicks++;
});

yesBtn.addEventListener("click", () => {
  show(success);
});
