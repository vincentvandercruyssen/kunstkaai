document.addEventListener("DOMContentLoaded", () => {
  const message = document.querySelector("#message");
  const button = document.querySelector("#changeBtn");

  if (!message || !button) {
    console.log("Element niet gevonden. Kloppen je id's in HTML?");
    return;
  }

  button.addEventListener("click", () => {
    message.textContent = "Yes, het werkt nu!";
  });
});


