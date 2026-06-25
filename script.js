const intro = document.getElementById("intro");
const invite = document.getElementById("invite");
const success = document.getElementById("success");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const replyText = document.getElementById("replyText");
const stars = document.getElementById("stars");

function show(panel) {
  [intro, invite, success].forEach(section => section.classList.remove("active"));
  panel.classList.add("active");
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

const noStates = [
  { label: "Nah", width: 108, height: 50, font: 16 },
  { label: "Na", width: 88, height: 46, font: 15 },
  { label: "N", width: 66, height: 42, font: 14 },
  { label: "·", width: 44, height: 34, font: 18 },
  { label: "", width: 26, height: 26, font: 0 },
  { label: "", width: 0, height: 0, font: 0 }
];

let noClicks = 0;

function setReply(text) {
  replyText.classList.add("swap");
  setTimeout(() => {
    replyText.textContent = text;
    replyText.classList.remove("swap");
  }, 160);
}

noBtn.addEventListener("click", () => {
  setReply(replies[noClicks] || "Guess there's only one option left.");

  if (noClicks >= 5) {
    noBtn.style.display = "none";
  } else {
    const state = noStates[noClicks];
    noBtn.textContent = state.label;
    noBtn.style.width = state.width + "px";
    noBtn.style.height = state.height + "px";
    noBtn.style.fontSize = state.font + "px";
    noBtn.style.opacity = Math.max(0.22, 1 - (noClicks + 1) * 0.13);
  }

  noClicks++;
});

yesBtn.addEventListener("click", () => {
  show(success);
});

for (let i = 0; i < 52; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration = 2.4 + Math.random() * 2.8 + "s";
  stars.appendChild(star);
}
