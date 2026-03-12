
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('actionBtn');
  const status = document.getElementById('status');
  const img = document.getElementById('illustration');

  if (!btn || !status) return;

  let lampOn = false;

  function updateUI() {
    if (lampOn) {
      status.textContent = 'De lamp is aan 💡';
      btn.textContent = 'turn off light';
      document.body.classList.add('light-on');
      if (img) img.style.filter = 'brightness(1.05)';
    } else {
      status.textContent = 'De lamp is uit';
      btn.textContent = 'turn on light';
      document.body.classList.remove('light-on');
      if (img) img.style.filter = 'brightness(0.8)';
    }
  }

  btn.addEventListener('click', function () {
    lampOn = !lampOn;
    updateUI();
  });

  updateUI();
});