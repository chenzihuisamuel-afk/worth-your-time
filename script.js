const scene = document.getElementById("scene");
const kicker = document.getElementById("kicker");
const typed = document.getElementById("typed");
const subtitle = document.getElementById("subtitle");
const tapHint = document.getElementById("tapHint");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const reply = document.getElementById("reply");
const stars = document.getElementById("stars");

let step = 0;
let locked = false;
let noClicks = 0;

const steps = [
  {
    kicker: "",
    title: "Hey.",
    subtitle: "",
    typed: true
  },
  {
    kicker: "a small thought",
    title: "I've been thinking.",
    subtitle: ""
  },
  {
    kicker: "honestly",
    title: "I could've just sent you a message.",
    subtitle: "But that didn't feel quite right."
  },
  {
    kicker: "so...",
    title: "Let's have dinner.",
    subtitle: "I think it'll be worth your time.",
    buttons: true
  }
];

const noReplies = [
  "Really?",
  "I'd like to see you.",
  "Nothing boring, you have my word.",
  "Still no?",
  "Okay, the Nah button is getting weaker.",
  "Guess there's only one option left."
];

const noStates = [
  { label: "Nah", width: 108, height: 50, font: 16 },
  { label: "Na", width: 90, height: 46, font: 15 },
  { label: "N", width: 70, height: 42, font: 14 },
  { label: "·", width: 48, height: 36, font: 18 },
  { label: "", width: 28, height: 28, font: 0 },
  { label: "", width: 0, height: 0, font: 0 }
];

function fadeUpdate(fn) {
  locked = true;
  scene.classList.remove("active");
  setTimeout(() => {
    fn();
    scene.classList.add("active");
    locked = false;
  }, 420);
}

function typeText(text) {
  typed.textContent = "";
  let i = 0;
  locked = true;
  const interval = setInterval(() => {
    typed.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      locked = false;
    }
  }, 85);
}

function renderStep() {
  const current = steps[step];
  kicker.textContent = current.kicker || "";
  subtitle.textContent = current.subtitle || "";
  reply.textContent = "";
  buttons.classList.toggle("hidden", !current.buttons);
  tapHint.classList.toggle("hidden", current.buttons);

  if (current.typed) {
    typeText(current.title);
  } else {
    typed.textContent = current.title;
  }
}

function nextStep() {
  if (locked) return;
  if (step >= steps.length - 1) return;
  step++;
  fadeUpdate(renderStep);
}

scene.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") return;
  nextStep();
});

function setReply(text) {
  reply.classList.add("swap");
  setTimeout(() => {
    reply.textContent = text;
    reply.classList.remove("swap");
  }, 160);
}

noBtn.addEventListener("click", () => {
  setReply(noReplies[noClicks] || "Guess there's only one option left.");

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
  fadeUpdate(() => {
    kicker.textContent = "thank you";
    typed.innerHTML = "";
    typed.textContent = "I'm really looking forward to this.";
    subtitle.innerHTML = "See you soon. 🍽️";
    buttons.classList.add("hidden");
    tapHint.classList.add("hidden");
    reply.innerHTML = `
      <div class="celebration">
        <div class="plate">🍽️</div>
        <div class="spark s1">✦</div>
        <div class="spark s2">✧</div>
        <div class="spark s3">✦</div>
        <div class="spark s4">✧</div>
        <div class="spark s5">✦</div>
      </div>
    `;
  });
});

for (let i = 0; i < 64; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration = 2.4 + Math.random() * 3 + "s";
  stars.appendChild(star);
}

renderStep();
