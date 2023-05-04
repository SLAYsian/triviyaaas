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
let questionTitleEl = document.querySelector(".question-title");

// SECTION: DIFFICULTY & USERNAME
// TODO: Check variables with homepage
let difficulty = localStorage.getItem("difficulty") || "easy";
let userName = localStorage.getItem("userName") || "";

let currentQuestionIndex = 0;
let questions = [];
let currentScore = 0;
gameScoreEl.textContent = `SCORE: ${currentScore}`;

// SECTION: FETCH TRIVIA QUESTIONS

// NOTES: Will use this one once code is written in index //

function fetchTriviaQuestions(difficulty) {
  fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`).then(
    function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayTriviaQuestions(data.results);
          // console.log(data);
        });
      } else {
        errorMsg.textContent = `Error: ${response.status} ${response.statusText}`;
      }
    }
  );
}

// SECTION: FUNCTION Display Trivia Questions
fetchTriviaQuestions(difficulty);
// NOTES: Display Special Characters
function displaySpecChar(text) {
  let specCharEl = document.createElement("textarea");
  specCharEl.innerHTML = text;
  return specCharEl.value;
}

function displayTriviaQuestions(triviaData) {
  questions = triviaData;
  displayQuestion();
}

function displayQuestion() {
  let question = questions[currentQuestionIndex];
  // questionEl.textContent = question.question;
  questionEl.textContent = displaySpecChar(question.question);
  // NOTES: Create a new array combining correct and incorrect answers
  let answers = [...question.incorrect_answers, question.correct_answer];
  answers = shuffleAnswers(answers);

  answerBtnsEl.forEach((button, index) => {
    button.textContent = displaySpecChar(answers[index]);

    button.dataset.correct =
      answers[index] === displaySpecChar(question.correct_answer);
    // NOTES: Account for Boolean
    if (
      question.type === "boolean" &&
      (button.classList.contains("answer-2") ||
        button.classList.contains("answer-3"))
    ) {
      button.classList.add("hidden");
    } else {
      button.classList.remove("hidden");
    }
  });
}

// SECTION: FUNCTION Randomize answers
function shuffleAnswers(answers) {
  let answerIndex = answers.length,
    randomIndex;
  // NOTES: While there are answers left
  while (answerIndex !== 0) {
    // NOTES: picks a random position
    randomIndex = Math.floor(Math.random() * answerIndex);
    answerIndex--;
    // NOTES: Swaps current answer position with the random position
    [answers[answerIndex], answers[randomIndex]] = [
      answers[randomIndex],
      answers[answerIndex],
    ];
  }
  return answers;
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

    modalImg.src = "./assets/images/level-up.svg";
    correctAnswerEl.textContent = "";
    let points = calcPoints(difficulty);
    currentScore += points;
    gameScoreEl.textContent = `SCORE: ${currentScore}`;
  } else {
    correctOrIncorrectEl.textContent = "INCORRECT!";
    correctAnswerEl.textContent = `Correct Answer: ${displaySpecChar(
      thisCorrectAnswer
    )}`;

    modalImg.src = "./assets/images/dead.svg";
  }
  modalEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => {
  modalEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
  nextQuestion();
});

// SECTION: ADD SCORE
function calcPoints(difficulty) {
  // NOTES: Sets score based on difficulty
  if (difficulty === "easy") {
    return 5;
  } else if (difficulty === "medium") {
    return 10;
  } else if (difficulty === "hard") {
    return 15;
  } else {
    return 0;
  }
}

// SECTION: DISPLAY NEXT QUESTION
function nextQuestion() {
  // NOTES: Increments question index by 1
  currentQuestionIndex++;
  // NOTES: checks if index falls within questions length
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    // NOTES: Replace with endQuiz function
    endQuiz();
  }
}

// SECTION: END OF QUIZ
// TODO: variables
function endQuiz() {
  // NOTES: Get high scores from local storage or start a new array
  // let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  // NOTES: Check for parsing errors
  let highScores;
  try {
    highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  } catch (error) {
    console.error("Error parsing high scores from local storage:", error);
    highScores = [];
  }
  // NOTES: Lowest high score
  let lowestHighScore =
    highScores.length < 10 ? 0 : highScores[highScores.length - 1].score;
  // NOTES: Check if score is a new high score and display message
  let isNewHighScore = currentScore >= lowestHighScore;
  // NOTES: Sets text to header depending on if high score
  questionTitleEl.innerHTML = isNewHighScore
    ? `HIGH SCORE: <br>${userName}  -  ${currentScore}`
    : `SCORE: <br>${userName}  -  ${currentScore}`;
  questionEl.textContent = isNewHighScore
    ? `Congrats! You've achieved a new high score!`
    : `You did not get a new high score. Try again!`;
  // NOTES: Set buttons
  answerBtnsEl[0].textContent = isNewHighScore
    ? `Save High Score`
    : `View High Scores`;
  answerBtnsEl[1].textContent = `Back to Homepage`;
  answerBtnsEl[2].classList.add("hidden");
  answerBtnsEl[3].classList.add("hidden");
  // NOTES: Button Event Listeners
  answerBtnsEl[0].addEventListener(
    "click",
    isNewHighScore ? () => saveHighScore(difficulty) : redirectToHighScores
  );
  answerBtnsEl[1].addEventListener("click", redirectToHomepage);
}
// SECTION: Redirect to Homepage or Highscores
function redirectToHomepage() {
  window.location.href = "index.html";
}
function redirectToHighScores() {
  window.location.href = "highscore.html";
}

// SECTION: SAVE NAME TO HIGH SCORE/ LOCAL STORAGE
function saveHighScore(difficulty) {
  // let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  //NOTES: Check for parsing errors
  let highScores;
  try {
    highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  } catch (error) {
    console.log("Error parsing high scores from local storage:", error);
    highScores = [];
  }
  // NOTES: Create a unique ID for game
  let gameId = Date.now();
  // NOTES: Push current score to array
  highScores.push({
    name: userName,
    score: currentScore,
    difficulty: difficulty,
    id: gameId,
  });
  // NOTES: Sort by score
  highScores.sort((a, b) => b.score - a.score);
  // NOTES: Slice to show only the top 10
  highScores = highScores.slice(0, 10);
  // NOTES: Save to local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
  // NOTES: Redirect to High Scores page
  // window.location.href = "highscore.html";
  // window.location.href = `highscore.html?score=${currentScore}`;
  window.location.href = `highscore.html?score=${currentScore}&name=${userName}&id=${gameId}`;
}
