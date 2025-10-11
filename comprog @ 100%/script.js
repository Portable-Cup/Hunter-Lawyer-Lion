let playerScore = 0;
let computerScore = 0;

// 🎵 Sounds
const introMusic = new Audio("intro.mp3");
introMusic.loop = true;
const clickSound = new Audio("click.mp3");
const gameWinSound = new Audio("win.mp3");
const gameLoseSound = new Audio("lose.mp3");

gameWinSound.addEventListener("play", () => introMusic.pause());
gameWinSound.addEventListener("ended", () => introMusic.play());
gameLoseSound.addEventListener("play", () => introMusic.pause());
gameLoseSound.addEventListener("ended", () => introMusic.play());

function startGame() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("game").style.display = "flex";
  if (introMusic.paused) introMusic.play();
}

function showRules() {
  document.getElementById("rules-modal").style.display = "block";
}

function closeRules() {
  document.getElementById("rules-modal").style.display = "none";
}

function goBack() {
  document.getElementById("game").style.display = "none";
  document.getElementById("intro").style.display = "flex";
  resetGame();
}

// 20 Questions Array
const questions = [
  {
    question: "Under Rule 14, the requirements for registration as Professional Electrical Engineer are the following except",
    options: { A: "Prof of Philippine Citizenship", B: "Baptismal Certificate", C: "NBI clearance", D: "Valid Professional License as REE" },
    answer: "B"
  },
  {
    question: "The current chapter president of IIEE-Albay Legazpi",
    options: { A: "Engr. Kim Arvin P. Leocadio", B: "Engr. Alwin M. Lunas", C: "Engr. Sienna M. Llamera", D: "Engr. Garry V. Hilutin" },
    answer: "C"
  },
  {
    question: "The element of obligation who is a possessor of a right and whose favor the obligation is constituted.",
    options: { A: "passive subject", B: "object", C: "efficient clause", D: "active subject" },
    answer: "D"
  },
  {
    question: "The current Vice-President for Research, Development and Extension of Bicol University?",
    options: { A: "Dr. Lany L. Maceda", B: "Dr. Luis O. Amano", C: "Dr. Marissa N. Estrella", D: "Dr. Benedicto B. Balilo Jr" },
    answer: "A"
  },
  {
    question: "EPIRA is divided into 4 sectors namely, generation, transmission, distribution and",
    options: { A: "End user", B: "supply", C: "collection", D: "system operated" },
    answer: "B"
  },
  {
    question: "Qualified as the Chairman of the CPD Council for Electrical Engineering?",
    options: { A: "PRC Commissioner", B: "Representative from Academy", C: "PRBEE Board Member", D: "Representative from APO" },
    answer: "C"
  },
  {
    question: "Delinquent REE/RME/PEE not allowed to practice if unpaid for how many years?",
    options: { A: "3", B: "4", C: "5", D: "6" },
    answer: "C"
  },
  {
    question: "Minimum age for Registered Master Electrician exam under RA 7920?",
    options: { A: "18", B: "21", C: "25", D: "16" },
    answer: "A"
  },
  {
    question: "An Electrical Engineer must state known limitations of his work under?",
    options: { A: "Article II, Section 1", B: "Article II, Section 2", C: "Article II, Section 3", D: "Article II, Section 4" },
    answer: "D"
  },
  {
    question: "Who was BEE Chair when Code of Ethics (RA 7920) was approved?",
    options: { A: "Engr. Roy F. Gil", B: "Engr. Rafael F. Florentino", C: "Engr. Paul Woo", D: "Engr. Gerardo Gaur" },
    answer: "B"
  },
  {
    question: "How many academic units does Bicol University have?",
    options: { A: "21", B: "17", C: "19", D: "16" },
    answer: "A"
  },
  {
    question: "Bicol University is ISO certified?",
    options: { A: "ISO/IEC 27001:2022", B: "ISO 9001:2015", C: "ISO 14001:2015", D: "ISO 50001" },
    answer: "B"
  },
  {
    question: "BU President Dr. Nebres III formally invested on?",
    options: { A: "June 21, 2023", B: "June 14, 2023", C: "March 09, 2023", D: "March 31, 2023" },
    answer: "B"
  },
  {
    question: "Entity established by ERC to monitor Philippine Grid Code compliance?",
    options: { A: "PDC", B: "GMC", C: "DMC", D: "PGC" },
    answer: "B"
  },
  {
    question: "IIEE was SEC registered on?",
    options: { A: "Sept 15, 1969", B: "Sept 15, 1975", C: "Sept 15, 1971", D: "Sept 15, 1973" },
    answer: "B"
  },
  {
    question: "Law that restructured the electric power industry?",
    options: { A: "RA 7920", B: "RA 9136", C: "RA 8981", D: "RA 10912" },
    answer: "B"
  },
  {
    question: "What alert is raised if a storm enters PAR within 24 hours?",
    options: { A: "Orange Alert", B: "Yellow Alert", C: "Red Alert", D: "Blue Alert" },
    answer: "D"
  },
  {
    question: "RA 7920 Board of Electrical Engineering composition?",
    options: { A: "Three members and a chairman", B: "Two members and chairman", C: "Two members", D: "Three members" },
    answer: "B"
  },
  {
    question: "ACPE stands for?",
    options: { A: "Asean Chartered Practice Engineer", B: "Asean Chartered Professional Engineer", C: "Asean Committee for Professional Engineer", D: "Asean Chartered in Professional Engineer" },
    answer: "B"
  },
  {
    question: "First National President of IIEE?",
    options: { A: "Arturo L. Lopez", B: "Gregorio M. Sadorra", C: "Luis L. Mendoza", D: "Salvador H. Dulog" },
    answer: "A"
  }
];

