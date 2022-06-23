import { listOfQuestions } from './questionsAPI.js';

let questionContainer = document.querySelector(".question-container");
let questionNumberEl = document.querySelector(".question-number");
let questionPageEl = document.querySelector(".question-page");

let questionEl = document.querySelector('.question-el h3');
let optionEl = document.querySelectorAll('.option-el');

let pointEl = document.querySelector(".point-el div");
let playAgainBtn = document.querySelector(".play-again-btn");
let correctAnswerEl = document.querySelector(".correct-answer");

// Timer Element
let timerEl = document.querySelector(".timer");

// Track current question
let currentQuestionNumber = 1;
let questionIndex = 0;

// Points
let quizPoint = 0;

// Random Complements
const complements = ["Nice Job", "Wohoo! You're doing great", "Awesome!", "Keep It Up", "Fantastic"];

function getRandomComplement() {
    let randomIndex = Math.floor(Math.random() * complements.length);
    return complements[randomIndex];
}

// console.log(getRandomComplement())

function updateQuestionNumber() {
    questionPageEl.textContent = `Question ${currentQuestionNumber} / ${listOfQuestions.length}`;
    questionNumberEl.textContent = `Question ${currentQuestionNumber}`;
}

playAgainBtn.addEventListener('click', startGame);

function startGame() {
    currentQuestionNumber = 1;
    questionIndex = 0;
    quizPoint = 0;
    questionContainer.style.display = "block"
    nextBtn.style.display = "block";

    pointEl.innerHTML = `Wohoo! Nice Game <br> you got ${quizPoint}/${5 * listOfQuestions.length}`;
    pointEl.style.display = "none"
    playAgainBtn.style.display = "none";
    updateQuestionNumber();
    renderQuestionsToUI();
    startTimer();
}


function renderQuestionsToUI() {
    questionEl.textContent = listOfQuestions[questionIndex].question;
    let { a, b, c, d } = listOfQuestions[questionIndex].options;

    // Create option elements;
    const optionsArray = [];

    optionEl.forEach(option => {
        optionsArray.push(option);
        // Add click event listener to all options
        
    })
    optionsArray[0].textContent = a;
    optionsArray[1].textContent = b;
    optionsArray[2].textContent = c;
    optionsArray[3].textContent = d;
}

optionEl.forEach(option => {
    option.addEventListener('click', () => {
        let answer = listOfQuestions[questionIndex].answer
        checkIfCorrect(option.textContent, listOfQuestions[questionIndex].options[answer], option);
        setTimeout(() => {
            moveToNextQuestion(option);
        }, 1000);
        
    })
});

let seconds = 0;

let timer;

function startTimer() {
    seconds = listOfQuestions.length * (10 /2);
    timer = setInterval(() => {
        // console.log(seconds += 1);
        if (seconds <= 0) {
            clearInterval(timer);
            timeUp();
        } else {
            seconds -= 1;
            timerEl.textContent = `${seconds}`;
        }
        
    }, 1000)
}

let nextBtn = document.querySelector('.next-question');
nextBtn.addEventListener('click', moveToNextQuestion);
    
function moveToNextQuestion(option = {}) {
    if (currentQuestionNumber < listOfQuestions.length) {
        currentQuestionNumber += 1;
        questionIndex += 1;
        // console.log(currentQuestionNumber);
        renderQuestionsToUI();
        updateQuestionNumber();
    } else if (currentQuestionNumber === listOfQuestions.length) {
        finishedGame();
    }
    else {
        return;
    }
    option.id = "";
    correctAnswerEl.textContent = "";       
}

function timeUp() {
    pointEl.innerHTML = `Oops! Time's Up :( <br> you got ${quizPoint}/${5 * listOfQuestions.length}`;
    pointEl.style.display = "block"
    playAgainBtn.style.display = "block";
    questionContainer.style.display = "none"
    nextBtn.style.display = "none";
}

function finishedGame() {
    pointEl.innerHTML = `Wohoo! Nice Game <br> you got ${quizPoint}/${5 * listOfQuestions.length}`;
    pointEl.style.display = "block"
    playAgainBtn.style.display = "block";
    questionContainer.style.display = "none"
    nextBtn.style.display = "none";
    timerEl.textContent = `0`;
    clearInterval(timer);
}

function checkIfCorrect(selectedAnswer, correctAnswer, option) {
    if (selectedAnswer === correctAnswer) {
        // Add points if selected answer is correct
        addPoint();
        option.id = "correct";
        correctAnswerEl.textContent = getRandomComplement();
        correctAnswerEl.style.color = "springgreen";
    } 
    else {
        option.id = "wrong";
        correctAnswerEl.textContent = `Sorry the answer was: ${correctAnswer} :(`;
        correctAnswerEl.style.color = "#ec311c";
    }
}

function addPoint() {
    if (currentQuestionNumber < (listOfQuestions.length + 1)) {
        quizPoint += 5;
        console.log(quizPoint);
    }
    
}

startGame();