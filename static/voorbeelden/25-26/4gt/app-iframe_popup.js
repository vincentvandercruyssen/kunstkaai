const overlay = document.querySelector("#popup-overlay");
const iframe = document.querySelector("#popup-iframe");
const titleEl = document.querySelector("#popup-title");
const closeBtn = document.querySelector("#popup-close");

function openPopup(src, title) {
  // Bouw pad naar vorm Voornaam/Opdracht/bestand
  const parts = src.split("/");

  let formatted = src;
  // Correcte structuur volgens mapdiepte:
  // Nieuw (depth 4): web/Student/Project/bestandsnaam
  // Oud (depth 5): 4GT/Webontwikkeling/Student/Project/bestandsnaam
  if (parts.length === 4) {
    const first = parts[1]; // Student-map
    const second = parts[2]; // Opdracht-map
    const filename = parts[3]; // Bestandsnaam
    formatted = `${first}/${second}/${filename}`;
  } else if (parts.length >= 5) {
    const first = parts[2]; // Voornaam-map
    const second = parts[3]; // Opdracht-map
    const filename = parts[4]; // Bestandsnaam
    formatted = `${first}/${second}/${filename}`;
  }

  iframe.src = src;

  // Zet tekst + link
  const link = document.querySelector("#popup-link");
  link.textContent = formatted;
  link.href = src;

  overlay.setAttribute("data-visible", "true");
}

function closePopup() {
  overlay.setAttribute("data-visible", "false");
  iframe.src = "";
}

// Klik op links
document.addEventListener("click", function (event) {
  const link = event.target.closest(".popup-link");
  if (!link) return;

  event.preventDefault();
  const src = link.getAttribute("data-src");
  const title = link.textContent.trim();
  if (src) {
    openPopup(src, title);
  }
});

// Sluitknop
closeBtn.addEventListener("click", function () {
  closePopup();
});

// Sluiten met Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
  }
});

// Optioneel: klik naast de content sluit ook
overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    closePopup();
  }
});
