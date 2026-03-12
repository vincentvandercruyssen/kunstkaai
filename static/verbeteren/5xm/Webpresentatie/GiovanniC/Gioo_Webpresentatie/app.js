// SLIDES
const slides = document.querySelectorAll(".slide");
const counter = document.querySelector("#counter");
let current = 0;

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
  counter.textContent = `${index + 1} / ${slides.length}`;
}

// Buttons
document.querySelector("#next").addEventListener("click", nextSlide);
document.querySelector("#prev").addEventListener("click", prevSlide);

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === " ") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});


document.querySelector("#demoBtn").addEventListener("click", () => {
  document.querySelector("#demoBox").style.backgroundColor = "red";
  document.querySelector("#demoBox").classList.toggle("highlight");
 
});

document.querySelector("#themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");
});
