
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


const quizArray = [
  {
    id: "0",
    question: "Which definition best describes the game SMITE?",
    options: ["MOBA", "Strategy", "Shooter", "Turn-Based"],
    correct: "MOBA",
  },
  {
    id: "1",
    question: "When was SMITE officially released?",
    options: ["2014", "2012", "2013", "2018"],
    correct: "2014",
  },
  {
    id: "2",
    question: "Who is the creator of SMITE?",
    options: ["Hi-Rez Studios", "Jerry Games", "Riot Games", "JabaJaba Studios"],
    correct: "Hi-Rez Studios",
  },
  {
    id: "3",
    question: "How many Pantheons are there in SMITE?",
    options: ["5", "12", "16", "20"],
    correct: "16",
  },
  {
    id: "4",
    question: "Which one of these are NOT a class archetype in SMITE?",
    options: ["Warriors", "Mages", "Assassins", "Fighters"],
    correct: "Fighters",
  },
  {
    id: "5",
    question: "How often is the free rotation of Gods changed?",
    options: ["7 days", "8 days", "5 days", "6 days"],
    correct: "7 days",
  },
  {
    id: "6",
    question: "How many Gods are free per rotation?",
    options: ["5", "6", "7", "8"],
    correct: "5",
  },
  {
    id: "7",
    question: "How many playable Gods are in the game?",
    options: ["125", "162", "144", "103"],
    correct: "125",
  },
  {
    id: "8",
    question: "How many game modes can you play?",
    options: ["8", "10", "6", "7"],
    correct: "8",
  },
  {
    id: "9",
    question: "What level do you have to be to play ranked?",
    options: ["20", "15", "25", "30"],
    correct: "30",
  },
];


nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    
    questionCount += 1;
    
    if (questionCount == quizArray.length) {
      
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      
      userScore.innerHTML =
        "Your Score Is " + scoreCount + " Out Of " + questionCount;
    } else {
      
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      
      quizDisplay(questionCount);
      count = 21;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);


const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};


const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  
  quizCards[questionCount].classList.remove("hide");
};


function quizCreator() {
  
  quizArray.sort(() => Math.random() - 0.5);
  
  for (let i of quizArray) {
    
    i.options.sort(() => Math.random() - 0.5);
    
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}


function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  
  clearInterval(countdown);
  
  options.forEach((element) => {
    element.disabled = true;
  });
}


function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 21;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}


startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});


window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};