const scene = document.getElementById("scene");
const kicker = document.getElementById("kicker");
const typed = document.getElementById("typed");
const cursor = document.getElementById("cursor");
const subtitle = document.getElementById("subtitle");
const tapHint = document.getElementById("tapHint");
const buttons = document.getElementById("buttons");
const singleAction = document.getElementById("singleAction");
const continueBtn = document.getElementById("continueBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const stars = document.getElementById("stars");

let step = 0;
let locked = false;
let noClicks = 0;
let rejectionMode = false;

const storySteps = [
  { kicker: "", title: "Hey.", subtitle: "", typed: true },
  { kicker: "a small thought", title: "I've been thinking.", subtitle: "" },
  { kicker: "honestly", title: "I could've just sent you a message.", subtitle: "But that didn't feel quite right." },
  { kicker: "so...", title: "Let's have dinner.", subtitle: "I think it'll be worth your time.", buttons: true }
];

const rejectionSlides = [
  { kicker: "attempt declined", title: "Really?", subtitle: "", button: "Continue →" },
  { kicker: "making my case", title: "I'd like to see you.", subtitle: "", button: "Keep going →" },
  { kicker: "small promise", title: "Nothing boring,", subtitle: "you have my word.", button: "One more thing →" },
  { kicker: "checking again", title: "Still no?", subtitle: "", button: "Almost there →" },
  { kicker: "final argument", title: "I still think", subtitle: "it'll be worth your time.", button: "Back →" },
  { kicker: "conclusion", title: "Guess there's only", subtitle: "one option left.", button: "Back →" }
];

const noStates = [
  { label: "Nah", width: 110, height: 50, font: 16, opacity: 0.88 },
  { label: "Na", width: 92, height: 46, font: 15, opacity: 0.74 },
  { label: "N", width: 72, height: 42, font: 14, opacity: 0.60 },
  { label: "·", width: 50, height: 36, font: 18, opacity: 0.46 },
  { label: "", width: 30, height: 30, font: 0, opacity: 0.28 },
  { label: "", width: 0, height: 0, font: 0, opacity: 0 }
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

function resetControls() {
  buttons.classList.add("hidden");
  singleAction.classList.add("hidden");
  tapHint.classList.add("hidden");
  cursor.classList.remove("hidden");
}

function renderStoryStep() {
  rejectionMode = false;
  const current = storySteps[step];

  resetControls();
  kicker.textContent = current.kicker || "";
  subtitle.textContent = current.subtitle || "";

  buttons.classList.toggle("hidden", !current.buttons);
  tapHint.classList.toggle("hidden", current.buttons);

  if (current.typed) {
    typeText(current.title);
  } else {
    typed.textContent = current.title;
  }

  applyNoState();
}

function renderRejectionSlide(index) {
  rejectionMode = true;
  const slide = rejectionSlides[index];

  resetControls();
  kicker.textContent = slide.kicker;
  typed.textContent = slide.title;
  subtitle.textContent = slide.subtitle;
  continueBtn.textContent = slide.button;
  singleAction.classList.remove("hidden");
}

function applyNoState() {
  const stateIndex = Math.min(noClicks, noStates.length - 1);
  const state = noStates[stateIndex];

  if (noClicks >= 5) {
    noBtn.style.display = "none";
    return;
  }

  noBtn.style.display = "inline-block";
  noBtn.textContent = state.label;
  noBtn.style.width = state.width + "px";
  noBtn.style.height = state.height + "px";
  noBtn.style.fontSize = state.font + "px";
  noBtn.style.opacity = state.opacity;
}

function nextStep() {
  if (locked || rejectionMode) return;
  if (step >= storySteps.length - 1) return;
  step++;
  fadeUpdate(renderStoryStep);
}

scene.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") return;
  nextStep();
});

noBtn.addEventListener("click", () => {
  const slideIndex = Math.min(noClicks, rejectionSlides.length - 1);
  fadeUpdate(() => renderRejectionSlide(slideIndex));
});

continueBtn.addEventListener("click", () => {
  noClicks++;

  if (noClicks >= 6) {
    fadeUpdate(() => {
      rejectionMode = false;
      resetControls();
      kicker.textContent = "so...";
      typed.textContent = "Let's have dinner.";
      subtitle.textContent = "I think it'll be worth your time.";
      buttons.classList.remove("hidden");
      noBtn.style.display = "none";
    });
  } else {
    fadeUpdate(renderStoryStep);
  }
});

yesBtn.addEventListener("click", () => {
  fadeUpdate(() => {
    rejectionMode = false;
    resetControls();
    kicker.textContent = "thank you";
    typed.textContent = "I'm really looking forward to this.";
    subtitle.innerHTML = "See you soon. 🍽️";
    cursor.classList.add("hidden");
    typed.insertAdjacentHTML("beforebegin", `
      <div class="celebration">
        <div class="plate">🍽️</div>
        <div class="spark s1">✦</div>
        <div class="spark s2">✧</div>
        <div class="spark s3">✦</div>
        <div class="spark s4">✧</div>
        <div class="spark s5">✦</div>
      </div>
    `);
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

renderStoryStep();
