const startEl = this.document.querySelector("#start");
const quizContainerEl = this.document.querySelector("#quiz-container");
const questionEl = this.document.querySelector("#quiz-questions");
const answerEl = this.document.querySelector("#answer-button");
const resultsEl = this.document.querySelector(".results");
const submitEl = this.document.querySelector("#submit");
const buttonEl = this.document.querySelector("#button");
const timerEl = this.document.querySelector("#timer");
const showScore = this.document.querySelector("#showScore");
const intialForm = this.document.querySelector("#initial-input-form"); //form
const initialInput = this.document.querySelector("#initials");
const log = this.document.querySelector("#results-log");
const viewScores = this.document.querySelector("#ViewYourHighScores");
const codeQuiz = this.document.querySelector("#CodeQuiz");
const scoreBoard = this.document.querySelector("#scoreBoard");

startEl.addEventListener("click", startQuiz);

// list of questions
const questionsArray = [
  {
    question: "var a: if(a) {return true;} else{return false;}",
    answers: ["True", "False"],
    correctAnswer: "True"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<scipt>", "<scripting>", "<js>", "<javascript>"],
    correctAnswer: "<script>"
  },
  {
    question: "var bool2 = new Boolean(0)",
    answers: ["True", "False"],
    correctAnswer: "False"
  },
  {
    question:
      "The link element of CSS should be placed at the top of the body section",
    answers: ["True", "False"],
    correctAnswer: "False"
  },
  {
    question: "What is a common use of JSON?",
    answers: [
      "To find all the JSONs embedded within the code",
      "To exchange data to/from a web server"
    ],
    correctAnswer: "To exchange data to/from a web server"
  },
  {
    question:
      "margin:center snippet of CSS is commonly used to center a website horizontally?",
    answers: ["True", "False"],
    correctAnswer: "True"
  },
  {
    question:
      "Which of the following is not an example of semantic HTML elements",
    answers: ["<form>", "<table>", "<span>"],
    correctAnswer: "<span>"
  }
];
var currentQuestion = 0;

//When the start button is clicked
function startQuiz() {
  startEl.classList.add("hide");
  quizContainerEl.classList.remove("hide");
  // Now setting the questions
  timer = setInterval(updateTime, 1000);
  quizQuestions();
}

var timer;
//If time runs out, it will show the results page else the current timer goes down every second
function updateTime() {
  if (currentTimer <= 0) {
    currentTimer = 0;
    clearInterval(timer);
    resultsEl.style.display = "block";
    quizContainerEl.style.display = "none";
    showScore.innerText = checkAnswer;
  } else {
    currentTimer--;
  }
  timerEl.innerText = currentTimer;
}

//running through the question array and appending the answer button for each question
function quizQuestions() {
  questionEl.innerText = questionsArray[currentQuestion].question;
  answerEl.innerText = "";
  questionsArray[currentQuestion].answers.forEach(answers => {
    var button = document.createElement("button");
    button.innerText = answers;
    button.addEventListener("click", selectAnswer);
    button.classList.add("button");
    answerEl.append(button);
  });
}

//when the quiz is completed, show the score within the results pageg and clear timer
function quizIsFinished() {
  if (currentQuestion >= questionsArray.length) {
    quizContainerEl.style.display = "none";
    resultsEl.style.display = "block";
    showScore.innerText = checkAnswer;
    clearInterval(timer);
    return true;
  } else {
    return false;
  }
}
//if the UserAnswer matches correctAnswer, then it will count it as correct else the timer will deduct ten seconds if the quiz is not finished
var checkAnswer = 0;
function selectAnswer() {
  if (
    event.target.innerText === questionsArray[currentQuestion].correctAnswer
  ) {
    checkAnswer++;
  } else {
    currentTimer -= 10;
  }
  ++currentQuestion;
  // quizQuestions();
  if (!quizIsFinished()) {
    quizQuestions();
  }
}

var currentTimer = 50;

var initials = [];
function renderInitials() {
  // Clearing the initial element
  log.innerHTML = "";

  //Render a new list for each to do
  for (var i = 0; i < initials.length; i++) {
    var initial = initials[i];

    var li = document.createElement("li");
    li.textContent = initial;
    log.appendChild(li);
  }
}

//storing this in my local storage
function storeInitials() {
  localStorage.setItem("initials", JSON.stringify(initials));
}

//When the form is submited
intialForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var initialText = initialInput.value.trim();

  if (initialText === "") {
    return;
  }

  //Adding initials into an initials array
  initials.push(initialText + ", here is your score: " + checkAnswer);
  //clear the input
  initialInput.value = "";

  //Store updated initials in localStorage and re-render list
  storeInitials();
  renderInitials();
});

//allow the user to see past high scores
viewScores.addEventListener("click", function(quizIsFinished) {
  quizIsFinished.preventDefault();
  currentTimer = 0;
  startEl.classList.add("hide");
  quizContainerEl.classList.add("hide");
  resultsEl.style.display = "block";

  // Get stored initials from localStorage
  // Parsing the JSON string to an object

  var storedinitials = JSON.parse(localStorage.getItem("initials"));

  if (storedinitials !== null) {
    initials = storedinitials;
  }
  renderInitials();
});

codeQuiz.addEventListener("click", function(event) {
  window.location.reload();
});
// event.preventDefault();
// startEl.classList.remove("hide");
// currentTimer = 50;
// showScore.style.display = "none";
// resultsEl.style.display = "none";
// startQuiz();
// // quizIsFinished();
// showScore.style.display = "block";
// resultsEl.style.display = "block";
// });
