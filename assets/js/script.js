// Query Selectors.
const startPage = document.querySelector("#start-page");
const quiz = document.querySelector("#quiz");
const ansResultMsg = document.querySelector("#ans-result-msg");
const initials = document.querySelector("#initials");
const question = document.querySelector("#qH2");
const startBtn = document.querySelector("#startBtn");
const initialInput = document.querySelector("#initial-input");
const timeEl = document.querySelector("#time");
const highscoreSection = document.querySelector("#highscore-section");
const highScoreLi = document.querySelector("#highscore-li")

// create element.
const highscoreOl = document.createElement("ol");

// Variables.
let qIdx = 0;
let score = 0;
let secondsLeft = 100;
let timerInterval = 0;

// Constants.
const ansLen = questions[qIdx].answers.length;
const sectionToDisplay = [startPage, quiz, ansResultMsg, initials, highscoreSection];

fillQnA(qIdx);

// Starts the quiz when the start quiz button is pressed.
function startQuiz() {
    renderHighScores()
    fillQnA(qIdx);
    startPage.dataset.visible = "false";
    quiz.dataset.visible = "true";
    startBtn.addEventListener("click", toDisplay());
    timer();
}

// Function to fill the questions to the question text contents.
function fillQnA(qIdx) {
    toDisplay();
    question.textContent = questions[qIdx].question;
    for (i = 0; i < ansLen; i++) {
        document.getElementById(i + 1).textContent = questions[qIdx].answers[i];
    }
}

// Function to check if the answers are correct or wrong.
function checkAns(clicked_id) {
    document.getElementById("ans-result-msg").style.opacity = "100"
    ansResultMsg.dataset.visible = "false";
    const qLen = questions.length;
    if (qIdx < qLen) {
        // Validating the answers. 
        if (clicked_id == questions[qIdx].answer) {
            ansResultMsg.setAttribute("class", "ans-right");
            ansResultMsg.textContent = "The answer is CORRECT";
            score = score + 10;
        }
        else {
            ansResultMsg.setAttribute("class", "ans-wrong");
            ansResultMsg.textContent = "The answer is WRONG";
            secondsLeft = secondsLeft - 20;
        }
        ansResultMsg.dataset.visible = "true";
        setTimeout(fadeoutMsg, 500);
        // increment the questions index.
        qIdx++;
        if (qIdx != qLen) {
            fillQnA(qIdx);
        }

        if (qIdx == qLen) {
            clearInterval(timerInterval);
            // Hide answers section and show initials section.            
            quiz.dataset.visible = "false";
            initials.dataset.visible = "true";
            toDisplay();
        }
    }
}

// Function for countdown game timer.
function timer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.setAttribute("id", "time-yellow")
        timeEl.innerHTML = "You have<strong>" + secondsLeft + "</strong>seconds left";
        if (qIdx === (questions.length)) {
            clearInterval(timerInterval);
        }
        if (secondsLeft === 0 || secondsLeft < 0) {
            // Stops execution of action at set interval.
            clearInterval(timerInterval);
            // Hide answers section and show initials section.            
            quiz.dataset.visible = "false";
            initials.dataset.visible = "true";
            toDisplay();
        }

        if (secondsLeft <= 10) {
            timeEl.setAttribute("id", "time-red");
        }
    }, 1000);
}

// Function to save the highscores to localstorage. The highscores are sorted descending.
function saveHighScores() {
    // Check if initials user input is empty.
    if (initialInput.value === "") {
        alert("Input is empty. Please enter your initials");
        return;
    } else if (initialInput.value.length != 2){
        alert("Please enter TWO characters");
        return;
    }

    let highScores = {
        games: []
    }

    let highScoresParsed = JSON.parse(localStorage.getItem("highScores"));

    let game = {
        name: initialInput.value.toUpperCase(),
        score: score
    }

    if (highScoresParsed != null) {
        highScoresParsed.games.push(game);
        highScores = highScoresParsed;
    }
    else {
        highScores.games.push(game);
    }

    // Sort by games highscores by score descending.
    highScores.games.sort((a,b) => parseFloat(b.score) - parseFloat(a.score));

    highscoreOl.setAttribute("start", "1")
    highscoreOl.setAttribute("id", "li-left")
    localStorage.setItem("highScores", JSON.stringify(highScores));
    initials.dataset.visible="false";
    highscoreSection.dataset.visible="true";
    displayHighscores(highScores);
    toDisplay();
}

// Function to create li elements to display the highscores. 
function displayHighscores(highScores) {
    let hs = highScores;

    // New ordered list to be inserted.
    const newOl = highscoreOl;

    // The reference element.
    const refEl = highScoreLi;
    refEl.setAttribute("style", "list-style-type: none");

    // The parent element.
    const parentEl = refEl.parentNode;

    // Insert new ordered list.
    parentEl.insertBefore(newOl, refEl);

    for(i=0;i<hs.games.length;i++) {
        let newLi = document.createElement("li");
        newLi.textContent = "Player: " + hs.games[i].name + " - Score: " + hs.games[i].score;
        highscoreOl.appendChild(newLi);     
    }
    newOl.setAttribute("style", "list-style-type: number");
    
}

// Function to render highscores.
function renderHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores"));
}

// Function to decide which section to display.
function toDisplay() {
    for (i = 0; i < sectionToDisplay.length; i++) {
        if (sectionToDisplay[i].dataset.visible === "false") {
            sectionToDisplay[i].style.display = "none";
        } else {
            sectionToDisplay[i].style.display = "flex";
        }
    }
}

// Function to fade the result message.
function fadeoutMsg() {
    document.getElementById("ans-result-msg").style.opacity = "0";
}

// Function to clear the highscores from the localstorage.
function clearHs() {
    window.localStorage.removeItem("highScores");
    document.querySelector("#high-score-list").style.display = "none";
    document.querySelector("#clear-btn").style.display = "none";
    document.querySelector("#highscore-h2").textContent = "Highscores Cleared";
    let clearText = document.createElement("p");
    clearText.textContent = "Press 'Play Again' if you wish to play again";
    highscoreSection.appendChild(clearText);
}

// Function to reload the game by refreshing the page
function playAgain() {
    location.reload();
}