document.getElementById("searchBtn").addEventListener("click", searchCountry);
document.getElementById("searchInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") searchCountry();
});

async function searchCountry() {
    const input = document.getElementById("searchInput").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (input === "") {
        resultDiv.innerHTML = "<p>Vul een land in.</p>";
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(input)}?fullText=false`);

        if (!response.ok) {
            resultDiv.innerHTML = "<p>Land niet gevonden.</p>";
            return;
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            resultDiv.innerHTML = "<p>Geen resultaten gevonden.</p>";
            return;
        }

        data.forEach(country => {
            const name = country.name?.common || "Onbekend";
            const capital = Array.isArray(country.capital) ? country.capital[0] : "Geen hoofdstad";
            const region = country.region || "Onbekend";
            const population = country.population?.toLocaleString("nl-BE") || "Onbekend";
            const flag = country.flags?.svg || country.flags?.png || "";

            // Link naar hotels in de hoofdstad
            let hotelLinkText = "Geen hoofdstad bekend";
            let hotelLinkHtml = "";

            if (capital && capital !== "Geen hoofdstad") {
                const bookingLink = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(capital + " hotels")}`;
                hotelLinkText = `Hotels in ${capital}`;
                hotelLinkHtml = `<a href="${bookingLink}" target="_blank">${hotelLinkText}</a>`;
            } else {
                hotelLinkHtml = hotelLinkText;
            }

            const card = document.createElement("div");
            card.className = "country-card";

            card.innerHTML = `
                <div class="country-flag">
                    ${flag ? `<img src="${flag}" alt="Vlag van ${name}">` : ""}
                </div>
                <div class="country-info">
                    <h2>${name}</h2>
                    <p><strong>Hoofdstad:</strong> ${capital}</p>
                    <p><strong>Regio:</strong> ${region}</p>
                    <p><strong>Inwoners:</strong> ${population}</p>
                    <p><strong>Hotel link:</strong> ${hotelLinkHtml}</p>
                </div>
            `;

            resultDiv.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "<p>Er ging iets mis bij het ophalen van de gegevens.</p>";
    }
}

