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

let questionCounter = 0
const scorePoints = 100
const maxQuestions = 7

let shuffledQuestions
let currentQuestionIndex
let playerScore = 0
let timeLeft = 30;


startButton.addEventListener("click", startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

function startQuiz(){
    startButton.classList.add("hide")
    enterHiscoreEl.classList.add('hide')
    // cardEl.classList.add('hide')
    questionContainerEl.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0
    playerScore = 0
    nextQuestion()
}

function setTime() {
    let timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timesUp();
        }
    }, 1000)
}


function timesUp() {
    timeEl.textContent = "Times Up!"
}

setTime();


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
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        enterHiscoreEl.classList.remove('hide')
    }
} 

function nextQuestion() {
    resetQuestion()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    // if (currentQuestionIndex > maxQuestions) {
    //     localStorage.setItem('mostRecentScore', score)
    //     return window.location.assign('/end.html')
    // }

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
    //username should be a variable that is tied to the input field 
      name: username.value,
      score: playerscore.value,
    };
    allScores.push(userScore)
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
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

const questions = [
    {
        question: 'Where does the src="script.js" go on the HTML page?',
        answers:[
            {text: "In the head element", correct: false},
            {text: "After the body", correct: false},
            {text: "At the end of the body", correct: true},
            {text: "It doesn't go in the HTML", correct: false}
        ]
    },
    {
        question: 'What is the tag used for URL links?',
        answers:[
            {text: "<a>", correct: true},
            {text: "<p>", correct: false},
            {text: "<link>", correct: false},
            {text: "<url>", correct: false}
        ]
    },
    {
        question: 'How do you target an ID in css?',
        answers:[
            {text: "id {", correct: false},
            {text: ". {", correct: false},
            {text: "# {", correct: true},
            {text: ":: {", correct: false}
        ]
    },
    {
        question: 'Which array method is used to combine arrays?',
        answers:[
            {text: "array.join", correct: false},
            {text: "array.concat", correct: true},
            {text: "array.fill", correct: false},
            {text: "array.group", correct: false}
        ]
    },
    {
        question: 'Which of these is not a way to define a variable in JS?',
        answers:[
            {text: "let", correct: false},
            {text: "const", correct: false},
            {text: "var", correct: false},
            {text: "consts", correct: true}
        ]
    },
    {
        question: 'What is necessary for a function to be invoked/called on?',
        answers:[
            {text: "[]", correct: false},
            {text: "{}", correct: false},
            {text: "An argument", correct: false},
            {text: "()", correct: true}
        ]
    },
    {
        question: 'Which NBA team is the best?',
        answers:[
            {text: "Boston Celtics", correct: false},
            {text: "Golden State Warriors", correct: false},
            {text: "Chicago Bulls", correct: true},
            {text: "LA Lakers", correct: false}
        ]
    }
]
