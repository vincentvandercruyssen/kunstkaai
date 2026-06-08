const fotos = document.querySelectorAll(".gallerij img");
fotos.forEach(function(foto) {
foto.addEventListener("click", function(){
vergrootAfbeelding(foto);
});
});

function vergrootAfbeelding(element) {
    const overlay = document.getElementById('imageOverlay');
    const vergroteAfbeelding = document.getElementById('vergroteAfbeelding');
    vergroteAfbeelding.src = element.src;
    overlay.classList.add('active');
}

function sluitAfbeelding() {
    const overlay = document.getElementById('imageOverlay');
    overlay.classList.remove('active');
}