let currentQuestion = null;

function play(playerChoice) {
  clickSound.play();
  const choices = ["rock", "paper", "scissors"];
  const resultDiv = document.getElementById("result");
  const computerDiv = document.getElementById("computer-choice");

  resultDiv.innerText = "Waiting for computer...";
  computerDiv.innerHTML = "";
  hideQuestion();

  setTimeout(() => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const nameMap = { rock: "Hunter", paper: "Lawyer", scissors: "Lion" };
    const imageSrcMap = { rock: "hunter.png", paper: "lawyer.png", scissors: "lion.png" };

    computerDiv.innerHTML = `
      <p>Computer chose: ${nameMap[computerChoice]}</p>
      <img src="${imageSrcMap[computerChoice]}" alt="${nameMap[computerChoice]}" class="computer-img" />
    `;

    let result = "";
    if (playerChoice === computerChoice) {
      result = "It's a draw!";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "scissors" && computerChoice === "paper") ||
      (playerChoice === "paper" && computerChoice === "rock")
    ) {
      result = "You win!";
      playerScore++;
    } else {
      result = "Computer wins!";
      computerScore++;
      showRandomQuestion(); // Only show question if computer wins
    }

    resultDiv.innerText = result;
    updateScore();
    checkGameOver();
  }, 1000);
}

function updateScore() {
  document.getElementById("player-score").innerText = playerScore;
  document.getElementById("computer-score").innerText = computerScore;
}

function checkGameOver() {
  const resultDiv = document.getElementById("result");
  if (playerScore >= 10) {
    resultDiv.innerText = "🎉 Congratulations, you win!";
    gameWinSound.play();
    showPlayAgain();
  } else if (computerScore >= 10) {
    resultDiv.innerText = "😢 Sorry, try again!";
    gameLoseSound.play();
    showPlayAgain();
  }
}

function showPlayAgain() {
  document.getElementById("play-again").style.display = "block";
  hideQuestion();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  document.getElementById("result").innerText = "";
  document.getElementById("computer-choice").innerHTML = "";
  document.getElementById("play-again").style.display = "none";
  hideQuestion();
}

function showRandomQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
  currentQuestion = q;
  document.getElementById("question-container").style.display = "block";
  document.getElementById("question-text").innerText = q.question;

  const choices = ["A", "B", "C", "D"];
  const buttons = choices.map(letter => 
    `<button onclick="checkAnswer('${letter}')">${letter}. ${q.options[letter]}</button>`
  ).join("");

  document.getElementById("question-text").innerHTML += `<div>${buttons}</div>`;
  document.getElementById("feedback").innerText = "";
}

function hideQuestion() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("feedback").innerText = "";
}

function checkAnswer(answer) {
  const feedback = document.getElementById("feedback");

  if (!currentQuestion) return;

  if (answer === currentQuestion.answer) {
    feedback.innerText = "✅ Correct!";
    feedback.style.color = "green";
    playerScore++;
  } else {
    feedback.innerText = "❌ Try again!";
    feedback.style.color = "red";
    computerScore++;
  }

  updateScore();
  currentQuestion = null;
  checkGameOver();
  setTimeout(hideQuestion, 2000);
}
