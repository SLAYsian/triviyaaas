"use strict";

// SECTION: DOM ELEMENTS
let questionEl = document.querySelector(".questioni");
let answerBtnsEl = document.querySelectorAll(".answers");
let gameScoreEl = document.querySelector(".game-score");
let modalEl = document.querySelector(".trivia-modal");
let correctOrIncorrectEl = document.querySelector(".correct-incorrect");
let correctAnswerEl = document.querySelector(".correct-answer");
let modalImg = document.querySelector(".modal-img");
let overlayEl = document.querySelector(".overlay");
let closeModalBtn = document.querySelector(".close-modal");

// SECTION: FETCH TRIVIA QUESTIONS

function fetchTriviaQuestions() {
  fetch(`https://opentdb.com/api.php?amount=10&difficulty=easy`).then(function (
    response // NOTES: Will use this one once code is written in index // fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`).then(function ( response)
  ) {
    if (response.ok) {
      response.json().then(function (data) {
        displayTriviaQuestions(data.results);
        console.log(data);
      });
    } else {
      errorMsg.textContent = `Error: ${response.status} ${response.statusText}`;
    }
  });
}

fetchTriviaQuestions();

// SECTION: FUNCTION Difficulty

// SECTION: FUNCTION Display Trivia Questions
// FIX: Special characters not displaying
let currentQuestionIndex = 0;
let questions = [];

function displayTriviaQuestions(triviaData) {
  questions = triviaData;
  displayQuestion();
}

function displayQuestion() {
  let question = questions[currentQuestionIndex];
  questionEl.textContent = question.question;

  let answers = [...question.incorrect_answers, question.correct_answer];

  answerBtnsEl.forEach((button, index) => {
    button.textContent = answers[index];
    button.dataset.correct = answers[index] === question.correct_answer;
  });
}

// SECTION: EVENT HANDLER BUTTON Correct Answer
answerBtnsEl.forEach((button) => {
  button.addEventListener("click", (e) => {
    let correctAnswer = e.target.dataset.correct === "true";
    handleAnswer(correctAnswer);
  });
});

// SECTION: CORRECT/ INCORRECT MODAL
function handleAnswer(correctAnswer) {
  let question = questions[currentQuestionIndex];
  let thisCorrectAnswer = question.correct_answer;
  if (correctAnswer) {
    correctOrIncorrectEl.textContent = "CORRECT!";
    modalImg.src = "";
    correctAnswerEl.textContent = "";
  } else {
    correctOrIncorrectEl.textContent = "INCORRECT!";
    correctAnswerEl.textContent = `Correct Answer: ${thisCorrectAnswer}`;
  }
  modalEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
}

// SECTION: ADD SCORE
function addScore() {}

// SECTION: DISPLAY NEXT QUESTION
function nextQuestion() {}

// SECTION: END OF QUIZ
function endQuiz() {}

// SECTION: SAVE NAME TO HIGH SCORE/ LOCAL STORAGE
function saveHighScore(name, score) {}
