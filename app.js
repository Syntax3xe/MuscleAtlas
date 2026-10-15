const muscles = [
  { id: "pectorals", name: "Pectorals", region: "upper", view: "front", location: "Front of the chest", stretches: ["Doorway chest stretch · 20–30 sec each side", "Supported chest opener · 5 slow breaths"], causes: ["Long periods with shoulders rounded forward", "A sudden increase in pressing or pushing exercises", "Unfamiliar lifting or carrying"] },
  { id: "deltoids", name: "Deltoids", region: "upper", view: "front", location: "Shoulder cap", stretches: ["Cross-body shoulder stretch · 20 sec each side", "Gentle pendulum circles · 8 each direction"], causes: ["Repeated overhead reaching or lifting", "A rapid increase in shoulder training volume", "Holding tension while working at a desk"] },
  { id: "biceps", name: "Biceps", region: "upper", view: "front", location: "Front of the upper arm", stretches: ["Wall biceps stretch · 20 sec each side", "Easy elbow extension with palm turned out · 15 sec"], causes: ["Repeated curls, pulling, or carrying", "Sudden effort with a bent elbow", "Returning to training after a break"] },
  { id: "triceps", name: "Triceps", region: "upper", view: "back", location: "Back of the upper arm", stretches: ["Overhead triceps stretch · 20 sec each side", "Supported overhead reach · 5 slow breaths"], causes: ["Repeated pressing or overhead work", "A sudden increase in push-ups or dips", "Reaching overhead for extended periods"] },
  { id: "forearms", name: "Forearms", region: "upper", view: "front", location: "Front of the forearm", stretches: ["Wrist extension stretch · 20 sec each side", "Wrist flexion stretch · 20 sec each side"], causes: ["Long periods of gripping or typing", "Repetitive wrist and hand movements", "Unfamiliar racquet, tool, or climbing activity"] },
  { id: "forearm-extensors", name: "Forearm extensors", region: "upper", view: "back", location: "Back of the forearm", stretches: ["Wrist flexor stretch · 20 sec each side", "Slow wrist circles · 8 each direction"], causes: ["Repeated wrist extension or gripping", "Long sessions using a mouse or hand tools", "A sudden increase in lifting volume"] },
  { id: "sternocleidomastoid", name: "Neck flexors", region: "upper", view: "front", location: "Front and sides of the neck", stretches: ["Gentle ear-to-shoulder stretch · 15 sec each side", "Slow chin tuck · 5 relaxed repetitions"], causes: ["Sustained forward-head posture", "Sleeping in an unfamiliar position", "Long periods looking down at a screen"] },
  { id: "rear-deltoids", name: "Rear deltoids", region: "upper", view: "back", location: "Back of the shoulder", stretches: ["Cross-body shoulder stretch · 20 sec each side", "Hands-clasped chest opener · 5 slow breaths"], causes: ["Repeated pulling or rowing", "A sudden increase in upper-body training", "Unfamiliar reaching behind the body"] },
  { id: "latissimus", name: "Latissimus dorsi", region: "upper", view: "back", location: "Sides of the mid-to-upper back", stretches: ["Child’s pose with side reach · 20 sec each side", "Supported overhead side bend · 15 sec each side"], causes: ["Repeated pulling or overhead activity", "A sudden increase in swimming or climbing", "Limited recovery after back training"] },
  { id: "abdominals", name: "Abdominals", region: "core", view: "front", location: "Front of the trunk", stretches: ["Gentle standing backbend · 5 easy repetitions", "Sphinx pose · 15–20 sec if comfortable"], causes: ["Unfamiliar core exercise or repeated sit-ups", "Coughing or strenuous effort", "Rapid increases in training volume"] },
  { id: "obliques", name: "Obliques", region: "core", view: "front", location: "Sides of the trunk", stretches: ["Standing side reach · 20 sec each side", "Supported seated rotation · 15 sec each side"], causes: ["Repeated twisting or side-bending", "Unfamiliar rotational exercise", "Sudden reaching or lifting from one side"] },
  { id: "lower-back", name: "Spinal extensors", region: "core", view: "back", location: "Along the lower spine", stretches: ["Knees-to-chest, one leg at a time · 15 sec", "Cat-cow · 6 slow, comfortable cycles"], causes: ["Prolonged sitting or a sudden activity change", "Lifting with more load than usual", "Repeated bending or twisting"] },
  { id: "hip-flexors", name: "Hip flexors", region: "lower", view: "front", location: "Front of the hip and upper thigh", stretches: ["Half-kneeling hip-flexor stretch · 20 sec each side", "Standing hip extension · 8 easy repetitions"], causes: ["Extended sitting followed by vigorous activity", "Repeated sprinting, kicking, or stair climbing", "A sudden increase in running volume"] },
  { id: "glutes", name: "Gluteals", region: "lower", view: "back", location: "Back of the hip", stretches: ["Figure-four stretch · 20 sec each side", "Supine knee-to-opposite-shoulder · 15 sec each side"], causes: ["Unfamiliar hill running or squats", "Long periods sitting", "A sudden increase in walking or training"] },
  { id: "quadriceps", name: "Quadriceps", region: "lower", view: "front", location: "Front of the thigh", stretches: ["Standing quad stretch · 20 sec each side", "Side-lying quad stretch · 20 sec each side"], causes: ["Downhill running or repeated stairs", "A new or heavier squat routine", "Sudden increases in running distance"] },
  { id: "adductors", name: "Adductors", region: "lower", view: "front", location: "Inner thigh", stretches: ["Seated butterfly stretch · 20 sec", "Side lunge shift · 5 gentle repetitions each side"], causes: ["Unfamiliar lateral movement or quick direction changes", "Sudden increases in kicking or sprinting", "A new wide-stance exercise"] },
  { id: "hamstrings", name: "Hamstrings", region: "lower", view: "back", location: "Back of the thigh", stretches: ["Supine strap hamstring stretch · 20 sec each side", "Hip hinge with relaxed knees · 5 slow repetitions"], causes: ["Sudden sprinting or acceleration", "A rapid increase in running distance", "Long periods sitting followed by intense activity"] },
  { id: "tibialis", name: "Tibialis anterior", region: "lower", view: "front", location: "Front of the shin", stretches: ["Kneeling shin stretch · 15 sec if comfortable", "Ankle point-and-flex · 8 slow repetitions"], causes: ["Sudden increases in running or walking", "A change in surface, shoes, or training routine", "Repeated uphill walking"] },
  { id: "calves", name: "Calves", region: "lower", view: "back", location: "Back of the lower leg", stretches: ["Straight-knee wall calf stretch · 20 sec each side", "Bent-knee wall calf stretch · 20 sec each side"], causes: ["A sudden increase in running, jumping, or hills", "Standing for long periods", "A change in footwear or training surface"] },
  { id: "trapezius", name: "Trapezius", region: "upper", view: "back", location: "Upper back and base of the neck", stretches: ["Gentle upper-trapezius stretch · 15 sec each side", "Shoulder rolls · 8 slow repetitions"], causes: ["Sustained shoulder tension or desk posture", "Carrying a heavy bag on one side", "Repeated overhead work"] }
];

