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

function shuffleSections() {
    const main = document.querySelector("main");
    const sections = Array.from(main.querySelectorAll("section"));

    for (let i = sections.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sections[i], sections[j]] = [sections[j], sections[i]];
    }

    sections.forEach(section => main.appendChild(section));
}

document.addEventListener("DOMContentLoaded", () => {
    shuffleSections();
});