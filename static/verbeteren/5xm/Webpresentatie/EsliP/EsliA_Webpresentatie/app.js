let styleToggle = false;
const box = document.querySelector("#box");
const styleBtn = document.querySelector("#styleBtn");
const lightBtn = document.querySelector("#lightBtn");

styleBtn.addEventListener("click", boxToggleStyle);

function boxToggleStyle() {
  styleToggle = !styleToggle;
  if (styleToggle) {
    box.style.backgroundColor = "lightblue";
    box.style.color = "white";
    box.style.borderRadius = "10px";
    box.style.fontSize = "1.2rem";
  } else {
    box.style.backgroundColor = "rgb(170, 187, 193)";
    box.style.color = "black";
    box.style.borderRadius = "0";
    box.style.fontSize = "1rem";
  }
}

// Light/Dark mode toggle
lightBtn.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");

  // Save preference
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

// Check saved preference on page load
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.add("light-mode");
}
