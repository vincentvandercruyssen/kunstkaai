
const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[i].classList.add('active');
}

document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
});

document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
});
const tekst = document.querySelector("#tekst");
const veranderBtn = document.querySelector("#verander");
const resetBtn = document.querySelector("#reset");

if (veranderBtn) {
    veranderBtn.addEventListener("click", () => {
        tekst.textContent = "De tekst is aangepast met textContent!";
    });
}

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        tekst.textContent = "Dit is de originele tekst.";
    });
}

showSlide(index);
