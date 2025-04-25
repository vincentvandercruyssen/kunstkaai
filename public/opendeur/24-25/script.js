function laadPresentaties(dataArray) {
    const main = document.getElementById("content");

    dataArray.forEach(({ titel, leerling, pad }) => {
        const section = document.createElement("section");
        section.innerHTML = `
    <h4>${titel} (${leerling})</h4>
    <div class="iframe-wrapper">
        <iframe src="${leerling}/${titel}${pad}"></iframe>
        <button class="fullscreen-btn" onclick="openFullscreen(this)">
            <img src="../img/plus_5.svg" />
        </button>
    </div>
    `;
        main.appendChild(section);
    });

    shuffleSections();
}

function shuffleSections() {
    const main = document.getElementById("content");
    const sections = Array.from(main.querySelectorAll("section"));

    for (let i = sections.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sections[i], sections[j]] = [sections[j], sections[i]];
    }

    // Herplaatsen in DOM
    sections.forEach(section => main.appendChild(section));
}

function openFullscreen(button) {
    const iframe = button.previousElementSibling;
    const section = button.closest('section');
    const title = section.querySelector('h4').textContent;

    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenIframe = document.getElementById('fullscreen-iframe');
    const fullscreenTitle = document.getElementById('fullscreen-title');

    fullscreenIframe.src = iframe.src;
    fullscreenTitle.textContent = title;
    overlay.style.display = 'flex';
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenIframe = document.getElementById('fullscreen-iframe');

    fullscreenIframe.src = '';
    overlay.style.display = 'none';
}

window.addEventListener("DOMContentLoaded", () => {
    laadPresentaties(presentaties);
});