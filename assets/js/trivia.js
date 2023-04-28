"use strict";

// SECTION: DOM ELEMENTS

// SECTION: FETCH TRIVIA QUESTIONS

function fetchTriviaQuestions() {
  fetch(`https://opentdb.com/api.php?amount=10&difficulty=easy`).then(function (
    response
  ) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    } else {
      errorMsg.textContent = `Error: ${response.status} ${response.statusText}`;
    }
  });
}

fetchTriviaQuestions();

// SECTION: FUNCTION Display Trivia Questions

// SECTION: EVENT HANDLER BUTTON

// SECTION: CORRECT/ INCORRECT MODAL

// SECTION: ADD SCORE

// SECTION: END OF QUIZ

// SECTION: SAVE NAME TO HIGH SCORE/ LOCAL STORAGE
