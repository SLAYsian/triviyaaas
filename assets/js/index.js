"use strict";
// SECTION: SELECT DOM ELEMENTS

let nameEl = document.querySelector("#name-form");
let nameField = document.querySelector("#name-input");
let description = document.querySelector("#description");
let easyBtn = document.getElementById("easy-btn");
let mediumBtn = document.getElementById("medium-btn");
let hardBtn = document.getElementById("hard-btn");

easyBtn.addEventListener("click", () => {
  initTrivia("easy");
});
mediumBtn.addEventListener("click", () => {
  initTrivia("medium");
});
hardBtn.addEventListener("click", () => {
  initTrivia("hard");
});

function submitHandler(e) {
  e.preventDefault();
  if (nameField.value === "") {
    description.textContent = "Please enter your name!";
    return;
  }
  localStorage.setItem("userName", userName);
}
function initTrivia(difficulty) {
  let userName = nameField.value;
  localStorage.setItem("userName", userName);
  localStorage.setItem("difficulty", difficulty);
  window.location.replace("trivia.html");
}
nameEl.addEventListener("submit", submitHandler);
