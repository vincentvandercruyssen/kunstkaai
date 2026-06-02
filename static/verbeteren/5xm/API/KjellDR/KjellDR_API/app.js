const zoekveld = document.getElementById("zoekveld")
const zoekknop = document.getElementById("zoekknop")
const resultaat = document.getElementById("resultaat")
const laadmeer = document.getElementById("laadmeer")
const randomknop = document.getElementById("randomknop")
const darkmode = document.getElementById("darkmode")
const sorteren = document.getElementById("sorteren")

let zoekterm = ""
let offset = 0
const limit = 10
let alleResultaten = []


zoekknop.addEventListener("click", startZoek)

zoekveld.addEventListener("keypress", function(e){
if(e.key==="Enter"){
startZoek()
}
})

laadmeer.addEventListener("click", laadMeer)

randomknop.addEventListener("click", randomArtikel)

darkmode.addEventListener("click", toggleDark)

sorteren.addEventListener("change", sorteerResultaten)



function startZoek(){

zoekterm = zoekveld.value

if(!zoekterm){
resultaat.innerHTML="<p>Typ eerst een zoekterm.</p>"
return
}

offset = 0
alleResultaten = []
resultaat.innerHTML=""

haalData()

}



function laadMeer(){

offset += limit
haalData()

}



async function haalData(){

resultaat.innerHTML += "<p id='loading'>Bezig met laden...</p>"

const veiligeTerm = encodeURIComponent(zoekterm)

const url = `https://nl.wikipedia.org/w/api.php?action=query&list=search&srsearch=${veiligeTerm}&srlimit=${limit}&sroffset=${offset}&format=json&origin=*`

try{

const response = await fetch(url)
const data = await response.json()

document.getElementById("loading").remove()

if(data.query.search.length === 0){
laadmeer.style.display="none"
return
}

const artikelen = await Promise.all(
data.query.search.map(async item => {

const imgUrl = await haalAfbeelding(item.title)

return {
title:item.title,
snippet:item.snippet,
image:imgUrl
}

})
)

alleResultaten = alleResultaten.concat(artikelen)

toonResultaten()

}
catch{

resultaat.innerHTML="<p>Er ging iets mis bij het ophalen.</p>"

}

}



async function haalAfbeelding(titel){

try{

const veiligeTitel = encodeURIComponent(titel)

const url = `https://nl.wikipedia.org/api/rest_v1/page/summary/${veiligeTitel}`

const response = await fetch(url)

const data = await response.json()

if(data.thumbnail){
return data.thumbnail.source
}

}
catch{}

return "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"

}



function toonResultaten(){

resultaat.innerHTML=""

alleResultaten.forEach(item=>{

const card=document.createElement("div")

card.classList.add("card")

card.innerHTML=`

<img src="${item.image}">

<h3>${item.title}</h3>

<p>${item.snippet}...</p>

<a href="https://nl.wikipedia.org/wiki/${encodeURIComponent(item.title)}" target="_blank">
Lees artikel
</a>

`

resultaat.appendChild(card)

})

}



function sorteerResultaten(){

if(sorteren.value==="az"){
alleResultaten.sort((a,b)=>a.title.localeCompare(b.title))
}

else if(sorteren.value==="za"){
alleResultaten.sort((a,b)=>b.title.localeCompare(a.title))
}

toonResultaten()

}



async function randomArtikel(){

resultaat.innerHTML="<p>Bezig met laden...</p>"
laadmeer.style.display="none"

try{

const response = await fetch("https://nl.wikipedia.org/api/rest_v1/page/random/summary")

const data = await response.json()

resultaat.innerHTML=`

<div class="card">

<img src="${data.thumbnail ? data.thumbnail.source : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}">

<h3>${data.title}</h3>

<p>${data.extract}</p>

<a href="${data.content_urls.desktop.page}" target="_blank">
Lees artikel
</a>

</div>

`

}
catch{

resultaat.innerHTML="<p>Er ging iets mis.</p>"

}

}



function toggleDark(){

document.body.classList.toggle("dark")

}