const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameover = false;

const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");


// Add event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = cell.dataset.index;
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
        message.innerText = `${currentPlayer}'s turn`;
      }
    }
  });
});

// Reset button
const resetButton = document.querySelector(".reset");

resetButton.addEventListener("click", () => {
  board.fill("");
  currentPlayer = "X";
  gameover = false;

  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("X", "O");
  });

  message.innerText = `${currentPlayer}'s turn`;
});

// check for win
function checkWin(player) {
  // check rows
  for (let i = 0; i < 9; i += 3) {
    if (
      board[i] === player &&
      board[i + 1] === player &&
      board[i + 2] === player
    ) {
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
      return true;
    }
  }

  // check diagonals
  if (board[0] === player && board[4] === player && board[8] === player) {
    return true;
  }
  if (board[2] === player && board[4] === player && board[6] === player) {
    return true;
  }

  return false;
}

// check for tie
function checkTie() {
  return !board.includes("");
}
