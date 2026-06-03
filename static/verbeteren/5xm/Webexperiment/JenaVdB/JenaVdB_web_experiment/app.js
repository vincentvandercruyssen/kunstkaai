const creatures = [
  "images/Realistic_Goldfish_PNG_Clipart-445.png",
  "images/blobfish-removebg-preview.png",
  "images/shark-removebg-preview.png",
  "images/whale_shark-removebg-preview.png",
  "images/swordfish_PNG.png",
  "images/jellyfish-removebg-preview.png",
  "images/whale-removebg-preview.png",
  "images/lobster-removebg-preview.png"
];

const allCreatures = document.querySelectorAll(".creature");

allCreatures.forEach(creature => {

  // RANDOM DIRECTION
  if (Math.random() > 0.5) {
    creature.classList.add("left");
  } else {
    creature.classList.add("right");
  }

  // CLICK CHANGE
  creature.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * creatures.length);
    creature.src = creatures[randomIndex];

    // if it becomes jellyfish → add floating
    if (creature.src.includes("jellyfish-removebg-preview")) {
      creature.classList.add("jelly");
    } else {
      creature.classList.remove("jelly");
    }
  });

});