const STORAGE_KEY = "stableEmpireSave_v1";

const BREEDS = ["Morgan", "Quarter Horse", "Thoroughbred", "Mustang", "Shire", "Appaloosa", "Arabian", "Standardbred"];
const COATS = ["Bay", "Dark Bay", "Chestnut", "Black", "Grey", "Palomino", "Buckskin", "Roan", "Paint"];
const TEMPERAMENTS = ["Calm", "Brave", "Energetic", "Curious", "Stubborn", "Friendly", "Independent", "Nervous"];
const TRAITS = ["Fast Learner", "Strong Build", "Sure-Footed", "Gentle Temperament", "High Endurance", "Natural Racer", "Hardy", "Intelligent"];
const SPECIALIZATIONS = ["None", "Racing", "Endurance", "Trail", "Ranch", "Show", "Jumping", "Draft"];

const REPAIR_NAMES = {
  roof: "Roof",
  stalls: "Stalls",
  fence: "Fencing",
  arena: "Training Arena",
  feedStorage: "Feed Storage",
  water: "Water System",
  tackRoom: "Tack Room"
};

const DEFAULT_STATE = () => ({
  version: 1,
  ownerName: "Stable Owner",
  stableName: "Dusty Creek Stables",
  money: 650,
  energy: 100,
  reputation: 5,
  day: 1,
  seasonIndex: 0,
  year: 1,
  stableLevel: 1,
  stableXp: 0,
  capacity: 3,
  stableStyle: {
    theme: "Rustic Ranch",
    exterior: "Natural Timber",
    fence: "Split Rail",
    signText: "Dusty Creek Stables"
  },
  condition: {
    roof: 72,
    stalls: 68,
    fence: 54,
    arena: 62,
    feedStorage: 80,
    water: 74,
    tackRoom: 66
  },
  inventory: {
    feed: 12,
    treats: 5,
    brushes: 1,
    medicine: 1,
    horseshoes: 0
  },
  playerSkills: {
    riding: 1,
    training: 1,
    handling: 1,
    business: 1,
    breeding: 0,
    veterinary: 0
  },
  horses: [],
  staff: [],
  contracts: [],
  market: [],
  raceRecord: { wins: 0, entries: 0, bestTime: null },
  stats: { horsesTrained: 0, horsesSold: 0, contractsCompleted: 0, moneyEarned: 0 },
  log: ["You arrived at your inherited stable. It needs work, but it is yours."],
  lastRandomEventDay: 0
});

let state = DEFAULT_STATE();
let activeView = "dashboard";

const el = (id) => document.getElementById(id);
const money = (n) => `$${Math.round(n).toLocaleString()}`;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];

function createHorse(breed = choice(BREEDS), starter = false) {
  const age = rand(3, 9);
  const base = starter ? 50 : rand(35, 72);
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    name: starter ? "Copper" : choice(["Willow", "Dakota", "River", "Scout", "Maple", "Bandit", "Belle", "Jasper", "Star", "Dusty", "Storm", "Daisy"]),
    breed,
    sex: choice(["Mare", "Stallion", "Gelding"]),
    age,
    coat: choice(COATS),
    temperament: starter ? "Calm" : choice(TEMPERAMENTS),
    trait: starter ? "Fast Learner" : choice(TRAITS),
    health: starter ? 92 : rand(70, 100),
    energy: starter ? 85 : rand(65, 100),
    bond: starter ? 25 : rand(0, 20),
    speed: clamp(base + rand(-12, 12), 20, 90),
    stamina: clamp(base + rand(-12, 12), 20, 90),
    handling: clamp(base + rand(-12, 12), 20, 90),
    strength: clamp(base + rand(-12, 12), 20, 90),
    intelligence: clamp(base + rand(-12, 12), 20, 90),
    training: starter ? 20 : rand(0, 35),
    specialization: "None",
    fed: false,
    groomed: false,
    hoofCare: 80,
    value: starter ? 320 : 0
  };
}

function horseValue(h) {
  const stats = h.speed + h.stamina + h.handling + h.strength + h.intelligence;
  const trainingBonus = h.training * 5;
  const healthFactor = h.health / 100;
  const specialtyBonus = h.specialization === "None" ? 0 : 300;
  const traitBonus = ["Natural Racer", "Fast Learner", "High Endurance"].includes(h.trait) ? 120 : 50;
  return Math.max(120, Math.round((stats * 2.15 + trainingBonus + specialtyBonus + traitBonus) * healthFactor));
}

function recalcHorseValues() {
  state.horses.forEach(h => h.value = horseValue(h));
  state.market.forEach(h => h.value = horseValue(h));
}

function seasons() { return ["Spring", "Summer", "Autumn", "Winter"]; }

function addLog(message) {
  state.log.unshift(`Day ${state.day}: ${message}`);
  state.log = state.log.slice(0, 40);
}

