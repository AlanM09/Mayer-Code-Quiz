var answer1 = document.getElementById("button1");
var answer2 = document.getElementById("button2");
var answer3 = document.getElementById("button3");
var answer4 = document.getElementById("button4");
var question = document.getElementById("questions");
var correctAnswer = document.getElementById("correctIncorrect");
var incorrectAnswer = document.getElementById("correctIncorrect");
var quizBtn = document.querySelectorAll(".quizBtn");
var runningQuestion = 0;
var time = document.getElementById("timer");
var yourScore = document.querySelector(".display-3");
var submitButton = document.getElementById("buttonInitials");
var inputLine = document.getElementById("inlineFormInput");
var startButton = document.getElementById("startQuiz");
var cardQuestions = document.getElementById("questionsCard");
var displayJumbo = document.querySelector(".jumbotron");

var questions = [{
  question: "Inside which HTML element do we put the JavaScript?",
  answer1: "<javascript>",
  answer2: "<script>",
  answer3: "<js>",
  answer4: "scripting",
  correct: "<script>"
}, {
  question: "What is the correct JavaScript syntax to change the content of the HTML element below?",
  answer1: "document.getElementByName('p').innerHTML = 'Hello World!'; ",
  answer2: "#demo.innerHTML = 'Hello World!';",
  answer3: "document.getElement('p').innerHTML = 'Hello World!';",
  answer4: "document.getElementById('demo').innerHTML = 'Hello World!';",
  correct: "document.getElementById('demo').innerHTML = 'Hello World!';"
}, {
  question: "The external JavaScript file must contain the <script> tag.",
  answer1: "True",
  answer2: "False",
  answer3: "Maybe",
  answer4: "Ask Me Later",
  correct: "False"
}, {
  question: "How do you call a function named 'myFunction'?",
  answer1: "call function myFunction()",
  answer2: "call myFunction()",
  answer3: "myFunction()",
  answer4: "Function(My)",
  correct: "myFunction()"
}, {
  question: "How to write an IF statement in JavaScript?",
  answer1: "if i = 5 then",
  answer2: "if i = 5",
  answer3: "if i == 5 then",
  answer4: "if (i == 5)",
  correct: "if (i == 5)"
}];



var secondsLeft = 120;
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    console.log(secondsLeft);
    time.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      cardQuestions.setAttribute("style", "display: none");
      displayJumbo.setAttribute("style", "display: block");
      yourScore.textContent = "Your score is: " + secondsLeft;
      startButton.setAttribute("style", "display: none");
      submitButton.setAttribute("style", "display: inline");
      inputLine.setAttribute("style", "display: inline-block");

    } else if (runningQuestion === 5) {
      clearInterval(timerInterval);
      console.log(secondsLeft);
      cardQuestions.setAttribute("style", "display: none");
      displayJumbo.setAttribute("style", "display: block");
      yourScore.textContent = "Your score is: " + secondsLeft;
      startButton.setAttribute("style", "display: none");
      submitButton.setAttribute("style", "display: inline");
      inputLine.setAttribute("style", "display: inline-block");

    }



  }, 1000);
}


startButton.addEventListener("click", startGame);

function startGame() {
  setTime();
  firstQuestion();
  console.log("game on");
  cardQuestions.setAttribute("style", "display: block");
  displayJumbo.setAttribute("style", "display: none");

}



function firstQuestion() {
  var quest = questions[runningQuestion];
  question.textContent = quest.question;
  answer1.textContent = quest.answer1;
  answer2.textContent = quest.answer2;
  answer3.textContent = quest.answer3;
  answer4.textContent = quest.answer4;
}


for (var i = 0; i < quizBtn.length; i++) {
  quizBtn[i].addEventListener("click", function userAnswer(event) {
    event.stopPropagation();
    if (event.currentTarget.innerText === questions[runningQuestion].correct) {
      correctAnswer.textContent = "Correct + 5 sec";
      correctAnswer.setAttribute("style", "color: blue");
      secondsLeft = secondsLeft + 5;
      console.log("correct");
    } else {
      incorrectAnswer.textContent = "Incorrect - 5 sec";
      incorrectAnswer.setAttribute("style", "color: red");
      secondsLeft = secondsLeft - 5;
      console.log("Incorrect minus 5 seconds");
    }
    console.log(runningQuestion);
    runningQuestion++;


    if (runningQuestion < 5) {
      firstQuestion();
    }
  });
}


var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

submitButton.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("click");

  var initials = inputLine.value;
  var finalScore = { initials, secondsLeft };
  console.log("Final Score: " + finalScore);
  console.log(initials + " your score is: " + secondsLeft);

  highscores.push(finalScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));

});

