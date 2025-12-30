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

// 50 Questions Array
const questions = [
  // --- MATHEMATICS ---
  {
    question: "What is the value of x in the equation 2x + 15 = 35?",
    options: { A: "5", B: "10", C: "15", D: "20" },
    answer: "B"
  },
  {
    question: "In a right triangle, if the legs are 3 and 4, what is the length of the hypotenuse?",
    options: { A: "5", B: "6", C: "7", D: "25" },
    answer: "A"
  },
  {
    question: "What is the slope of a line defined by the equation y = -3x + 5?",
    options: { A: "5", B: "3", C: "-3", D: "1/3" },
    answer: "C"
  },
  {
    question: "Which of the following is a prime number?",
    options: { A: "9", B: "15", C: "21", D: "23" },
    answer: "D"
  },
  {
    question: "What is the sum of the interior angles of a quadrilateral?",
    options: { A: "180°", B: "270°", C: "360°", D: "540°" },
    answer: "C"
  },
  {
    question: "Solve for the area of a circle with a radius of 7 (use π = 22/7).",
    options: { A: "44", B: "49", C: "154", D: "196" },
    answer: "C"
  },
  {
    question: "If f(x) = x² - 5x + 6, what is f(2)?",
    options: { A: "0", B: "2", C: "4", D: "6" },
    answer: "A"
  },
  {
    question: "What is the median of the data set: 12, 15, 10, 20, 18?",
    options: { A: "12", B: "15", C: "18", D: "20" },
    answer: "B"
  },
  {
    question: "What is 25% of 200?",
    options: { A: "25", B: "40", C: "50", D: "75" },
    answer: "C"
  },
  {
    question: "Which property is shown by a(b + c) = ab + ac?",
    options: { A: "Commutative", B: "Associative", C: "Distributive", D: "Identity" },
    answer: "C"
  },
  {
    question: "Find the value of log₁₀(1000).",
    options: { A: "1", B: "2", C: "3", D: "10" },
    answer: "C"
  },
  {
    question: "What is the square root of 225?",
    options: { A: "13", B: "15", C: "25", D: "35" },
    answer: "B"
  },

  // --- SCIENCE ---
  {
    question: "Which organelle is known as the 'Powerhouse of the Cell'?",
    options: { A: "Nucleus", B: "Ribosome", C: "Mitochondria", D: "Vacuole" },
    answer: "C"
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: { A: "Ag", B: "Au", C: "Gd", D: "Fe" },
    answer: "B"
  },
  {
    question: "Which law of motion states that for every action, there is an equal and opposite reaction?",
    options: { A: "First Law", B: "Second Law", C: "Third Law", D: "Law of Gravity" },
    answer: "C"
  },
  {
    question: "What is the most abundant gas in the Earth's atmosphere?",
    options: { A: "Oxygen", B: "Carbon Dioxide", C: "Hydrogen", D: "Nitrogen" },
    answer: "D"
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: { A: "Venus", B: "Mars", C: "Jupiter", D: "Saturn" },
    answer: "B"
  },
  {
    question: "In the pH scale, a value of 2 is considered:",
    options: { A: "Strongly Acidic", B: "Weakly Acidic", C: "Neutral", D: "Basic" },
    answer: "A"
  },
  {
    question: "What is the process by which plants make their own food?",
    options: { A: "Respiration", B: "Fermentation", C: "Photosynthesis", D: "Transpiration" },
    answer: "C"
  },
  {
    question: "Which part of the human brain is responsible for balance and coordination?",
    options: { A: "Cerebrum", B: "Cerebellum", C: "Brainstem", D: "Thalamus" },
    answer: "B"
  },
  {
    question: "What is the speed of light in a vacuum?",
    options: { A: "300,000 km/s", B: "150,000 km/s", C: "500,000 km/s", D: "1,000,000 km/s" },
    answer: "A"
  },
  {
    question: "Which blood cells are responsible for fighting infections?",
    options: { A: "Red Blood Cells", B: "White Blood Cells", C: "Platelets", D: "Plasma" },
    answer: "B"
  },
  {
    question: "The boiling point of water at sea level in Celsius is:",
    options: { A: "90°C", B: "100°C", C: "110°C", D: "120°C" },
    answer: "B"
  },
  {
    question: "Who is the Father of Modern Genetics?",
    options: { A: "Charles Darwin", B: "Isaac Newton", C: "Gregor Mendel", D: "Albert Einstein" },
    answer: "C"
  },

  // --- FILIPINO ---
  {
    question: "Sino ang kinikilalang 'Ama ng Wikang Pambansa'?",
    options: { A: "Jose Rizal", B: "Andres Bonifacio", C: "Manuel L. Quezon", D: "Apolinario Mabini" },
    answer: "C"
  },
  {
    question: "Ano ang tawag sa mga salitang nagsasaad ng kilos o galaw?",
    options: { A: "Pangngalan", B: "Pandiwa", C: "Pang-uri", D: "Pangatnig" },
    answer: "B"
  },
  {
    question: "Alin sa mga sumusunod ang halimbawa ng pang-uri?",
    options: { A: "Mabilis", B: "Kumain", C: "Bata", D: "Doon" },
    answer: "A"
  },
  {
    question: "Sino ang may-akda ng 'Noli Me Tangere' at 'El Filibusterismo'?",
    options: { A: "Marcelo H. del Pilar", B: "Graciano Lopez Jaena", C: "Jose Rizal", D: "Francisco Balagtas" },
    answer: "C"
  },
  {
    question: "Ano ang kasalungat ng salitang 'Marunong'?",
    options: { A: "Matalino", B: "Mangmang", C: "Mabait", D: "Masipag" },
    answer: "B"
  },
  {
    question: "Ilang titik ang bumubuo sa makabagong alpabetong Filipino?",
    options: { A: "20", B: "26", C: "28", D: "30" },
    answer: "C"
  },
  {
    question: "Ano ang tawag sa isang mahabang salaysay na nahahati sa mga kabanata?",
    options: { A: "Maikling Kwento", B: "Nobela", C: "Tula", D: "Dula" },
    answer: "B"
  },
  {
    question: "Ano ang kahulugan ng 'balat-sibuyas'?",
    options: { A: "Matapang", B: "Madaling umiyak/sensitibo", C: "Masipag", D: "Maputi" },
    answer: "B"
  },
  {
    question: "Alin ang tamang baybay?",
    options: { A: "Relihyon", B: "Relehiyon", C: "Relihiyon", D: "Rilihiyon" },
    answer: "C"
  },
  {
    question: "Ano ang pambansang ibon ng Pilipinas?",
    options: { A: "Maya", B: "Agila ng Pilipinas", C: "Kalapati", D: "Pipit" },
    answer: "B"
  },
  {
    question: "Anong bahagi ng panalita ang 'at, ngunit, dahil'?",
    options: { A: "Pang-abay", B: "Pangatnig", C: "Pang-ukol", D: "Pantukoy" },
    answer: "B"
  },
  {
    question: "Sino ang may-akda ng tanyag na epikong 'Florante at Laura'?",
    options: { A: "Jose Corazon de Jesus", B: "Francisco Balagtas", C: "Lope K. Santos", D: "Severino Reyes" },
    answer: "B"
  },

  // --- ENVIRONMENT ---
  {
    question: "What is the primary cause of global warming?",
    options: { A: "Plastic pollution", B: "Greenhouse gas emissions", C: "Overfishing", D: "Earthquakes" },
    answer: "B"
  },
  {
    question: "What does the 3Rs of waste management stand for?",
    options: { A: "Read, Rise, Run", B: "Reduce, Reuse, Recycle", C: "Repair, Renew, Rebuild", D: "Recover, Refill, Remove" },
    answer: "B"
  },
  {
    question: "Which layer of the atmosphere protects us from harmful UV rays?",
    options: { A: "Troposphere", B: "Mesosphere", C: "Ozone Layer", D: "Exosphere" },
    answer: "C"
  },
  {
    question: "What is the term for the variety of life in a particular habitat or ecosystem?",
    options: { A: "Biohazard", B: "Biodiversity", C: "Biomass", D: "Biosphere" },
    answer: "B"
  },
  {
    question: "Which of the following is a renewable source of energy?",
    options: { A: "Coal", B: "Natural Gas", C: "Solar Power", D: "Nuclear Energy" },
    answer: "C"
  },
  {
    question: "The massive cutting down of trees is called:",
    options: { A: "Afforestation", B: "Deforestation", C: "Agriculture", D: "Horticulture" },
    answer: "B"
  },
  {
    question: "Which environmental law in the Philippines is also known as the Clean Air Act?",
    options: { A: "RA 8749", B: "RA 9003", C: "RA 9275", D: "RA 6969" },
    answer: "A"
  },
  {
    question: "What do you call the process of converting organic waste into fertilizer?",
    options: { A: "Incineration", B: "Landfilling", C: "Composting", D: "Pyrolysis" },
    answer: "C"
  },
  {
    question: "Which of the following is non-biodegradable?",
    options: { A: "Paper", B: "Banana peel", C: "Plastic bottle", D: "Dry leaves" },
    answer: "C"
  },
  {
    question: "What is the effect of excessive nutrients (like fertilizers) in bodies of water leading to algae bloom?",
    options: { A: "Eutrophication", B: "Erosion", C: "Evaporation", D: "Emulsification" },
    answer: "A"
  },
  {
    question: "Earth Day is celebrated globally every:",
    options: { A: "April 22", B: "June 5", C: "December 25", D: "January 1" },
    answer: "A"
  },
  {
    question: "What refers to the permanent change in the Earth's average temperature and weather patterns?",
    options: { A: "Weather forecast", B: "Climate Change", C: "Tidal wave", D: "El Niño" },
    answer: "B"
  },
  {
    question: "Which animal is endemic to the Philippines and is considered one of the smallest primates?",
    options: { A: "Panda", B: "Tarsier", C: "Lemur", D: "Orangutan" },
    answer: "B"
  },
  {
    question: "This phenomenon happens when the Earth's temperature rises because heat is trapped in the atmosphere.",
    options: { A: "Acid Rain", B: "Greenhouse Effect", C: "Tsunami", D: "Volcanic Eruption" },
    answer: "B"
  }
];
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

