const board: string[] = ["", "", "", "", "", "", "", "", ""];
let currentPlayer: string = "X";
let gameover: boolean = false;

const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLDivElement>;
const message = document.querySelector(".message") as HTMLDivElement;

// Add event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = Number(cell.dataset.index);
    if (board[index] === "" && !gameover) {
      board[index] = currentPlayer;
      cell.innerText = currentPlayer;
      cell.classList.add(currentPlayer);
      if (checkWin(currentPlayer)) {
        gameover = true;
        message.innerText = `${currentPlayer} won!`;
      } else if (checkTie()) {
        gameover = true;
        message.innerText = "It's a tie!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        // message.innerText = `${currentPlayer}'s turn`;
      }
    }
  });
});

// Reset button
const resetButton = document.querySelector(".reset") as HTMLButtonElement;

resetButton.addEventListener("click", () => {
  board.fill("");
  currentPlayer = "X";
  gameover = false;

  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("X", "O");
  });

  // message.innerText = `${currentPlayer}'s turn`;
});

// check for win
function checkWin(player: string): boolean {
  // check rows
  for (let i = 0; i < 9; i += 3) {
    if (
      board[i] === player &&
      board[i + 1] === player &&
      board[i + 2] === player
    ) {
      updateScore(player === "X" ? "user" : "computer");
      return true;
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[i] === player &&
      board[i + 3] === player &&
      board[i + 6] === player
    ) {
      updateScore(player === "X" ? "user" : "computer");
      return true;
    }
  }

  // check diagonals
  if (board[0] === player && board[4] === player && board[8] === player) {
    updateScore(player === "X" ? "user" : "computer");
    return true;
  }
  if (board[2] === player && board[4] === player && board[6] === player) {
    updateScore(player === "X" ? "user" : "computer");
    return true;
  }

  return false;
}

// check for tie
function checkTie(): boolean {
  return !board.includes("");
}

// Initialize scores
let userScore: number = 0;
let computerScore: number = 0;
const userScoreElem = document.querySelector(".userScore") as HTMLDivElement;
const computerScoreElem = document.querySelector(
  ".computerScore"
) as HTMLDivElement;

// Update score function
const updateScore = (winner: string): void => {
  if (winner === "user") {
    userScore++;
  } else if (winner === "computer") {
    computerScore++;
  }
  userScoreElem.innerHTML = String(userScore);
  computerScoreElem.innerHTML = String(computerScore);
};

// Add event listener for reset button
resetButton.addEventListener("click", () => {
  board.fill("");
  currentPlayer = "X";
  gameover = false;

  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("X", "O");

    message.innerText = ``;
  });
});
