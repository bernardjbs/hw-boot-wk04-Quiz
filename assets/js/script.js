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

// Variables.

let qIdx = 0;
let score = 0;
let highScore = 0;
let secondsLeft = 100;

// Constants
const ansLen = questions[qIdx].answers.length;
const sectionToDisplay = [startPage, quiz, ansResultMsg, initials];

function startQuiz() {
    renderQuiz();
    startPage.dataset.visible = "false";
    quiz.dataset.visible = "true";
    startBtn.addEventListener("click", toDisplay());
} 

fillQnA(qIdx);
timer();

function checkAns(clicked_id) {
    document.getElementById("ans-result-msg").style.opacity = "100"
    ansResultMsg.dataset.visible = "false";
    const qLen = questions.length;
    if (qIdx < qLen-1) {
        // check answer
        if (clicked_id == questions[qIdx].answer) {
            ansResultMsg.textContent = "The answer is CORRECT";
            score = score+10;
            log("this is the correct answer - store the results");
        }
        else {            
            ansResultMsg.textContent = "The answer is WRONG";
            secondsLeft = secondsLeft-20;
            log("this is the wrong answer - store the results");
        }
        ansResultMsg.dataset.visible = "true";
        setTimeout(fadeoutMsg, 500);
        // increment the questions index
        qIdx++;
        fillQnA(qIdx);    
        //log("qIdx: " + qIdx + " - qLen: " + qLen);
    }
    else if (qIdx === qLen-1) {
        log("time to input initials and show the results");
    }
    else {
        log("there has been an error");
    }
    saveQuiz();
}

function saveQuiz() {
    let quizInfo = {        
        qIdx: qIdx,
        secondsLeft: secondsLeft, 
        initial: initialInput.value,
        score: score, 
        highScore: highScore
    }
    // save quizInfo obj in local storage
    localStorage.setItem("quizInfo", JSON.stringify(quizInfo));
}

function renderQuiz() {
    let lastQuiz = JSON.parse(localStorage.getItem("quizInfo"));
    log("quiz index: " + qIdx);
    if (lastQuiz != null) {
        log("lastQuiz: " + lastQuiz.qIdx);
        fillQnA(lastQuiz.qIdx);
    }
}

function timer() {
    let timerInterval = setInterval(function() {
        log("i am here");
        secondsLeft--;
        timeEl.innerHTML = " - " + secondsLeft + " seconds left";

        if(secondsLeft === 0) {
            // Stops execution of action at set interval.
            clearInterval(timerInterval);
            // TODO Get initials and show results
        }
    }, 1000);
}

function fillQnA(qIdx) {
    toDisplay();
    question.textContent = questions[qIdx].question;
    for (i = 0; i < ansLen; i++) {
        document.getElementById(i + 1).textContent = questions[qIdx].answers[i];
    }    
}

function toDisplay() {
    for(i=0; i<sectionToDisplay.length; i++) {
        if (sectionToDisplay[i].dataset.visible === "false") {
            sectionToDisplay[i].style.display = "none";
        } else {
            sectionToDisplay[i].style.display = "block";
        }
    }
}

function fadeoutMsg() {
    document.getElementById("ans-result-msg").style.opacity = "0";
}



    //checkHighScore();
    // saveQuiz();
    