function toast(message) {
  const t = el("toast");
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

function spend(cost) {
  if (state.money < cost) {
    toast("You do not have enough money.");
    return false;
  }
  state.money -= cost;
  return true;
}

function useEnergy(cost) {
  if (state.energy < cost) {
    toast("You are too tired. End the day to recover.");
    return false;
  }
  state.energy -= cost;
  return true;
}

function earn(amount) {
  state.money += amount;
  state.stats.moneyEarned += amount;
}

function saveGame(showToast = true) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (showToast) toast("Game saved.");
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    state = { ...DEFAULT_STATE(), ...parsed };
    state.stableStyle = { ...DEFAULT_STATE().stableStyle, ...(parsed.stableStyle || {}) };
    state.condition = { ...DEFAULT_STATE().condition, ...(parsed.condition || {}) };
    state.inventory = { ...DEFAULT_STATE().inventory, ...(parsed.inventory || {}) };
    state.playerSkills = { ...DEFAULT_STATE().playerSkills, ...(parsed.playerSkills || {}) };
    state.raceRecord = { ...DEFAULT_STATE().raceRecord, ...(parsed.raceRecord || {}) };
    state.stats = { ...DEFAULT_STATE().stats, ...(parsed.stats || {}) };
    recalcHorseValues();
    return true;
  } catch {
    return false;
  }
}

function startNewGame() {
  const ownerName = el("ownerNameInput").value.trim() || "Stable Owner";
  const stableName = el("stableNameInput").value.trim() || "Dusty Creek Stables";
  const starterBreed = el("starterHorseInput").value;

  state = DEFAULT_STATE();
  state.ownerName = ownerName;
  state.stableName = stableName;
  state.stableStyle.signText = stableName;
  const horse = createHorse(starterBreed, true);
  state.horses = [horse];
  refreshMarket();
  generateContracts();
  addLog(`${ownerName} officially opened ${stableName}.`);
  saveGame(false);
  el("newGameModal").classList.add("hidden");
  renderAll();
  toast("Welcome to Stable Empire.");
}

function refreshMarket() {
  state.market = Array.from({ length: 4 }, () => createHorse());
  state.market.forEach(h => {
    h.value = Math.round(horseValue(h) * (1.05 + Math.random() * .2));
  });
}

function generateContracts() {
  const templates = [
    { title: "Basic Training", desc: "Raise a horse's training level by at least 15 points.", reward: rand(180, 320), days: 5, type: "training" },
    { title: "Race Preparation", desc: "Practice at the race track with any horse.", reward: rand(160, 280), days: 4, type: "practice" },
    { title: "Horse Care", desc: "Feed and groom any horse on the same day.", reward: rand(90, 170), days: 3, type: "care" },
    { title: "Stable Maintenance", desc: "Repair any part of your property.", reward: rand(120, 220), days: 6, type: "repair" }
  ];
  state.contracts = shuffle(templates).slice(0, 3).map(c => ({
    ...c,
    id: `${Date.now()}-${Math.random()}`,
    accepted: false,
    completed: false,
    deadline: state.day + c.days
  }));
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - .5);
}

function checkContracts(actionType) {
  let completed = 0;
  state.contracts.forEach(c => {
    if (c.accepted && !c.completed && c.type === actionType && state.day <= c.deadline) {
      c.completed = true;
      earn(c.reward);
      state.reputation += 3;
      state.stats.contractsCompleted += 1;
      addLog(`Completed contract "${c.title}" and earned ${money(c.reward)}.`);
      completed++;
    }
  });
  if (completed) toast(`Contract completed! Reward paid.`);
}

function renderHeader() {
  el("money").textContent = money(state.money);
  el("date").textContent = `${seasons()[state.seasonIndex]} ${state.day}, Y${state.year}`;
  el("energy").textContent = state.energy;
  el("reputation").textContent = state.reputation;
  el("stableNameSidebar").textContent = state.stableName;
  el("stableLevelSidebar").textContent = `Level ${state.stableLevel} • ${state.horses.length}/${state.capacity} horses`;
}

