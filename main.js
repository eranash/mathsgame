let startResetEl = document.getElementById("startreset");
startResetEl.addEventListener("click", () => {
  checkgameIsOn();
});

let box;
let gameIsOn = false;
let score;
let initialCountdownValue;
let myCounter;
let correctAnswer;
let scoreSpanEl = document.getElementById("scorevalue");


function checkgameIsOn() {
  if (gameIsOn === true) {
    location.reload();
  } else {
    gameIsOn = true;
    score = 0;
    scoreSpanEl.innerHTML = score;
    show("timeremaining");
    hide("gameover");
    initialCountdownValue = 60;
    startResetEl.innerHTML = "reset game";
    startCounter();
    generateQNA();
  }

  function startCounter() {
    let countdownValueEl = document.getElementById("timeremainingvalue");
    myCounter = setInterval(() => {
      initialCountdownValue--;
      countdownValueEl.innerHTML = initialCountdownValue;
      if (initialCountdownValue == 0) {
        stopCounter();
      }
    }, 1000);
  }
}

function stopCounter() {
  clearInterval(myCounter);
  gameOver();
}

function gameOver() {
  let gameOverModal = document.getElementById("gameover");
  gameOverModal.innerHTML = `<p>game over!!</p><p>your score is ${score}</p>`;
  show("gameover");
  hide("timeremaining");
  hide("correct");
  hide("wrong");
  gameIsOn = false;
  startResetEl.innerHTML = "start game";
}

function generateQNA() {
  let num1 = Math.ceil(Math.random() * 10);
  let num2 = Math.ceil(Math.random() * 10);
  correctAnswer = num1 * num2;
  console.log(correctAnswer);
  let questionEl = document.getElementById("question");
  questionEl.innerHTML = `${num1} x ${num2}`;
  let correctBox = Math.ceil(Math.random() * 4);
  let correctBoxEl = document.getElementById(`box${correctBox}`);
  correctBoxEl.innerHTML = correctAnswer;
  let answers = [correctAnswer];
  for (let i = 1; i < 5; i++) {
    if (i != correctBox) {
      let wrongAnswer;
      do {
        wrongAnswer =
          Math.ceil(Math.random() * 10) * Math.ceil(Math.random() * 10);
      } while (answers.indexOf(wrongAnswer) > -1);

      let wrongBoxsEl = document.getElementById(`box${i}`);
      wrongBoxsEl.innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}

for (let i=1; i<5; i++){
    document.getElementById(`box${i}`).onclick = ()=>{
        if (gameIsOn==true) {
            if (this.innerHTML==correctAnswer){
                console.log(this.innerHTML);
                score++;
                scoreSpanEl.innerHTML = score;
                show('correct');
                hide('wrong');
                setTimeout(()=>{
                    hide('correct');
                },1000);
                generateQNA();
            
            } else {
                show('wrong');
                hide('correct');
                setTimeout(()=>{
                    hide('wrong');
                },1000);
            }
          }
    }
}

// function checkInPlay() {
  
// }

// function checkIfCorrect() {

// }

function hide(idx) {
  document.getElementById(idx).style.display = "none";
}

function show(idx) {
  document.getElementById(idx).style.display = "block";
}
