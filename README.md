# hw-boot-wk04-Quiz

## The App
This is a timed JavaScript code quiz app with multiple choice questions. The app runs in a browser which is responsive using HTML, CSS and JavsScript. 

## How it works
The first page is loaded with instrustions how to complete the quiz. The user presses the "Start Quiz" button when ready to start. 

![Website Screen Shot](./assets/images/01-start-page.jpg)

When the "Start Quiz" button is pressed, a question a with multiple choice answers is displayed with a countdown timer. 

![Website Screen Shot](./assets/images/02-quiz-page.jpg)

When the user chooses an answer, the next question is displayed with the same display format as the previous one. A message is flashed to inform the user if the answer is correct or wrong. If the answer is correct, the message text will be green in colour otherwise, the message text will be red and ten seconds is deducted from the time left.

![Website Screen Shot](./assets/images/03-quiz-next.jpg)

The timer text colour changes to red when there is 10 seconds or less left. 

![Website Screen Shot](./assets/images/04-quiz-time-runout.jpg)

When all questions are answered or if the timer reaches zero, the user is asked to input his initials with two characters. It does not matter if the input is lowercase. It will be converted to uppercase. 

![Website Screen Shot](./assets/images/05-game-over.jpg)

If the initials input is empty, the following alert is popped: 

![Website Screen Shot](./assets/images/06-validate-ini-01.jpg)

If the initials is too long, the following alert is popped: 

![Website Screen Shot](./assets/images/06-validate-ini-02.jpg)

When the input is validated, the page displays the list of highscores, sorted descendently by the highest score. The user can either choose to play again or clear the highscores list. 

![Website Screen Shot](./assets/images/07-highscores.jpg)

If the user chooses to play again, the game will restart. If the user chooses to clear the highscores list, the highscores list is deleted from localstorage and the following page is displayed: 

![Website Screen Shot](./assets/images/08-clear-highscores.jpg)

## Link to deployment application

https://bernardjbs.github.io/hw-boot-wk04-Quiz/