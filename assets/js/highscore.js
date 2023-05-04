"use strict";

// SECTION: SELECT DOM ELEMENTS
let highScoreContainer = document.querySelector(".main-container");

// SECTION: EVENT LISTENER LOAD HIGH SCORES
document.addEventListener("DOMContentLoaded", () => {
  displayHighScores();
});

// SECTION: Get user's score from the trivia.js saveHighScores function
// NOTES: Tried to do last minute - if I can get it to work
// function getUserScore() {
//   let urlParams = new URLSearchParams(window.location.search);
//   return urlParams.get("score") || null;
// }
function getGameId() {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id") || null;
}

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
  // let userScore = getUserScore();
  let gameId = getGameId();
  // highScores.forEach((score) => {
  //   let hsListItem = document.createElement("li");
  //   hsListItem.textContent = `${score.name} (${score.difficulty}): ${score.score}`;
  highScores.forEach((score, index) => {
    let hsListItem = document.createElement("li");
    hsListItem.textContent = `${score.name} (${score.difficulty}): ${score.score}`;
    if (gameId && score.id == gameId) {
      hsListItem.style.backgroundColor = "lavender";
    }

    // if (userScore && score.score == userScore) {
    //   hsListItem.style.backgroundColor = "lavender";
    // }
    highScoreList.appendChild(hsListItem);
  });
}
