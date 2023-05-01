"use strict";

// SECTION: DOM ELEMENTS
let questionEl = document.querySelector(".questioni");
let answerBtnsEl = document.querySelectorAll(".answer");
let gameScoreEl = document.querySelector(".game-score");
let modalEl = document.querySelector(".trivia-modal");
let correctOrIncorrectEl = document.querySelector(".correct-incorrect");
let modalImg = document.querySelector(".modal-img");
let coseModalBtn = document.querySelector(".close-modal");

// SECTION: FETCH TRIVIA QUESTIONS

function fetchTriviaQuestions() {
  fetch(`https://opentdb.com/api.php?amount=10&difficulty=easy`).then(function (
    response
  ) // NOTES: Will use this one once code is written in index // fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`).then(function ( response)

  {
    if (response.ok) {
      response.json().then(function (data) {
        // NOTES: Will use once written -> function displayTriviaQuestions
        console.log(data);
      });
    } else {
      errorMsg.textContent = `Error: ${response.status} ${response.statusText}`;
    }
  });
}

fetchTriviaQuestions();

// SECTION: FUNCTION Display Trivia Questions
let currentQuestionIndex = 0;
let questions = [];

function displayTriviaQuestions(quizData) {}
function displayQuestion() {}

// SECTION: EVENT HANDLER BUTTON

// SECTION: CORRECT/ INCORRECT MODAL

// SECTION: ADD SCORE

// SECTION: END OF QUIZ

// SECTION: SAVE NAME TO HIGH SCORE/ LOCAL STORAGE
