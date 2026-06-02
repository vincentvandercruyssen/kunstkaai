const knop = document.getElementById("zoekknop");
const resultaat = document.getElementById("resultaat");

knop.addEventListener("click", () => {

    const gender = document.getElementById("gender").value;
    const country = document.getElementById("country").value;

    let url = "https://randomuser.me/api/?";

    if (gender) {
        url += `gender=${gender}&`;
    }

    if (country) {
        url += `nat=${country}&`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];

            resultaat.innerHTML = `
                <img src="${user.picture.large}">
                <h2>${user.name.first} ${user.name.last}</h2>
                <p>Gender: ${user.gender}</p>
                <p>Country: ${user.location.country}</p>
                <p>Age: ${user.dob.age}</p>
                <p>Birthday: ${user.dob.date}</p>
            `;
        });
});