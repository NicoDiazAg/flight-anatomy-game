const draggables = document.querySelectorAll(".draggable");
const dropZones = document.querySelectorAll(".drop-zone");
const correctDisplay = document.getElementById("correct");
const attemptsDisplay = document.getElementById("attempts");

let correct = 0;
let attempts = 0;

draggables.forEach((draggable) => {
  // When you start dragging an item
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  // When you let go of an item
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

dropZones.forEach((zone) => {
  // Allow dropping
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  // Handle the drop event
  zone.addEventListener("drop", (e) => {
    e.preventDefault();

    // Find the element currently being dragged
    const draggable = document.querySelector(".dragging");

    if (!draggable) return;

    attempts++;
    attemptsDisplay.innerText = attempts;

    // Get the "tag" from the zone and the item
    const zoneType = zone.getAttribute("data-target");
    const itemType = draggable.getAttribute("data-match");

    if (zoneType === itemType) {
      handleCorrect(zone, draggable);
    } else {
      handleIncorrect(zone);
    }
  });
});

function handleCorrect(zone, draggable) {
  if (zone.classList.contains("correct")) return;
  zone.classList.add("correct");
  zone.style.border = "none";
  zone.style.background = "none";

  // Move the blue label button inside the drop zone
  zone.appendChild(draggable);

  // Lock the button so it can't be dragged again
  draggable.style.cursor = "default";
  draggable.setAttribute("draggable", "false");

  // Update correct
  correct += 1;
  correctDisplay.innerText = correct;

  if (correct === 14) {
    setTimeout(() => alert("You won! You know your bones!"), 500);
  }
}

function handleIncorrect(zone) {
  zone.classList.add("incorrect");
  setTimeout(() => {
    zone.classList.remove("incorrect");
  }, 500);
}

const restartBtn = document.getElementById("restart-btn");
const optionsContainer = document.querySelector(".options-container");

restartBtn.addEventListener("click", () => {
  correct = 0;
  attempts = 0;
  correctDisplay.innerText = correct;
  attemptsDisplay.innerText = attempts;

  // Reset all drop zones
  dropZones.forEach((zone) => {
    zone.classList.remove("correct");
    zone.classList.remove("incorrect");

    // Reset inline styles added by handleCorrect()
    zone.style.border = "";
    zone.style.background = "";
    zone.style.borderRadius = "";

    // Move draggables back to start
    const item = zone.querySelector(".draggable");
    if (item) {
      item.setAttribute("draggable", "true");
      item.style.cursor = "grab";

      optionsContainer.appendChild(item);
    }
  });
  console.log("Game has been reset.");
});
