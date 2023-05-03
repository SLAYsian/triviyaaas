let nameEl = document.querySelector("#name-form");
let nameField = document.querySelector("#name-input");
let description = document.querySelector("#description");

function submitHandler(e){
    e.preventDefault();
    if(nameField.value === ""){
        description.textContent = "you didnt put in a name";
        return;
    }
    localStorage.setItem("current-user", nameField.value);
    window.location.replace("trivia.html")
}
nameEl.addEventListener("submit", submitHandler);