function renderDashboard() {
  const avgCondition = Math.round(Object.values(state.condition).reduce((a,b)=>a+b,0) / Object.keys(state.condition).length);
  const avgHorseHealth = state.horses.length ? Math.round(state.horses.reduce((a,h)=>a+h.health,0)/state.horses.length) : 0;

  el("dashboardView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">WELCOME BACK, ${escapeHtml(state.ownerName.toUpperCase())}</div>
        <h2>${escapeHtml(state.stableName)}</h2>
        <p>${seasons()[state.seasonIndex]}, Year ${state.year}. Build your reputation one horse at a time.</p>
      </div>
      <span class="pill gold">${escapeHtml(state.stableStyle.theme)}</span>
    </div>

    <div class="grid four">
      ${statCard("🐴 Horses", `${state.horses.length}/${state.capacity}`, "Current capacity")}
      ${statCard("🛠️ Property", `${avgCondition}%`, "Average condition")}
      ${statCard("❤️ Horse Health", `${avgHorseHealth}%`, "Average health")}
      ${statCard("🏆 Race Wins", state.raceRecord.wins, `${state.raceRecord.entries} total entries`)}
    </div>

    <div class="grid two" style="margin-top:1rem">
      <div class="card">
        <h3>Today's Stable</h3>
        <div class="list">
          ${state.horses.map(h => `
            <div class="list-item">
              <div class="row">
                <div><strong>${escapeHtml(h.name)}</strong><div class="muted">${escapeHtml(h.breed)} • ${escapeHtml(h.coat)}</div></div>
                <span class="pill">${h.health}% health</span>
              </div>
            </div>
          `).join("") || `<div class="muted">You do not own any horses yet.</div>`}
        </div>
      </div>

      <div class="card">
        <h3>Recent Events</h3>
        <div class="event-log">
          ${state.log.map(x => `<div>${escapeHtml(x)}</div>`).join("")}
        </div>
      </div>
    </div>

    <div class="grid two" style="margin-top:1rem">
      <div class="card">
        <h3>Player Skills</h3>
        ${skillLine("Riding", state.playerSkills.riding)}
        ${skillLine("Training", state.playerSkills.training)}
        ${skillLine("Horse Handling", state.playerSkills.handling)}
        ${skillLine("Business", state.playerSkills.business)}
        ${skillLine("Breeding", state.playerSkills.breeding)}
        ${skillLine("Veterinary", state.playerSkills.veterinary)}
      </div>
      <div class="card">
        <h3>Supplies</h3>
        <div class="grid three">
          ${inventoryTile("🌾", "Feed", state.inventory.feed)}
          ${inventoryTile("🍎", "Treats", state.inventory.treats)}
          ${inventoryTile("🪮", "Brushes", state.inventory.brushes)}
          ${inventoryTile("🩺", "Medicine", state.inventory.medicine)}
          ${inventoryTile("🧲", "Horseshoes", state.inventory.horseshoes)}
        </div>
      </div>
    </div>
  `;
}

function statCard(icon, value, label) {
  return `<div class="card stat-card"><div>${icon}</div><strong>${value}</strong><small>${label}</small></div>`;
}

function skillLine(name, value) {
  const pct = Math.min(100, value * 5);
  return `<div style="margin:.7rem 0">
    <div class="row"><span>${name}</span><strong>${value}</strong></div>
    <div class="progress"><span style="width:${pct}%"></span></div>
  </div>`;
}

function inventoryTile(icon, name, value) {
  return `<div class="list-item"><div>${icon}</div><strong>${value}</strong><div class="muted">${name}</div></div>`;
}

function renderHorses() {
  el("horsesView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">YOUR HORSES</div>
        <h2>Stable Roster</h2>
        <p>Care for, train and specialize your horses.</p>
      </div>
      <span class="pill">${state.horses.length}/${state.capacity} stalls occupied</span>
    </div>

    ${state.horses.length ? `<div class="grid two">${state.horses.map(renderHorseCard).join("")}</div>` : `
      <div class="card"><p>You currently own no horses. Visit the Horse Market in town.</p></div>
    `}
  `;

  document.querySelectorAll("[data-horse-action]").forEach(btn => btn.addEventListener("click", onHorseAction));
}

function renderHorseCard(h) {
  return `
    <div class="card horse-card">
      <div class="horse-head">
        <div>
          <div class="horse-name">${escapeHtml(h.name)}</div>
          <div class="muted">${escapeHtml(h.breed)} • ${escapeHtml(h.sex)} • Age ${h.age}</div>
        </div>
        <div style="text-align:right">
          <span class="pill gold">${money(h.value)}</span>
          <div class="muted" style="margin-top:.4rem">${escapeHtml(h.coat)}</div>
        </div>
      </div>

      <div>
        <span class="pill">${escapeHtml(h.temperament)}</span>
        <span class="pill green">${escapeHtml(h.trait)}</span>
        <span class="pill blue">${escapeHtml(h.specialization)}</span>
      </div>

      <div class="stats-mini">
        ${miniStat("Health", h.health)}
        ${miniStat("Energy", h.energy)}
        ${miniStat("Bond", h.bond)}
        ${miniStat("Speed", h.speed)}
        ${miniStat("Stamina", h.stamina)}
        ${miniStat("Handling", h.handling)}
        ${miniStat("Strength", h.strength)}
        ${miniStat("Intelligence", h.intelligence)}
        ${miniStat("Training", h.training)}
      </div>

      <div class="actions">
        <button data-horse-action="feed" data-id="${h.id}">🌾 Feed</button>
        <button data-horse-action="groom" data-id="${h.id}">🪮 Groom</button>
        <button data-horse-action="train" data-id="${h.id}">🎓 Train</button>
        <button data-horse-action="treat" data-id="${h.id}">🍎 Treat</button>
        <button data-horse-action="specialize" data-id="${h.id}">⭐ Specialize</button>
        <button data-horse-action="sell" data-id="${h.id}" class="danger">Sell</button>
      </div>
    </div>
  `;
}

function miniStat(label, value) {
  return `<div><strong>${value}</strong><small>${label}</small></div>`;
}

function onHorseAction(e) {
  const id = e.currentTarget.dataset.id;
  const action = e.currentTarget.dataset.horseAction;
  const h = state.horses.find(x => x.id === id);
  if (!h) return;

  if (action === "feed") {
    if (h.fed) return toast(`${h.name} has already been fed today.`);
    if (state.inventory.feed <= 0) return toast("You are out of feed.");
    state.inventory.feed--;
    h.fed = true;
    h.health = clamp(h.health + 3, 0, 100);
    h.energy = clamp(h.energy + 8, 0, 100);
    addLog(`Fed ${h.name}.`);
  }

  if (action === "groom") {
    if (h.groomed) return toast(`${h.name} has already been groomed today.`);
    if (state.inventory.brushes <= 0) return toast("You need a grooming brush.");
    if (!useEnergy(5)) return;
    h.groomed = true;
    h.bond = clamp(h.bond + 4, 0, 100);
    state.playerSkills.handling += Math.random() < .3 ? 1 : 0;
    addLog(`Groomed ${h.name}.`);
  }

  if (action === "train") {
    if (!useEnergy(15)) return;
    if (h.energy < 15) return toast(`${h.name} needs more rest.`);
    const gain = rand(4, 8) + Math.floor(state.playerSkills.training / 5) + (h.trait === "Fast Learner" ? 2 : 0);
    h.training = clamp(h.training + gain, 0, 100);
    h.energy = clamp(h.energy - 12, 0, 100);
    h.bond = clamp(h.bond + 2, 0, 100);
    if (Math.random() < .35) state.playerSkills.training += 1;
    if (h.training >= 100) state.stats.horsesTrained += 1;
    addLog(`Trained ${h.name} (+${gain} training).`);
    checkContracts("training");
  }

  if (action === "treat") {
    if (state.inventory.treats <= 0) return toast("You are out of treats.");
    state.inventory.treats--;
    h.bond = clamp(h.bond + 7, 0, 100);
    h.energy = clamp(h.energy + 3, 0, 100);
    addLog(`Gave ${h.name} a treat.`);
  }

  if (action === "specialize") {
    if (h.training < 60) return toast(`${h.name} needs at least 60 training first.`);
    const options = SPECIALIZATIONS.filter(x => x !== "None");
    const answer = prompt(`Choose specialization:\n${options.join(", ")}`, h.specialization === "None" ? "Racing" : h.specialization);
    if (!answer) return;
    const match = options.find(x => x.toLowerCase() === answer.trim().toLowerCase());
    if (!match) return toast("That specialization is not available.");
    if (!spend(250)) return;
    h.specialization = match;
    state.reputation += 2;
    addLog(`${h.name} specialized in ${match}.`);
  }

  if (action === "sell") {
    const sale = Math.round(h.value * .9);
    if (!confirm(`Sell ${h.name} for ${money(sale)}?`)) return;
    earn(sale);
    state.horses = state.horses.filter(x => x.id !== h.id);
    state.stats.horsesSold += 1;
    state.reputation += 1;
    addLog(`Sold ${h.name} for ${money(sale)}.`);
  }

  if (h.fed && h.groomed) checkContracts("care");
  recalcHorseValues();
  saveGame(false);
  renderAll();
}

function renderStable() {
  el("stableView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">PROPERTY MANAGEMENT</div>
        <h2>Repair & Customize</h2>
        <p>Restore your property, increase capacity and make the stable your own.</p>
      </div>
      <span class="pill gold">Level ${state.stableLevel}</span>
    </div>

    <div class="grid two">
      <div class="card">
        <h3>Property Condition</h3>
        ${Object.entries(state.condition).map(([key, value]) => {
          const cost = Math.max(25, Math.round((100-value) * 3.2));
          return `<div class="condition-line">
            <strong>${REPAIR_NAMES[key]}</strong>
            <div class="progress"><span style="width:${value}%"></span></div>
            <span>${value}%</span>
            <button data-repair="${key}" ${value >= 100 ? "disabled" : ""}>Repair ${money(cost)}</button>
          </div>`;
        }).join("")}
      </div>

      <div class="card">
        <h3>Stable Expansion</h3>
        <p>Each expansion raises your horse capacity and increases your stable level.</p>
        <div class="notice">Current capacity: <strong>${state.capacity} horses</strong></div>
        <hr>
        <button id="expandStableBtn" class="primary">Expand Stable — ${money(expansionCost())}</button>

        <hr>
        <h3>Customization</h3>
        <div class="form-grid">
          <label>Theme
            <select id="themeSelect">
              ${["Rustic Ranch","Western Prestige","Victorian Estate","Racing Stable","Breeder's Estate","Working Ranch","Luxury Equestrian Estate"].map(x=>`<option ${x===state.stableStyle.theme?"selected":""}>${x}</option>`).join("")}
            </select>
          </label>
          <label>Exterior
            <select id="exteriorSelect">
              ${["Natural Timber","Dark Timber","Whitewashed Wood","Red Barn","Stone & Timber","Cream & Walnut"].map(x=>`<option ${x===state.stableStyle.exterior?"selected":""}>${x}</option>`).join("")}
            </select>
          </label>
          <label>Fence
            <select id="fenceSelect">
              ${["Split Rail","Painted Board","Post & Rail","Stone Boundary","Decorative Estate"].map(x=>`<option ${x===state.stableStyle.fence?"selected":""}>${x}</option>`).join("")}
            </select>
          </label>
          <label>Stable Sign
            <input id="signInput" maxlength="36" value="${escapeAttr(state.stableStyle.signText)}">
          </label>
        </div>
        <button id="saveCustomizationBtn" style="margin-top:.8rem">Save Customization — $50</button>
      </div>
    </div>
  `;

  document.querySelectorAll("[data-repair]").forEach(btn => btn.addEventListener("click", () => repairStable(btn.dataset.repair)));
  el("expandStableBtn").addEventListener("click", expandStable);
  el("saveCustomizationBtn").addEventListener("click", saveCustomization);
}

function expansionCost() {
  return 900 + (state.stableLevel - 1) * 850;
}

function repairStable(key) {
  const value = state.condition[key];
  if (value >= 100) return;
  const cost = Math.max(25, Math.round((100-value) * 3.2));
  if (!spend(cost)) return;
  state.condition[key] = 100;
  state.reputation += 1;
  addLog(`Repaired ${REPAIR_NAMES[key]} to full condition.`);
  checkContracts("repair");
  saveGame(false);
  renderAll();
}

function expandStable() {
  const cost = expansionCost();
  if (!spend(cost)) return;
  state.stableLevel += 1;
  state.capacity += state.stableLevel <= 3 ? 3 : 5;
  state.reputation += 5;
  addLog(`Expanded the stable to Level ${state.stableLevel}. Capacity is now ${state.capacity}.`);
  saveGame(false);
  renderAll();
}

function saveCustomization() {
  if (!spend(50)) return;
  state.stableStyle.theme = el("themeSelect").value;
  state.stableStyle.exterior = el("exteriorSelect").value;
  state.stableStyle.fence = el("fenceSelect").value;
  state.stableStyle.signText = el("signInput").value.trim() || state.stableName;
  addLog(`Updated stable customization: ${state.stableStyle.theme}.`);
  saveGame(false);
  renderAll();
}

function renderTown() {
  el("townView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">CEDAR VALLEY</div>
        <h2>Town</h2>
        <p>Buy supplies, find horses, hire specialists and handle business around town.</p>
      </div>
    </div>

    <div class="shop-grid">
      ${shopCard("🌾","General Store","Feed, treats and everyday stable supplies.",
        `<button data-buy="feed" data-cost="60" data-qty="10">10 Feed — $60</button>
         <button data-buy="treats" data-cost="35" data-qty="8">8 Treats — $35</button>
         <button data-buy="brushes" data-cost="25" data-qty="1">Brush — $25</button>`)}
      ${shopCard("🧰","Tack Shop","Horse equipment and practical stable gear.",
        `<button data-buy="horseshoes" data-cost="45" data-qty="4">4 Horseshoes — $45</button>`)}
      ${shopCard("🩺","Veterinarian","Restore an injured or unhealthy horse.",
        `<button id="vetBtn">Treat Lowest-Health Horse — $100</button>`)}
      ${shopCard("🧲","Farrier","Improve hoof condition for your horses.",
        `<button id="farrierBtn">Farrier Visit — $70</button>`)}
      ${shopCard("🏦","Bank","Secure funding for expansion when money is tight.",
        `<button id="loanBtn">Take $1,000 Loan</button><div class="muted" style="margin-top:.5rem">Prototype loan: repay $1,150 automatically over time.</div>`)}
      ${shopCard("📌","Notice Board","Find fresh work from local horse owners.",
        `<button id="refreshContractsBtn">Refresh Contracts — $15</button>`)}
    </div>

    <div class="card" style="margin-top:1rem">
      <div class="row wrap">
        <div>
          <h3 style="margin-bottom:.2rem">🐴 Horse Market</h3>
          <div class="muted">Market stock refreshes every 3 days.</div>
        </div>
        <span class="pill">${state.horses.length}/${state.capacity} stalls occupied</span>
      </div>
      <div class="grid two">
        ${state.market.map(h => `
          <div class="market-horse">
            <div class="row">
              <div>
                <strong>${escapeHtml(h.name)}</strong>
                <div class="muted">${escapeHtml(h.breed)} • ${escapeHtml(h.sex)} • ${escapeHtml(h.coat)}</div>
              </div>
              <strong>${money(h.value)}</strong>
            </div>
            <div style="margin:.55rem 0">
              <span class="pill">${escapeHtml(h.temperament)}</span>
              <span class="pill green">${escapeHtml(h.trait)}</span>
            </div>
            <div class="muted">Speed ${h.speed} • Stamina ${h.stamina} • Handling ${h.handling} • Training ${h.training}</div>
            <button data-buy-horse="${h.id}" style="margin-top:.7rem">Buy Horse</button>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  document.querySelectorAll("[data-buy]").forEach(btn => btn.addEventListener("click", () => buyItem(btn.dataset.buy, Number(btn.dataset.cost), Number(btn.dataset.qty))));
  document.querySelectorAll("[data-buy-horse]").forEach(btn => btn.addEventListener("click", () => buyHorse(btn.dataset.buyHorse)));
  el("vetBtn").addEventListener("click", vetVisit);
  el("farrierBtn").addEventListener("click", farrierVisit);
  el("loanBtn").addEventListener("click", takeLoan);
  el("refreshContractsBtn").addEventListener("click", () => {
    if (!spend(15)) return;
    generateContracts(); addLog("Checked the town notice board for new contracts."); saveGame(false); renderAll();
  });
}

function shopCard(icon, name, desc, body) {
  return `<div class="card shop-card"><div class="icon">${icon}</div><h3>${name}</h3><p>${desc}</p><div class="actions">${body}</div></div>`;
}

function buyItem(item, cost, qty) {
  if (!spend(cost)) return;
  state.inventory[item] = (state.inventory[item] || 0) + qty;
  addLog(`Purchased ${qty} ${item} for ${money(cost)}.`);
  saveGame(false);
  renderAll();
}

function buyHorse(id) {
  if (state.horses.length >= state.capacity) return toast("Your stable has no open stalls.");
  const h = state.market.find(x => x.id === id);
  if (!h) return;
  if (!spend(h.value)) return;
  state.horses.push(h);
  state.market = state.market.filter(x => x.id !== id);
  state.reputation += 1;
  addLog(`Purchased ${h.name}, a ${h.breed}, for ${money(h.value)}.`);
  saveGame(false);
  renderAll();
}

function vetVisit() {
  if (!state.horses.length) return toast("You have no horses to treat.");
  const h = [...state.horses].sort((a,b)=>a.health-b.health)[0];
  if (h.health >= 100) return toast("All of your horses are already healthy.");
  if (!spend(100)) return;
  h.health = 100;
  state.playerSkills.veterinary += Math.random() < .2 ? 1 : 0;
  addLog(`The veterinarian treated ${h.name}.`);
  saveGame(false);
  renderAll();
}

function farrierVisit() {
  if (!state.horses.length) return toast("You have no horses.");
  if (!spend(70)) return;
  state.horses.forEach(h => h.hoofCare = 100);
  addLog("The farrier serviced all horses currently at the stable.");
  saveGame(false);
  renderAll();
}

function takeLoan() {
  if (state.loanBalance && state.loanBalance > 0) return toast("You already have an active loan.");
  earn(1000);
  state.loanBalance = 1150;
  addLog("Bank approved a $1,000 stable loan. $1,150 is owed.");
  saveGame(false);
  renderAll();
}

function renderRacing() {
  const eligible = state.horses.filter(h => h.training >= 35);
  el("racingView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">CEDAR VALLEY RACE TRACK</div>
        <h2>Practice & Racing</h2>
        <p>Test your horses, improve racing skills and enter county events.</p>
      </div>
      <span class="pill gold">${state.raceRecord.wins} wins</span>
    </div>

    <div class="grid two">
      <div class="card">
        <h3>Practice Session</h3>
        <p>Costs 12 player energy and 15 horse energy. Practice improves speed or stamina and records a timed run.</p>
        <label>Horse
          <select id="practiceHorseSelect">
            ${state.horses.map(h=>`<option value="${h.id}">${escapeHtml(h.name)} — Training ${h.training}</option>`).join("")}
          </select>
        </label>
        <button id="practiceBtn" style="margin-top:.8rem" ${state.horses.length ? "" : "disabled"}>Run Practice</button>
        ${state.raceRecord.bestTime ? `<div class="notice" style="margin-top:1rem">Stable best practice time: <strong>${state.raceRecord.bestTime.toFixed(2)} sec</strong></div>` : ""}
      </div>

      <div class="card">
        <h3>County Race</h3>
        <p>Entry fee: $100. Horses need at least 35 training. Winning depends on speed, stamina, handling, training, health and a little luck.</p>
        <label>Horse
          <select id="raceHorseSelect">
            ${eligible.map(h=>`<option value="${h.id}">${escapeHtml(h.name)} — Speed ${h.speed}</option>`).join("")}
          </select>
        </label>
        <button id="raceBtn" class="primary" style="margin-top:.8rem" ${eligible.length ? "" : "disabled"}>Enter County Race — $100</button>
      </div>
    </div>

    <div class="card" style="margin-top:1rem">
      <h3>Race Record</h3>
      <div class="grid three">
        ${statCard("🏁 Entries", state.raceRecord.entries, "Official races")}
        ${statCard("🏆 Wins", state.raceRecord.wins, "First-place finishes")}
        ${statCard("⭐ Reputation", state.reputation, "County standing")}
      </div>
    </div>
  `;

  if (state.horses.length) el("practiceBtn").addEventListener("click", runPractice);
  if (eligible.length) el("raceBtn").addEventListener("click", enterRace);
}

function runPractice() {
  const h = state.horses.find(x => x.id === el("practiceHorseSelect").value);
  if (!h) return;
  if (!useEnergy(12)) return;
  if (h.energy < 15) return toast(`${h.name} needs rest.`);
  h.energy -= 15;
  const time = 92 - (h.speed * .35 + h.stamina * .18 + h.handling * .12 + h.training * .08) + Math.random()*8;
  if (Math.random() < .5) h.speed = clamp(h.speed + 1, 0, 100); else h.stamina = clamp(h.stamina + 1, 0, 100);
  state.playerSkills.riding += Math.random() < .35 ? 1 : 0;
  if (state.raceRecord.bestTime === null || time < state.raceRecord.bestTime) state.raceRecord.bestTime = time;
  addLog(`${h.name} completed race practice in ${time.toFixed(2)} seconds.`);
  checkContracts("practice");
  saveGame(false); renderAll();
}

function enterRace() {
  const h = state.horses.find(x => x.id === el("raceHorseSelect").value);
  if (!h) return;
  if (!spend(100)) return;
  if (!useEnergy(10)) { state.money += 100; return; }
  if (h.energy < 20) { state.money += 100; return toast(`${h.name} is too tired to race.`); }

  h.energy -= 20;
  state.raceRecord.entries += 1;
  const score = h.speed*.32 + h.stamina*.24 + h.handling*.14 + h.training*.16 + h.health*.06 + state.playerSkills.riding*.35 + rand(0,24);
  const opponent = rand(62, 94);

  if (score >= opponent) {
    const prize = 450 + rand(0,180);
    earn(prize);
    state.raceRecord.wins += 1;
    state.reputation += 8;
    h.value += 120;
    addLog(`${h.name} won the County Race! Prize: ${money(prize)}.`);
    toast(`${h.name} WON! ${money(prize)} prize.`);
  } else {
    state.reputation += 1;
    addLog(`${h.name} competed in the County Race but did not win.`);
    toast(`${h.name} finished the race. Better luck next time.`);
  }
  saveGame(false); renderAll();
}

function renderContracts() {
  el("contractsView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">WORK & CUSTOMERS</div>
        <h2>Contracts</h2>
        <p>Take local jobs to earn money and build your reputation.</p>
      </div>
    </div>

    <div class="grid three">
      ${state.contracts.map(c => `
        <div class="card">
          <span class="pill ${c.completed ? "green" : c.accepted ? "gold" : ""}">${c.completed ? "Completed" : c.accepted ? "Accepted" : "Available"}</span>
          <h3 style="margin-top:.7rem">${escapeHtml(c.title)}</h3>
          <p>${escapeHtml(c.desc)}</p>
          <div class="row"><span>Reward</span><strong>${money(c.reward)}</strong></div>
          <div class="row"><span>Deadline</span><strong>Day ${c.deadline}</strong></div>
          <button data-contract="${c.id}" style="margin-top:.8rem" ${c.accepted || c.completed ? "disabled" : ""}>Accept Contract</button>
        </div>
      `).join("") || `<div class="card"><p>No contracts are currently posted.</p></div>`}
    </div>
  `;

  document.querySelectorAll("[data-contract]").forEach(btn => btn.addEventListener("click", () => acceptContract(btn.dataset.contract)));
}

function acceptContract(id) {
  const c = state.contracts.find(x => x.id === id);
  if (!c) return;
  c.accepted = true;
  addLog(`Accepted contract "${c.title}".`);
  saveGame(false); renderAll();
}

const STAFF_POOL = [
  { role: "Stablehand", name: "Emily Parker", wage: 45, skill: 3, desc: "Feeds horses automatically each morning." },
  { role: "Trainer", name: "Thomas Reed", wage: 85, skill: 4, desc: "Adds a small amount of training to one horse each day." },
  { role: "Farrier", name: "Arthur Cole", wage: 70, skill: 4, desc: "Reduces daily hoof wear." },
  { role: "Manager", name: "Clara Bennett", wage: 120, skill: 5, desc: "Improves daily business income and reputation." }
];

function renderStaff() {
  el("staffView").innerHTML = `
    <div class="page-heading">
      <div>
        <div class="eyebrow">EMPLOYEES</div>
        <h2>Stable Staff</h2>
        <p>Hire people to automate routine work as your operation grows.</p>
      </div>
    </div>

    <div class="grid two">
      <div class="card">
        <h3>Current Staff</h3>
        <div class="list">
          ${state.staff.map(s=>`
            <div class="list-item">
              <div class="row">
                <div><strong>${escapeHtml(s.name)}</strong><div class="muted">${escapeHtml(s.role)} • Skill ${s.skill}/5</div></div>
                <strong>${money(s.wage)}/day</strong>
              </div>
              <div class="muted" style="margin-top:.4rem">${escapeHtml(s.desc)}</div>
              <button data-fire="${s.id}" class="danger" style="margin-top:.6rem">Dismiss</button>
            </div>
          `).join("") || `<div class="muted">You are currently running the stable alone.</div>`}
        </div>
      </div>

      <div class="card">
        <h3>Hiring Board</h3>
        <div class="list">
          ${STAFF_POOL.filter(p=>!state.staff.some(s=>s.role===p.role)).map(p=>`
            <div class="list-item">
              <div class="row">
                <div><strong>${p.name}</strong><div class="muted">${p.role} • Skill ${p.skill}/5</div></div>
                <strong>${money(p.wage)}/day</strong>
              </div>
              <div class="muted" style="margin-top:.4rem">${p.desc}</div>
              <button data-hire="${p.role}" style="margin-top:.6rem">Hire</button>
            </div>
          `).join("") || `<div class="muted">All available staff roles are currently filled.</div>`}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll("[data-hire]").forEach(btn=>btn.addEventListener("click",()=>hireStaff(btn.dataset.hire)));
  document.querySelectorAll("[data-fire]").forEach(btn=>btn.addEventListener("click",()=>fireStaff(btn.dataset.fire)));
}

function hireStaff(role) {
  const p = STAFF_POOL.find(x=>x.role===role);
  if (!p) return;
  const hiringFee = p.wage * 2;
  if (!spend(hiringFee)) return;
  state.staff.push({ ...p, id: `${Date.now()}-${Math.random()}` });
  addLog(`Hired ${p.name} as ${p.role}.`);
  saveGame(false); renderAll();
}

function fireStaff(id) {
  const s = state.staff.find(x=>x.id===id);
  if (!s) return;
  if (!confirm(`Dismiss ${s.name}?`)) return;
  state.staff = state.staff.filter(x=>x.id!==id);
  addLog(`Dismissed ${s.name}.`);
  saveGame(false); renderAll();
}

function processStaff() {
  const wages = state.staff.reduce((sum,s)=>sum+s.wage,0);
  if (wages > 0) {
    if (state.money >= wages) {
      state.money -= wages;
      addLog(`Paid ${money(wages)} in staff wages.`);
    } else {
      state.reputation = Math.max(0, state.reputation - 3);
      addLog(`Could not fully cover staff wages. Reputation suffered.`);
    }
  }

  if (state.staff.some(s=>s.role==="Stablehand") && state.inventory.feed >= state.horses.length) {
    state.horses.forEach(h => {
      if (!h.fed) {
        state.inventory.feed--;
        h.fed = true;
        h.health = clamp(h.health + 2,0,100);
      }
    });
    if (state.horses.length) addLog("Stablehand handled morning feeding.");
  }

  if (state.staff.some(s=>s.role==="Trainer") && state.horses.length) {
    const target = [...state.horses].sort((a,b)=>a.training-b.training)[0];
    target.training = clamp(target.training + 2,0,100);
    addLog(`Trainer worked with ${target.name}.`);
  }

  if (state.staff.some(s=>s.role==="Manager")) {
    const income = 25 + state.stableLevel*5;
    earn(income);
    if (Math.random() < .25) state.reputation += 1;
    addLog(`Manager generated ${money(income)} in stable service income.`);
  }
}

function processRandomEvent() {
  if (state.day - state.lastRandomEventDay < 2 || Math.random() > .35) return;
  state.lastRandomEventDay = state.day;
  const events = [
    () => {
      const amount = rand(35,90);
      state.money = Math.max(0,state.money-amount);
      addLog(`A storm damaged supplies. Repairs and replacements cost ${money(amount)}.`);
    },
    () => {
      if (!state.horses.length) return;
      const h = choice(state.horses);
      h.health = clamp(h.health-rand(4,10),0,100);
      addLog(`${h.name} developed a minor illness and lost some health.`);
    },
    () => {
      const tip = rand(40,120);
      earn(tip);
      addLog(`A satisfied customer left an unexpected ${money(tip)} bonus.`);
    },
    () => {
      state.reputation += 2;
      addLog(`Word of your stable spread around Cedar Valley. Reputation increased.`);
    },
    () => {
      state.inventory.feed += 4;
      addLog(`A neighboring rancher traded you four bags of feed for helping with a loose horse.`);
    }
  ];
  choice(events)();
}

function advanceDay() {
  state.day += 1;
  state.energy = 100;

  if (state.day > 30) {
    state.day = 1;
    state.seasonIndex += 1;
    if (state.seasonIndex > 3) {
      state.seasonIndex = 0;
      state.year += 1;
      state.horses.forEach(h => h.age += 1);
    }
  }

  state.horses.forEach(h => {
    h.fed = false;
    h.groomed = false;
    h.energy = clamp(h.energy + rand(18,28),0,100);
    h.health = clamp(h.health - (Math.random() < .25 ? rand(0,2) : 0),0,100);
    h.hoofCare = clamp(h.hoofCare - rand(1,4),0,100);
    if (state.inventory.feed <= 0) h.health = clamp(h.health-3,0,100);
  });

  Object.keys(state.condition).forEach(key => {
    const wear = Math.random() < .4 ? rand(0,2) : 0;
    state.condition[key] = clamp(state.condition[key]-wear,0,100);
  });

  processStaff();
  processRandomEvent();

  if (state.loanBalance && state.loanBalance > 0) {
    const payment = Math.min(50, state.loanBalance, state.money);
    state.loanBalance -= payment;
    state.money -= payment;
    if (payment > 0) addLog(`Bank collected ${money(payment)} toward your loan.`);
    if (state.loanBalance <= 0) addLog("Your stable loan has been repaid.");
  }

  state.contracts.forEach(c => {
    if (c.accepted && !c.completed && state.day > c.deadline) {
      c.failed = true;
      c.accepted = false;
      state.reputation = Math.max(0,state.reputation-2);
    }
  });

  if ((state.day - 1) % 3 === 0) refreshMarket();
  if ((state.day - 1) % 4 === 0) generateContracts();

  recalcHorseValues();
  addLog(`A new day begins in ${seasons()[state.seasonIndex]}.`);
  saveGame(false);
  renderAll();
  toast("A new day has begun.");
}

function renderAll() {
  renderHeader();
  renderDashboard();
  renderHorses();
  renderStable();
  renderTown();
  renderRacing();
  renderContracts();
  renderStaff();
  switchView(activeView);
}

function switchView(view) {
  activeView = view;
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("active", b.dataset.view===view));
  el(`${view}View`).classList.add("active");
}

function exportSave() {
  const blob = new Blob([JSON.stringify(state, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `stable-empire-save-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      state = { ...DEFAULT_STATE(), ...parsed };
      recalcHorseValues();
      saveGame(false);
      renderAll();
      toast("Save imported.");
    } catch {
      toast("That save file is not valid.");
    }
  };
  reader.readAsText(file);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[ch]);
}
function escapeAttr(value) { return escapeHtml(value); }

function setupEvents() {
  document.querySelectorAll("#nav button").forEach(btn=>btn.addEventListener("click",()=>switchView(btn.dataset.view)));
  el("advanceDayBtn").addEventListener("click", advanceDay);
  el("saveBtn").addEventListener("click", ()=>saveGame(true));
  el("exportBtn").addEventListener("click", exportSave);
  el("importInput").addEventListener("change", e => {
    if (e.target.files[0]) importSave(e.target.files[0]);
    e.target.value = "";
  });
  el("resetBtn").addEventListener("click", () => {
    if (!confirm("Delete your current Stable Empire save and start over?")) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });
  el("startGameBtn").addEventListener("click", startNewGame);
}

function boot() {
  setupEvents();
  const loaded = loadGame();
  if (!loaded) {
    el("newGameModal").classList.remove("hidden");
    state = DEFAULT_STATE();
    refreshMarket();
    generateContracts();
  } else {
    el("newGameModal").classList.add("hidden");
  }
  renderAll();
}

boot();
