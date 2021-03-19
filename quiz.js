var startButton = document.getElementById("start-button");
var nextButton = document.getElementById("next-button");
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var submitButton = document.getElementById('submit-button');
var highScores = document.getElementById('high-scores');
var timer = document.getElementById('countdown');
var timerHandle
var timeLeft = 120;
var finalScore = document.getElementById('final-score')
var score = 0;
var submitInitialContainerElement = document.getElementById('submit-initial-container');

//quiz questions
var question = [{
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [{
            text: '<script>',
            correct: true
        },
        {
            text: '<js>',
            correct: false
        },
        {
            text: '<scripting>',
            correct: false
        },
        {
            text: '<javascript>',
            correct: false
        },
    ]
},
{
    question: 'How do you write "Hello World" in an alert box?',
    answers: [{
            text: 'alertBox("Hello World");',
            correct: false
        },
        {
            text: 'alert("Hello World");',
            correct: true
        },
        {
            text: 'msgBox("Hello World");',
            correct: false
        },
        {
            text: 'msg("Hello World");',
            correct: false
        },
    ]
},
{
    question: 'How do you create a function in JavaScript?',
    answers: [{
            text: 'function:myFunction()',
            correct: false
        },
        {
            text: 'function myFunction()',
            correct: true
        },
        {
            text: 'function = myFunction()',
            correct: false
        },
    ]
},
{
    question: 'How to write an IF statement in JavaScript?',
    answers: [{
            text: 'if i == 5 then',
            correct: false
        },
        {
            text: 'if i = 5',
            correct: false
        },
        {
            text: 'if i = 5 then',
            correct: false
        },
        {
            text: 'if (i == 5)',
            correct: true
        },
    ]
},
];


startButton.addEventListener('click', startQuiz);
startButton.addEventListener('click', startTimer);
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < question.length - 1) {
        currentQuestionIndex++
    } else {
        showFinalScore();
        questionContainerElement.classList.add('hide');
        questionElement.classList.add('hide');
        answerButtonsElement.classList.add('hide');
    };
    setNextQuestion();
})


function startTimer() {
    timerHandle = setInterval(function () {
            if (timeLeft >= 1) {
                timer.textContent = timeLeft;
                timeLeft = timeLeft - 1;
            }
            if (timeLeft === 0) {
                timer.textContent = 'Time is up!';
            }
        },
        1000);
}

function startQuiz() {
    startButton.classList.add('hide');
    submitInitialContainerElement.classList.add('hide');
    currentQuestionIndex = 0;
    questionContainerElement.classList.add('hide');
    questionElement.classList.remove('hide');
    answerButtonsElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    console.log(currentQuestionIndex);
    showQuestion(question[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('buttons');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (currentQuestionIndex > question.length) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.remove('hide');
    }
}


function showFinalScore() {
    document.getElementById("submit-initial-container").classList.remove('hide');
    finalScore.textContent = "Your score is " + score;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        score++;
        element.classList.add('correct');
    } else {
        timeLeft--;
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}





submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    var initials = document.querySelector('#initials').value;
    if (initials === '') {
        alert('Initials cannot be blank.');
    } else {
        submitInitialContainerElement.classList.add('hide');
        highScores.classList.remove('hide');

    }
    localStorage.setItem("initials", initials);
});

renderLastRegistered();

function renderLastRegistered() {
    localStorage.getItem("initials", initials);
    var initials = localStorage.getItem("initials");

    if (initials === null) {
        return;
    }
}