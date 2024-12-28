const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(clickedCell, clickedCellIndex) {
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    alert(`Player ${currentPlayer} has won!`); // Pop-up alert for the winner
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    alert("Game ended in a draw!"); // Pop-up alert for draw
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerText = `It's Player ${currentPlayer}'s turn`;
}

function handleReset() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerText = `It's Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.innerText = ""));
}

cells.forEach((cell) => {
  cell.addEventListener("click", () =>
    handleCellClick(cell, cell.getAttribute("data-index"))
  );
});

resetButton.addEventListener("click", handleReset);
statusDisplay.innerText = `It's Player ${currentPlayer}'s turn`;
