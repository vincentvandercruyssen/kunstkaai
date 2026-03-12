let aantalKliks = 0;

const knop = document.querySelector("#klikKnop");
const tekst = document.querySelector("#resultaat");

knop.addEventListener("click", function () {
  aantalKliks = aantalKliks + 1;
  tekst.textContent = "Aantal kliks: " + aantalKliks;
});
