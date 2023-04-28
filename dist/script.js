"use strict";
var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameover = false;
var cells = document.querySelectorAll(".cell");
var message = document.querySelector(".message");
// Add event listener to each cell
cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        var index = Number(cell.dataset.index);
        if (board[index] === "" && !gameover) {
            board[index] = currentPlayer;
            cell.innerText = currentPlayer;
            cell.classList.add(currentPlayer);
            if (checkWin(currentPlayer)) {
                gameover = true;
                message.innerText = "".concat(currentPlayer, " won!");
            }
            else if (checkTie()) {
                gameover = true;
                message.innerText = "It's a tie!";
            }
            else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                // message.innerText = `${currentPlayer}'s turn`;
            }
        }
    });
});
// Reset button
var resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", function () {
    board.fill("");
    currentPlayer = "X";
    gameover = false;
    cells.forEach(function (cell) {
        cell.innerText = "";
        cell.classList.remove("X", "O");
    });
    // message.innerText = `${currentPlayer}'s turn`;
});
// check for win
function checkWin(player) {
    // check rows
    for (var i = 0; i < 9; i += 3) {
        if (board[i] === player &&
            board[i + 1] === player &&
            board[i + 2] === player) {
            updateScore(player === "X" ? "user" : "computer");
            return true;
        }
    }
    // check columns
    for (var i = 0; i < 3; i++) {
        if (board[i] === player &&
            board[i + 3] === player &&
            board[i + 6] === player) {
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
function checkTie() {
    return !board.includes("");
}
// Initialize scores
var userScore = 0;
var computerScore = 0;
var userScoreElem = document.querySelector(".userScore");
var computerScoreElem = document.querySelector(".computerScore");
// Update score function
var updateScore = function (winner) {
    if (winner === "user") {
        userScore++;
    }
    else if (winner === "computer") {
        computerScore++;
    }
    userScoreElem.innerHTML = String(userScore);
    computerScoreElem.innerHTML = String(computerScore);
};
// Add event listener for reset button
resetButton.addEventListener("click", function () {
    board.fill("");
    currentPlayer = "X";
    gameover = false;
    cells.forEach(function (cell) {
        cell.innerText = "";
        cell.classList.remove("X", "O");
        message.innerText = "";
    });
});
