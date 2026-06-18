// DATA
const engines = {
  gasoline: { co2: 180, cost: 1500 },
  diesel: { co2: 160, cost: 1300 },
  water: { co2: 0, cost: 200 }
};

const usage = {
  short: 0.8,
  medium: 1,
  long: 1.4
};

let selected = {
  engine: null,
  usage: null
};

// STATE SWITCHING
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add("active");
}

// IMPACT UPDATE
function updateImpact() {
  const co2Output = document.getElementById("co2-value");
  const costOutput = document.getElementById("cost-value");

  if (!selected.engine || !selected.usage) {
    co2Output.textContent = 0;
    costOutput.textContent = 0;
    return;
  }

  const base = engines[selected.engine];
  const factor = usage[selected.usage];

  const co2 = Math.round(base.co2 * factor);
  const cost = Math.round(base.cost * factor);

  co2Output.textContent = co2;
  costOutput.textContent = cost;
}

function initApp() {
  const startButton = document.getElementById("btn-start");
  const resultButton = document.getElementById("btn-result");
  const restartButton = document.getElementById("btn-restart");
  const ctaButton = document.getElementById("btn-cta");

  startButton.addEventListener("click", () => showScreen("screen-play"));

  document.querySelectorAll(".choice").forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".choice-group");
      if (!group) return;

      const type = group.dataset.type;
      const option = btn.dataset.option;
      if (!option || !type) return;

      selected[type] = option;

      group.querySelectorAll(".choice").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      updateImpact();
    });
  });

  resultButton.addEventListener("click", () => {
    document.getElementById("final-co2").textContent =
      document.getElementById("co2-value").textContent;
    document.getElementById("final-cost").textContent =
      document.getElementById("cost-value").textContent;
    showScreen("screen-result");
  });

  restartButton.addEventListener("click", () => {
    selected = { engine: null, usage: null };
    document.querySelectorAll(".choice").forEach(b => b.classList.remove("selected"));
    updateImpact();
    showScreen("screen-start");
  });

  ctaButton.addEventListener("click", () => {
    window.location.href = "#crowdfunding";
  });

  const donationForm = document.getElementById("donation-form");
  const donationAmountInput = document.getElementById("donation-amount");
  const donationMessage = document.getElementById("donation-message");

  document.querySelectorAll(".amount-btn").forEach(button => {
    button.addEventListener("click", () => {
      const amount = Number(button.textContent.replace('€', '').trim());
      donationAmountInput.value = amount;
      donationMessage.hidden = true;
    });
  });

  donationForm.addEventListener("submit", event => {
    event.preventDefault();
    const amount = Number(donationAmountInput.value);
    if (amount >= 5) {
      donationMessage.textContent = `Super! Je donatie van €${amount} helpt ons waterauto-project vooruit.`;
      donationMessage.classList.remove("error");
    } else {
      donationMessage.textContent = "Voer minimaal €5 in om te doneren.";
      donationMessage.classList.add("error");
    }
    donationMessage.hidden = false;
  });

  updateImpact();
}

window.addEventListener("DOMContentLoaded", initApp);
