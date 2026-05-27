const pages = [
    { student: "Lore", path: "https://verhulst.kunstkaai.online/LoreV_fase2_webapp/index.php" },
    { student: "Roan", path: "https://smout.kunstkaai.online/final%20webapp/index.html" },
    { student: "Marlies", path: "https://morrens.kunstkaai.online/opdrachten/MarliesM_fase3_webapp/index.html" },
    { student: "Violeta", path: "https://markova.kunstkaai.online/VioletaM_fase4_Webapp/" },
    { student: "Konstantin", path: "https://kharlamov.kunstkaai.online/test.php" },
    { student: "Chadi", path: "https://bahamou.kunstkaai.online/minigame.html" },
    { student: "Ivanna", path: "https://pivtorak.kunstkaai.online/html/ep_webaap_ivannap/Wolf_and_eeg/" },
    { student: "Murat", path: "https://kocak.kunstkaai.online/labyrinth.html" },
    { student: "Illio", path: "https://vervoort.kunstkaai.online/schuifpuzzel.html" },
    { student: "Daria", path: "https://kashevarova.kunstkaai.online/webapp/" },
    { student: "Alexandre", path: "https://huet.kunstkaai.online/php/webappFstudents/" },
    { student: "Sam", path: "https://horemans.kunstkaai.online/puzzels/puzzels.php" },
    { student: "Hanne", path: "https://doms.kunstkaai.online/Web_app/" },
    { student: "Nyssa", path: "https://geelen.kunstkaai.online/webapp/index.php" },
    { student: "Axel", path: "https://ahermans.kunstkaai.online/Webapp/" },
    { student: "Simon", path: "https://colen.kunstkaai.online/Opdrachten/WebApp/" },
    { student: "Arjin", path: "" },
    { student: "Thibaut", path: "https://bruerst.kunstkaai.online/Webapp/" },
    { student: "Azra", path: "https://baturar.kunstkaai.online/AzraB_Fase4_Webapp/" },
    { student: "Sem", path: "" },
    { student: "Leonardo", path: "https://arnous.kunstkaai.online/LeonardoA_eindwerk/" }
];

const header = document.querySelector('header nav');
const iframe = document.querySelector('main iframe');

function loadPage(index) {
    const page = pages[index];
    if (page.path) {
        iframe.removeAttribute('srcdoc');
        iframe.src = page.path;
    } else {
        iframe.src = "about:blank";
        iframe.srcdoc = `
                    <!DOCTYPE html>
                    <html lang="nl">
                    <head>
                        <meta charset="UTF-8">
                        <title>Geen Link</title>
                        <style>
                            body {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                                font-family: system-ui, -apple-system, sans-serif;
                                background-color: #fafafa;
                                color: #666;
                                text-align: center;
                            }
                            .card {
                                border: 1px solid #ccc;
                                padding: 30px;
                                background: #ffffff;
                                max-width: 380px;
                            }
                            h1 {
                                font-size: 20px;
                                margin-top: 0;
                                margin-bottom: 10px;
                                color: #333;
                            }
                            p {
                                font-size: 14px;
                                margin: 0;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="card">
                            <h1>Geen link beschikbaar</h1>
                            <p>Er is momenteel geen webapp link beschikbaar voor <strong>${page.student}</strong>.</p>
                        </div>
                    </body>
                    </html>
                `;
    }

    // Update active state in navigation
    const links = header.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        if (i === index) links[i].classList.add('active');
        else links[i].classList.remove('active');
    }
}

// Add all links to the header
pages.forEach((page, index) => {
    const a = document.createElement('a');
    a.href = '#';
    if (!page.path) {
        a.className = 'no-link-badge';
    }
    a.textContent = page.student;
    a.addEventListener('click', (e) => {
        e.preventDefault();
        loadPage(index);
    });
    header.appendChild(a);
});

// Load the first page initially
if (pages.length > 0) {
    loadPage(0);
}