let kleuren = ["rood", "blauw", "groen"];

const arrayWeergave = document.querySelector("#arrayWeergave");
const input = document.querySelector("#nieuweKleur");
const knop = document.querySelector("#toevoegenKnop");


function updateArrayWeergave() {
  arrayWeergave.textContent = kleuren.join(", ");
}


knop.addEventListener("click", function() {
  const waarde = input.value.trim();
  if (waarde) {
    kleuren.push(waarde);
    input.value = "";
    updateArrayWeergave();
    console.log("Array:", kleuren);
  }
});


updateArrayWeergave();
