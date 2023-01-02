//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 61;
let erro = 0;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "A tradução 'meu gato' não serve para qual das frases a seguir?",
    options: ["きみのねこ", "わたしのねこ", "うちのねこ", "おれのねこ"],
    correct: "きみのねこ",
  },
  {
    id: "1",
    question: "Qual das alternativas seguintes não traz o nome de um animal em japonês?",
    options: ["うさぎ", "ことば", "くじら", "さかな"],
    correct: "ことば",
  },
  {
    id: "2",
    question: "Como se diz 'amanhã' em japonês?",
    options: ["がつ", "きょう", "きのう", "あした"],
    correct: "あした",
  },
  {
    id: "3",
    question: "Qual das palavras a seguir não é o nome de uma cor?",
    options: ["はいいろ", "ぎにろ", "きろ", "あお"],
    correct: "きろ",
  },
  {
    id: "4",
    question: "O que significa a palavra japonesa 'いたみ?'",
    options: ["Frio", "Felicidade", "Chuva", "Dor"],
    correct: "Dor",
  },
  {
    id: "5",
    question: "Qual dos termos a seguir não designa uma fruta?",
    options: ["すいか", "りんご", "もも", "いも"],
    correct: "いも",
  },
  {
    id: "6",
    question: "A palavra que não dá nome a uma estação do ano é:",
    options: ["はる", "かぜ", "なつ", "あき"],
    correct: "かぜ",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");

      if(erro < 3){
        document.getElementById("avatarerrofinal").src="../images/traducaogame/avatarerro/muitobom.png";
      }
      else if( erro >=3 && erro < 6){
          document.getElementById("avatarerrofinal").src="../images/traducaogame/avatarerro/otimo.png";
      }
  
      else if( erro >=6 && erro < 9){
          document.getElementById("avatarerrofinal").src="../images/traducaogame/avatarerro/bom.png";
      }
  
      else if( erro >=9 && erro < 12){
          document.getElementById("avatarerrofinal").src="../images/traducaogame/avatarerro/neutro.png"; 
      }
      else if( erro >=12 && erro < 15){
          document.getElementById("avatarerrofinal").src="../images/traducaogame/avatarerro/ruim.png";
      }
      else {
          document.getElementById("avatarerrofinal").src="../images/traducaogame/avatarerro/pessimo.png";
      }

      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 61;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
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

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
    
  }

  if(erro < 3){
    document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/muitobom.png";
  }
  else if( erro >=3 && erro < 6){
      document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/otimo.png";
  }

  else if( erro >=6 && erro < 9){
      document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/bom.png";
  }

  else if( erro >=9 && erro < 12){
      document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/neutro.png"; 
  }
  else if( erro >=12 && erro < 15){
      document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/ruim.png";
  }
  else {
      document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/pessimo.png";
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    erro++;
    if(erro < 3){
      document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/muitobom.png";
    }
    else if( erro >=3 && erro < 6){
        document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/otimo.png";
    }

    else if( erro >=6 && erro < 9){
        document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/bom.png";
    }

    else if( erro >=9 && erro < 12){
        document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/neutro.png"; 
    }
    else if( erro >=12 && erro < 15){
        document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/ruim.png";
    }
    else {
        document.getElementById("avatarerro").src="../images/traducaogame/avatarerro/pessimo.png";
    }
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  erro=0;
  count = 61;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
