const API_KEY = 'AIzaSyCa-m-3_Km4B4ozfqq2_yJzG1t_BMncxWA';
const YT_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

const form = document.getElementById('searchForm');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    generateYouTubeLink();
});

async function generateYouTubeLink() {
    const query = document.getElementById('query').value.trim();
    const videoType = document.getElementById('videoType').value;
    const maxSubs = document.getElementById('maxSubs').value;

    if (!query) {
        resultsDiv.innerHTML = '<p class="error">Vul een zoekterm in alsjeblieft.</p>';
        return;
    }

    let searchQuery = 'minecraft ' + query;
    if (videoType) {
        searchQuery += ' ' + videoType;
    }

    if (maxSubs && parseInt(maxSubs, 10) < 100000) {
        searchQuery += ' small channel indie';
    }

    const fallbackEmbedUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(searchQuery)}`;
    const fallbackSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

    resultsDiv.innerHTML = `
        <div class="link-result">
            <h3>Laden (standaard fallback) …</h3>
            <iframe width="100%" height="480" src="${fallbackEmbedUrl}" allowfullscreen></iframe>
            <p>Als API niet beschikbaar is, worden directe YouTube-href’s hieronder geladen.</p>
        </div>
    `;

    const requestUrl = `${YT_SEARCH_URL}?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}`;

    try {
        const response = await fetch(requestUrl);

        if (!response.ok) {
            const apiText = await response.text();
            throw new Error(`API status ${response.status}: ${response.statusText}. ${apiText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.items) || data.items.length === 0) {
            throw new Error('Geen resultaten via API');
        }

        const videosHtml = data.items.map(item => {
            const videoId = item.id && item.id.videoId ? item.id.videoId : null;
            if (!videoId) return '';
            const title = item.snippet && item.snippet.title ? item.snippet.title : 'Onbekende titel';
            const channelTitle = item.snippet && item.snippet.channelTitle ? item.snippet.channelTitle : 'Onbekend kanaal';
            const thumbnail = item.snippet && item.snippet.thumbnails && item.snippet.thumbnails.medium ? item.snippet.thumbnails.medium.url : '';
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

            return `
                <li class="video-item" data-videoid="${videoId}">
                    <a href="${videoUrl}" target="_blank" rel="noreferrer noopener">
                        ${thumbnail ? `<img src="${thumbnail}" alt="${escapeHtml(title)}" />` : ''}
                        <div><strong>${escapeHtml(title)}</strong></div>
                        <div>${escapeHtml(channelTitle)}</div>
                    </a>
                </li>
            `;
        }).join('');

        const firstVideoId = data.items[0].id && data.items[0].id.videoId ? data.items[0].id.videoId : null;
        const apiEmbedUrl = firstVideoId ? `https://www.youtube.com/embed/${firstVideoId}` : fallbackEmbedUrl;

        resultsDiv.innerHTML = `
            <div class="api-result">
                <h3>Resultaten van de YouTube Data API</h3>
                <iframe id="mainEmbed" width="100%" height="480" src="${apiEmbedUrl}" allowfullscreen></iframe>
                <p>Klik een video onderaan om deze hier te laden als embedded video.</p>
                <ul class="result-list">${videosHtml}</ul>
                <p>API-key gebruikt: ${escapeHtml(API_KEY)}</p>
            </div>
        `;

        attachVideoItemClickHandlers();

    } catch (error) {
        console.error('YouTube API fallback triggered:', error);

        resultsDiv.innerHTML = `
            <div class="link-result">
                <h3>Directe zoekresultaten (fallback)</h3>
                <p>${escapeHtml(error.message)}</p>
                <p><a href="${fallbackSearchUrl}" target="_blank" rel="noreferrer noopener" class="youtube-link">Bekijk volledige YouTube-resultaten</a></p>
                <iframe width="100%" height="480" src="${fallbackEmbedUrl}" allowfullscreen></iframe>
            </div>
        `;
    }
}

function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function attachVideoItemClickHandlers() {
    const embeddedFrame = document.getElementById('mainEmbed');
    if (!embeddedFrame) return;

    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const videoId = this.getAttribute('data-videoid');
            if (!videoId) return;
            embeddedFrame.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
        });
    });
}

