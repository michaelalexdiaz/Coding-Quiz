const timeEl = document.getElementById("timer");
const startButton = document.getElementById("start-button")
const nextButton = document.getElementById("next-button")
const questionContainerEl = document.getElementById("question-container")
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer-buttons')
const scoreEl = document.getElementById('score')
const enterHiscoreEl = document.getElementById('enter-hiscore')
const cardEl = document.getElementById('card')
const saveButton = document.getElementById('save')
const highscoreList = document.getElementById('highscore-list')
let allScores =localStorage.getItem('allScores')||[]
let playerScore = 0
let timeLeft = 30;

const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers:[
            {text: "strings", correct: false},
            {text: "booleans", correct: false},
            {text: "alerts", correct: true},
            {text: "numbers", correct: false}
        ]
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        answers:[
            {text: "curly brackets", correct: false},
            {text: "quotes", correct: false},
            {text: "parentheses", correct: true},
            {text: "square brackets", correct: false}
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers:[
            {text: "all of the above", correct: true},
            {text: "other arrays", correct: false},
            {text: "numbers and strings", correct: false},
            {text: "booleans", correct: false}
        ]
    },
    {
        question: 'String values must be enclosed within ____ when being assigned to variables.',
        answers:[
            {text: "commas", correct: false},
            {text: "quotes", correct: true},
            {text: "curly brackets", correct: false},
            {text: "parentheses", correct: false}
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers:[
            {text: "console.log", correct: true},
            {text: "terminal / bash", correct: false},
            {text: "for loops", correct: false},
            {text: "JavaScript", correct: false}
        ]
    }
]


startButton.addEventListener("click", startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

function startQuiz(){
    startButton.classList.add("hide")
    enterHiscoreEl.classList.add('hide')
    questionContainerEl.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0
    playerScore = 0
    nextQuestion();
    setTime();
}

function setTime() {
    let timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timeEl.textContent = "Times Up!";
            questionContainerEl.classList.add("hide");
            nextButton.classList.add("hide");
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
            enterHiscoreEl.classList.remove('hide');
        }
    }, 1000)
}




function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
            button.dataset.correct = true
        } else {
            button.dataset.incorrect = false
        }
        button.addEventListener('click', selectAnswer) 
            answerEl.appendChild(button)
    })
}

function resetQuestion() {
    nextButton.classList.add('hide')
    while (answerEl.firstChild) {
        answerEl.removeChild
        (answerEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct){
        playerScore++ 
        scoreEl.textContent = playerScore
        console.log(playerScore)
    }
    setStatusClass(document.body, correct)
    Array.from(answerEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')
    } else {
        questionContainerEl.classList.add("hide");
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        enterHiscoreEl.classList.remove('hide');
    }
} 

function nextQuestion() {
    resetQuestion()
    showQuestion(shuffledQuestions[currentQuestionIndex])

    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}


function saveLastScore() {
    var userScore = {
      name: username.value,
      score: playerscore.value,
    };
    allScores.push(userScore)
    localStorage.setItem("lastScore", JSON.stringify(allScores));
  }
  
  function renderLastScore() {
    var lastScore = JSON.parse(localStorage.getItem("lastScore"));
    if (lastScore !== null) {
    document.getElementById("saved-name").innerHTML = lastScore[lastScore.length -1].name;
    document.getElementById("saved-score").innerHTML = lastScore[lastScore.length -1].score;
    for(let i=0; i < lastScore.length; i++){
        let li = document.createElement("li")
        highscoreList.appendChild(li).innerHTML = "Name: " + lastScore[i].name + "<br>" + "Score: " + lastScore[i].score;
    }   return;
    }
  }

  

  saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveLastScore();
    renderLastScore();
    });

    function init() {
        renderLastScore();
    }
      init();


