function log(log) {
    return console.log(log);
}

// Variables.
let qIdx = 0;

// Constants
const ansLen = questions[qIdx].answers.length;

// Query Selectors
const startPage = document.querySelector("#start-page");
const question = document.querySelector("#qH2");

function fillQnA() {
    question.textContent = questions[qIdx].question;
    for (i = 0; i < ansLen; i++) {
        document.getElementById(i + 1).textContent = questions[qIdx].answers[i];
    }    
}

fillQnA();

function checkAns(clicked_id) {
    const qLen = questions.length;
    if (qIdx < qLen-1) {
        //log("the button pressed is: " + clicked_id);
        // check answer
        if (clicked_id == questions[qIdx].answer) {
            // log("this is the correct answer - store the results");
        }
        else {
            // log("this is the wrong answer - store the results");
        }
    
        // TODO: store qIdx in local storage
        // increment the questions index
        qIdx++;
        fillQnA();    
        log("qIdx: " + qIdx + " - qLen: " + qLen);
    }
    else if (qIdx === qLen-1) {
        log("time to show the results");
    }
    else {
        log("there has been an error");
    }
}