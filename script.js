const buttons = document.querySelectorAll("button[data-choice]");
const resultText = document.getElementById("result");

const userScoreText = document.getElementById("userScore");
const computerScoreText = document.getElementById("computerScore");
const resetBtn = document.getElementById("reset");
const history = document.getElementById("history");

// Sounds
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const drawSound = document.getElementById("drawSound");

// Game state
let userScore = 0;
let computerScore = 0;

const choices = ["rock", "paper", "scissors"];

// Button click
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (userScore === 5 || computerScore === 5) {
      resultText.textContent = "Game over! Reset to play again 🔄";
      return;
    }

    const userChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);

    resultText.textContent = `
You chose ${userChoice},
Computer chose ${computerChoice}.
${result}
    `;

    // History
    const li = document.createElement("li");
    li.textContent = `You: ${userChoice} | Computer: ${computerChoice}`;
    history.prepend(li);
  });
});

// Computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Result logic
function getResult(user, computer) {
  if (user === computer) {
    drawSound.play();
    return "It's a draw 😐";
  }

  if (rules[user] === computer) {
    userScore++;
    userScoreText.textContent = userScore;
    winSound.play();

    if (userScore === 5) return "🎉 YOU WON THE GAME!";
    return "You win 🎉";
  }

  computerScore++;
  computerScoreText.textContent = computerScore;
  loseSound.play();

  if (computerScore === 5) return "💻 COMPUTER WON THE GAME!";
  return "Computer wins 💻";
}

// Reset game
resetBtn.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;
  userScoreText.textContent = 0;
  computerScoreText.textContent = 0;
  history.innerHTML = "";
  resultText.textContent = "Game reset. Make your move 🎮";
});
