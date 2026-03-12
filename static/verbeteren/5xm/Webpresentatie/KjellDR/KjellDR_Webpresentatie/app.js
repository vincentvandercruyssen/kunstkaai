// Elementen 
const klikKnop = document.querySelector("#klikKnop");
const resetKnop = document.querySelector("#resetKnop");
const tekst = document.querySelector("#tekst");
const coords = document.querySelector("#coords");

// SLIDES
const slides = document.querySelectorAll("section");
const volgendeBtn = document.querySelector("#volgende");
const vorigeBtn = document.querySelector("#vorige");

let huidigeSlide = 0;
slides[huidigeSlide].classList.add("active");

function toonSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
}

// SLIDE EVENTS
volgendeBtn.addEventListener("click", () => {
  if (huidigeSlide < slides.length - 1) {
    huidigeSlide++;
    toonSlide(huidigeSlide);
  }
});

vorigeBtn.addEventListener("click", () => {
  if (huidigeSlide > 0) {
    huidigeSlide--;
    toonSlide(huidigeSlide);
  }
});

// KNOP EVENTS
klikKnop.addEventListener("click", () => tekst.textContent = "Je hebt op de knop geklikt!");
resetKnop.addEventListener("click", () => tekst.textContent = "Deze tekst zal veranderen.");

// MUIS EVENTS
document.addEventListener("mousemove", (e) => {
  coords.textContent = `X: ${e.clientX} | Y: ${e.clientY}`;
});
