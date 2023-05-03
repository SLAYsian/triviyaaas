"use strict";

// SECTION: SELECT DOM ELEMENTS
let highScoreContainer = document.querySelector(".main-container");

// SECTION: EVENT LISTENER LOAD HIGH SCORES
document.addEventListener("DOMContentLoaded", () => {
  displayHighScores();
});

// SECTION: FUNCTION DISPLAY HIGH SCORES
function displayHighScores() {
  // NOTES: Get highScores from local storage, check for parsing errors
  let highScores;
  try {
    highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  } catch (error) {
    console.log("Error parsing high scores from local storage:", error);
    highScores = [];
  }
  // NOTES: Check if values in container or score
  if (!highScoreContainer || !highScores) {
    return;
  }
  // NOTES: Create list element and append to main
  let highScoreList = document.createElement("ul");
  highScoreContainer.appendChild(highScoreList);
  // NOTES: create list item for each hs
  highScores.forEach((score) => {
    let hsListItem = document.createElement("li");
    hsListItem.textContent = `${score.name} (${score.difficulty}): ${score.score}`;
    highScoreList.appendChild(hsListItem);
  });
}
