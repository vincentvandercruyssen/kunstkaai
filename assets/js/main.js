// Zoek naar alle divs met de klasse 'table_layoutfixed'
const fixedLayoutDivs = document.querySelectorAll('.table_layoutfixed');

fixedLayoutDivs.forEach(div => {
    // Zoek de eerstvolgende table na de huidige 'table_layoutfixed'-div
    let nextTable = div.nextElementSibling;
    while (nextTable && nextTable.tagName !== 'TABLE') {
        nextTable = nextTable.nextElementSibling;
    }

    // Als we een table gevonden hebben, pas de CSS-stijl toe
    if (nextTable) {
        nextTable.style.tableLayout = 'fixed';
    }
});

// Bestaande code voor centertext functie
const centerTextDivs = document.querySelectorAll('.table_centertext');

centerTextDivs.forEach(div => {
    // Zoek de eerstvolgende table na de huidige 'table_centertext'-div
    let nextTable = div.nextElementSibling;
    while (nextTable && nextTable.tagName !== 'TABLE') {
        nextTable = nextTable.nextElementSibling;
    }

    // Als we een table gevonden hebben, pas de CSS-stijl toe op alle td's
    if (nextTable) {
        const tds = nextTable.querySelectorAll('td');
        tds.forEach(td => {
            td.style.textAlign = 'center';
        });
    }
});
