function log(log) {
    return console.log(log);
}

// Query Selectors
const startPage = document.querySelector("#start-page");
const quiz = document.querySelector("#quiz");
const ansResultMsg = document.querySelector("#ans-result-msg");
const initials = document.querySelector("#initials");
const question = document.querySelector("#qH2");
const startBtn = document.querySelector("#startBtn");
const initialInput = document.querySelector("#initial-input");
const timeEl = document.querySelector("#time");
const highscoreSection = document.querySelector("#highscore-section");
let highscoreUl = document.querySelector("#highscore-ul");

// Variables.
let qIdx = 0;
let score = 0;
let secondsLeft = 100;
let timerInterval = 0;
let highScoresLi = [];

// Constants
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
    flexSubContainer(quiz);
    timer();
}

// Will save quiz when window or tab is closed
window.addEventListener("unload", function (event) {
    //save local data
})

function checkAns(clicked_id) {
    document.getElementById("ans-result-msg").style.opacity = "100"
    ansResultMsg.dataset.visible = "false";
    const qLen = questions.length;
    if (qIdx < qLen - 1) {
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
        // increment the questions index
        qIdx++;
        fillQnA(qIdx);
    }
    else if (qIdx === qLen - 1) {
        log("time to input initials and show the results");
        clearInterval(timerInterval);
        // Hide answers section and show initials section.            
        quiz.dataset.visible = "false";
        initials.dataset.visible = "true";
        toDisplay();
    }
    else {
        log("there has been an error");
    }
}

function timer() {
    timerInterval = setInterval(function () {
        log("i am here");
        secondsLeft--;
        timeEl.innerHTML = " - " + secondsLeft + " seconds left";

        log("qIdx: " + qIdx + " - questions len: " + questions.length);
        if (qIdx === (questions.length)) {
            window.alert("Clearing interval");
            clearInterval(timerInterval);
        }
        if (secondsLeft === 0 || secondsLeft < 0) {
            // Stops execution of action at set interval.
            clearInterval(timerInterval);
            // Hide answers section and show initials section.            
            quiz.dataset.visible = "false";
            initials.dataset.visible = "true";
            //saveHighScores();
            toDisplay();
        }
    }, 1000);
}

function saveHighScores() {
    let highScores = {
        games: []
    }

    let highScoresParsed = JSON.parse(localStorage.getItem("highScores"));

    let game = {
        name: initialInput.value,
        score: score
    }

    if (highScoresParsed != null) {
        alert("games array is not empty... push and assign highscoresArr = highScoresParsed")
        highScoresParsed.games.push(game);
        highScores = highScoresParsed;
    }
    else {
        alert("games array is empty... push highScore")
        highScores.games.push(game);
    }

    localStorage.setItem("highScores", JSON.stringify(highScores));
    initials.dataset.visible="false";
    highscoreSection.dataset.visible="true";
    displayHighscores(highScores);
    toDisplay();
}

function displayHighscores(highScores) {
    let hs = highScores;

    // alert("game: " + hs.games[0].score);
    // For each highscore in highscores, create an li element and append it to ul
    for(i=0;i<hs.games.length;i++) {
        let newLi = document.createElement("li");
        newLi.textContent = "Name: " + hs.games[i].name + " - Score: " + hs.games[i].score;
        highscoreUl.appendChild(newLi);
        // alert("looping in the hs array");        
    }

}

function renderHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores != null) {
        log("highScores lenght: " + highScores.games.length);
    }
}

function fillQnA(qIdx) {
    toDisplay();
    question.textContent = questions[qIdx].question;
    for (i = 0; i < ansLen; i++) {
        document.getElementById(i + 1).textContent = questions[qIdx].answers[i];
    }
    // flexSubContainer(quiz);
}

function toDisplay() {
    for (i = 0; i < sectionToDisplay.length; i++) {
        if (sectionToDisplay[i].dataset.visible === "false") {
            sectionToDisplay[i].style.display = "none";
        } else {
            sectionToDisplay[i].style.display = "flex";
        }
    }
}

function fadeoutMsg() {
    document.getElementById("ans-result-msg").style.opacity = "0";
}

function clearHs() {
    alert("i am here");
    window.localStorage.removeItem("highScores");
    document.querySelector("#high-score-list").style.display = "none";
    document.querySelector("#clear-btn").style.display = "none";
    document.querySelector("#highscore-h2").textContent = "Highscores Cleared";
    let clearText = document.createElement("p");
    clearText.textContent = "Press 'Play Again' if you wish to play again";
    highscoreSection.appendChild(clearText);
}