const list = document.querySelector("#muscleList");
const searchInput = document.querySelector("#muscleSearch");
const regionFilter = document.querySelector("#regionFilter");
const resultCount = document.querySelector("#resultCount");
const emptySearch = document.querySelector("#emptySearch");
const frontMap = document.querySelector("#frontMap");
const backMap = document.querySelector("#backMap");
let selectedId = "pectorals";

function selectMuscle(id) {
  const muscle = muscles.find((item) => item.id === id);
  if (!muscle) return;
  selectedId = id;
  document.querySelector("#detailName").textContent = muscle.name;
  document.querySelector("#detailLocation").textContent = muscle.location;
  document.querySelector("#regionTag").textContent = muscle.region === "core" ? "CORE" : `${muscle.region.toUpperCase()} BODY`;
  document.querySelector("#stretchList").replaceChildren(...muscle.stretches.map((stretch) => makeStretchListItem(stretch, muscle.name)));
  document.querySelector("#causeList").replaceChildren(...muscle.causes.map((cause) => makeListItem(cause)));
  renderList();
  setView(muscle.view);
  document.querySelectorAll(".muscle-zone").forEach((zone) => {
    zone.classList.toggle("is-selected", zone.dataset.muscle === id);
    zone.setAttribute("aria-pressed", String(zone.dataset.muscle === id));
  });
}

function makeListItem(text) {
  const item = document.createElement("li");
  item.textContent = text;
  return item;
}

function makeStretchListItem(stretch, muscleName) {
  const item = document.createElement("li");
  const copy = document.createElement("span");
  const link = document.createElement("a");
  const searchURL = new URL("https://www.youtube.com/results");
  const exercise = stretch.split(" · ")[0];

  copy.className = "stretch-copy";
  copy.textContent = stretch;
  searchURL.searchParams.set("search_query", `${muscleName} ${exercise}`);
  link.className = "stretch-link";
  link.href = searchURL.toString();
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `Search YouTube for ${muscleName}: ${exercise}`);
  link.textContent = "YouTube ↗";
  item.append(copy, link);
  return item;
}

function renderList() {
  const query = searchInput.value.trim().toLowerCase();
  const region = regionFilter.value;
  const matches = muscles.filter((muscle) => {
    const matchesQuery = `${muscle.name} ${muscle.location}`.toLowerCase().includes(query);
    return matchesQuery && (region === "all" || muscle.region === region);
  });
  list.replaceChildren(...matches.map((muscle) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "muscle-option";
    button.classList.toggle("is-selected", muscle.id === selectedId);
    button.setAttribute("aria-current", muscle.id === selectedId ? "true" : "false");
    button.innerHTML = `<span class="option-name">${muscle.name}</span><span class="option-arrow" aria-hidden="true">↗</span>`;
    button.addEventListener("click", () => selectMuscle(muscle.id));
    item.append(button);
    return item;
  }));
  resultCount.textContent = String(matches.length).padStart(2, "0");
  emptySearch.hidden = matches.length > 0;
}

function setView(view) {
  const isFront = view === "front";
  frontMap.toggleAttribute("hidden", !isFront);
  backMap.toggleAttribute("hidden", isFront);
  frontMap.classList.toggle("is-active", isFront);
  backMap.classList.toggle("is-active", !isFront);
  document.querySelectorAll(".view-button").forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

searchInput.addEventListener("input", renderList);
regionFilter.addEventListener("change", renderList);
document.querySelectorAll(".view-button").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
document.querySelectorAll(".muscle-zone").forEach((zone) => {
  zone.addEventListener("click", () => selectMuscle(zone.dataset.muscle));
  zone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectMuscle(zone.dataset.muscle);
    }
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

selectMuscle(selectedId);
