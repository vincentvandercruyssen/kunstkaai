const panels = document.querySelectorAll(".panel");
const slots = document.querySelectorAll(".slot");

const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector(".progress-text");

let draggedPanel = null;
let filledSlots = 0;

/* --------------------------
   DRAG START
-------------------------- */

panels.forEach(panel => {

  panel.addEventListener("dragstart", () => {

    draggedPanel = panel;

    setTimeout(() => {
      panel.style.opacity = "0.4";
    }, 0);

  });

  panel.addEventListener("dragend", () => {

    panel.style.opacity = "1";

  });

});

/* --------------------------
   SLOT EVENTS
-------------------------- */

slots.forEach(slot => {

  slot.addEventListener("dragover", event => {

    event.preventDefault();

  });

  slot.addEventListener("drop", event => {

    event.preventDefault();

    if (
      slot.dataset.filled === "false" &&
      draggedPanel
    ) {

      slot.dataset.filled = "true";

      slot.classList.add("active");

      /* MOVE PANEL INTO SLOT */

      slot.appendChild(draggedPanel);

      draggedPanel.style.width = "100%";
      draggedPanel.style.height = "100%";
      draggedPanel.style.borderRadius = "8px";
      draggedPanel.style.cursor = "default";

      draggedPanel.setAttribute(
        "draggable",
        "false"
      );

      filledSlots++;

      updateProgress();

    }

  });

});

/* --------------------------
   UPDATE PROGRESS BAR
-------------------------- */

function updateProgress() {

  const percent =
    (filledSlots / slots.length) * 100;

  progressFill.style.width = percent + "%";

  progressText.textContent =
    Math.floor(percent) + "%";

  /* FULLY RESTORED */

  if (percent >= 100) {

    document.body.classList.add(
      "world-restored"
    );

  }

}