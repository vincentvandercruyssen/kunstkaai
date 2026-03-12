function berekenSom(a, b) {
  const resultaat = a + b;
  return resultaat;
}

const input1 = document.querySelector("#getal1");
const input2 = document.querySelector("#getal2");
const knop = document.querySelector("#bereken-knop");
const uitkomstTekst = document.querySelector("#uitkomst-tekst");

knop.addEventListener("click", function () {
  const waarde1 = Number(input1.value);
  const waarde2 = Number(input2.value);
  const som = berekenSom(waarde1, waarde2);
  uitkomstTekst.textContent = "De som is: " + som;
});



// DIT IS VOOR DE HAMBURGER MENU
        const menuToggle = document.querySelector('.menu-toggle');
        const navList = document.querySelector('.navbar ul');
        menuToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    });
            navList.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                navList.classList.remove('open');
            });
        });