
const tekst = document.querySelector('#demo-text');
const knop = document.querySelector('#change-btn');

knop.addEventListener('click', function () {
    tekst.textContent = 'De tekst is veranderd';
});

const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.style.color = 'white'); 
        this.style.color = 'yellow'; 
    });
});
