const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

const popup = document.getElementById("popup");
const popupDetails = document.getElementById("popupDetails");
const closePopup = document.getElementById("closePopup");

let currentBooks = [];
let currentIndex = 0;
const booksPerLoad = 6;

searchBtn.addEventListener("click", searchBooks);

searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") searchBooks();
});

closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
});

window.addEventListener("load", loadDefaultBooks);

async function searchBooks() {
    const query = searchInput.value;

    if (!query) {
        results.innerHTML = "<p>Please enter something.</p>";
        return;
    }

    const safeQuery = encodeURIComponent(query);
    const url = `https://openlibrary.org/search.json?q=${safeQuery}&language=eng`;

    results.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(url);
        const data = await res.json();

        currentBooks = filterEnglishBooks(data.docs);
        currentIndex = 0;

        showMoreBooks(true);

    } catch {
        results.innerHTML = "<p>Error loading data.</p>";
    }
}

async function loadDefaultBooks() {
    results.innerHTML = "<p>Loading books...</p>";

    try {
        const res = await fetch("https://openlibrary.org/search.json?q=popular&language=eng");
        const data = await res.json();

        currentBooks = filterEnglishBooks(data.docs);
        currentIndex = 0;

        showMoreBooks(true);

    } catch {
        results.innerHTML = "<p>Could not load books.</p>";
    }
}

function filterEnglishBooks(books) {
    const regex = /^[A-Za-z0-9\s.,'":!?()-]+$/;

    return books.filter(book => {
        const title = book.title || "";
        const author = book.author_name ? book.author_name[0] : "";
        return regex.test(title) && regex.test(author);
    });
}

function showMoreBooks(reset = false) {
    if (reset) results.innerHTML = "";

    const next = currentBooks.slice(currentIndex, currentIndex + 6);
    currentIndex += 6;

    next.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = book.title || "No title";
        const author = book.author_name ? book.author_name[0] : "Unknown";
        const year = book.first_publish_year || "Unknown";

        const subjects = book.subject
            ? book.subject.slice(0, 2).join(", ")
            : "No category";

        let image = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "";

        card.innerHTML = `
            <h3>${title}</h3>
            <p>${author}</p>
            <p>${subjects}</p>
            ${image ? `<img src="${image}">` : ""}
        `;

        card.addEventListener("click", () => showDetails(book));

        results.appendChild(card);
    });

    addLoadMoreButton();
}

function addLoadMoreButton() {
    const old = document.getElementById("loadMoreBtn");
    if (old) old.remove();

    if (currentIndex >= currentBooks.length) return;

    const btn = document.createElement("button");
    btn.id = "loadMoreBtn";
    btn.textContent = "Load More";

    btn.addEventListener("click", () => showMoreBooks());

    results.appendChild(btn);
}

function showDetails(book) {
    const title = book.title || "No title";
    const author = book.author_name ? book.author_name[0] : "Unknown";
    const year = book.first_publish_year || "Unknown";

    const subjects = book.subject
        ? book.subject.slice(0, 5).join(", ")
        : "No category";

    let description = "No description available.";
    if (book.first_sentence) {
        description = typeof book.first_sentence === "string"
            ? book.first_sentence
            : book.first_sentence[0];
    }

    popupDetails.innerHTML = `
        <h2>${title}</h2>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Year:</strong> ${year}</p>
        <p><strong>Categories:</strong> ${subjects}</p>
        <p>${description}</p>
    `;

    popup.classList.remove("hidden");
}