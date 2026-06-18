let clicks = 0;
let clickPower = 1;

let ageIndex = 0;

let moneySaved = 0;
let wasteSaved = 0;

let happiness = 100;

const ages = [
2,
4,
6,
8,
10,
12
];

const emojis = [
"👶",
"🧒",
"👦",
"👦",
"🧑",
"🧑"
];

const clickTargets = [
20,
50,
100,
180,
300
];

const child =
document.getElementById("child");

document
.getElementById("clickBtn")
.addEventListener("click", growClick);

child.addEventListener(
"click",
growClick
);

function growClick(){

clicks += clickPower;

updateUI();

if(
ageIndex <
clickTargets.length &&
clicks >=
clickTargets[ageIndex]
){

document
.getElementById("choiceBox")
.classList
.remove("hidden");

}

randomEvent();

}

function chooseGrowMee(){

moneySaved += 35;
wasteSaved += 1;
happiness += 10;

nextAge();

}

function chooseNormal(){

happiness -= 10;

nextAge();

}

function nextAge(){

ageIndex++;

document
.getElementById("choiceBox")
.classList
.add("hidden");

updateUI();

checkMissions();

if(ageIndex >= ages.length-1){

setTimeout(()=>{

alert(
"🎉 Je hebt het einde bereikt!\n\n" +
"Bespaard: €" +
moneySaved +
"\nAfval voorkomen: " +
wasteSaved
);

},300);

}

}

function buyBooster(){

if(clicks >= 50){

clicks -= 50;

clickPower++;

updateUI();

}

}

function randomEvent(){

let chance =
Math.random();

if(chance < 0.01){

alert(
"🚀 Groeispurt!\n+20 kliks"
);

clicks += 20;

updateUI();

}

}

function checkMissions(){

if(ages[ageIndex] >= 6){

document
.getElementById("m1")
.classList
.add("done");

}

if(moneySaved >= 100){

document
.getElementById("m2")
.classList
.add("done");

}

if(wasteSaved >= 5){

document
.getElementById("m3")
.classList
.add("done");

}

}

function updateUI(){

document
.getElementById("clicks")
.textContent =
clicks;

document
.getElementById("money")
.textContent =
moneySaved;

document
.getElementById("waste")
.textContent =
wasteSaved;

document
.getElementById("happy")
.textContent =
happiness;

document
.getElementById("power")
.textContent =
clickPower;

document
.getElementById("age")
.textContent =
ages[ageIndex] +
" jaar";

child.textContent =
emojis[ageIndex];

}

updateUI();