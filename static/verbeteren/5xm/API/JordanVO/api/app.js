const zoekKnop = document.getElementById("zoekknop");
const zoekveld = document.getElementById("zoekveld");
const resultaat = document.getElementById("resultaat");

zoekKnop.addEventListener("click", zoekSpeler);
zoekveld.addEventListener("keypress", (e) => {
  if (e.key === "Enter") zoekSpeler();
});


async function getTeamBadge(teamName) {
  if (!teamName) return '';
  try {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(teamName)}`);
    const data = await response.json();
    if (data.teams && data.teams.length > 0) {
      return data.teams[0].strTeamBadge || '';
    }
  } catch (e) {
    console.error("Badge fetch failed:", e);
  }
  return '';
}

async function zoekSpeler() {
  const zoekterm = zoekveld.value.trim();
  if (!zoekterm) {
    toonMelding("Typ eerst een naam!");
    return;
  }

  toonMelding("Bezig met laden...");

  try {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(zoekterm)}`);
    const data = await response.json();

    if (!data.player) {
      toonMelding("Geen resultaten gevonden.");
      return;
    }

    verwerkSpelers(data.player);

  } catch (error) {
    console.error(error);
    toonMelding("Er ging iets mis.");
  }
}

function verwerkSpelers(players) {
  const voetballers = players.filter(p => p.strSport === "Soccer");
  if (voetballers.length === 0) {
    toonMelding("Geen voetballers gevonden.");
    return;
  }
  toonResultaten(voetballers);
}

async function toonResultaten(players) {
  resultaat.innerHTML = "";

  for (const player of players.slice(0, 5)) {
    const card = document.createElement("div");
    card.classList.add("card");

    const geboortedatum = player.dateBorn ? new Date(player.dateBorn) : null;
    const leeftijd = geboortedatum ? Math.floor((new Date() - geboortedatum)/ (1000*60*60*24*365)) : "Onbekend";

    
    const badgeUrl = await getTeamBadge(player.strTeam);
    const badgeHtml = badgeUrl ? `<img src="${badgeUrl}" alt="${player.strTeam} badge">` : '';

    card.innerHTML = `
      <h2>${player.strPlayer}</h2>
      <img src="${player.strThumb || ''}" alt="${player.strPlayer}">
      <p><strong>Leeftijd:</strong> ${leeftijd}</p>
      <p><strong>Nationaliteit:</strong> ${player.strNationality}</p>
      <div class="team-info">
        ${badgeHtml}
        <span><strong>Team:</strong> ${player.strTeam || "Onbekend"}</span>
      </div>
      <p><strong>Positie:</strong> ${player.strPosition || "Onbekend"}</p>
    `;

    card.addEventListener("click", () => openModal(player));
    resultaat.appendChild(card);
  }
}

function toonMelding(text) {
  resultaat.innerHTML = `<p>${text}</p>`;
}

async function openModal(player) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const geboortedatum = player.dateBorn ? new Date(player.dateBorn) : null;
  const leeftijd = geboortedatum ? Math.floor((new Date() - geboortedatum)/ (1000*60*60*24*365)) : "Onbekend";

  const badgeUrl = await getTeamBadge(player.strTeam);
  const badgeHtml = badgeUrl ? `<img src="${badgeUrl}" alt="${player.strTeam} badge">` : '';

  overlay.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>${player.strPlayer}</h2>
      <img src="${player.strThumb || ''}" alt="${player.strPlayer}">
      <p><strong>Leeftijd:</strong> ${leeftijd}</p>
      <p><strong>Nationaliteit:</strong> ${player.strNationality}</p>
      <div class="team-info">
        ${badgeHtml}
        <span><strong>Team:</strong> ${player.strTeam || "Onbekend"}</span>
      </div>
      <p><strong>Positie:</strong> ${player.strPosition || "Onbekend"}</p>
    </div>
  `;

  overlay.querySelector(".close-btn").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => { if(e.target === overlay) overlay.remove(); });

  document.body.appendChild(overlay);
}