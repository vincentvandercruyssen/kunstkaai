

let age = 15;
let resultText = document.querySelector("#js-result");

if (age >= 16) {
  resultText.textContent = "Result: You are allowed to watch the movie.";
} else {
  resultText.textContent = "Result: You are not allowed to watch the movie.";
}
