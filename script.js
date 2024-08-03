const submitBtn = document.querySelector("#submitBtn");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restart-Btn");
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let running = false;
let player1, player2;

submitBtn.addEventListener("click", () => {
    const form = document.querySelector(".form");
    form.style.display = "none";
    const player1Username = document.getElementById("player1-name").value;
    const player2Username = document.getElementById("player2-name").value;
    player1 = createPlayer(player1Username, "X", 0);
    player2 = createPlayer(player2Username, "O", 0);
    currentPlayer = player1;
    document.getElementById("player1-username").textContent = player1.name;
    document.getElementById("player2-username").textContent = player2.name;
    document.getElementById("player1-score").textContent = `Score: ${player1.score}`;
    document.getElementById("player2-score").textContent = `Score: ${player2.score}`;
    document.getElementById("status").textContent = `${currentPlayer.name}'s turn`;
    startGame();
});

const createPlayer = function(name, mark, score) {
    return { name, mark, score };
};

function startGame() {
    running = true;
    cells.forEach(cell => cell.addEventListener("click", clickHandler));
}

function clickHandler() {
    const cellIndex = this.getAttribute("cellIndex");
    if (gameBoard[cellIndex] !== "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    gameBoard[index] = currentPlayer.mark;
    cell.textContent = currentPlayer.mark;
    if (running) {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        document.getElementById("status").textContent = `${currentPlayer.name}'s turn`;
    }
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const [a, b, c] = [gameBoard[condition[0]], gameBoard[condition[1]], gameBoard[condition[2]]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        running = false;
        const winner = currentPlayer === player1 ? player2 : player1;
        winner.score++;
        updateScores();
        document.getElementById("status").textContent = `${winner.name} is the Winner!`;
    } else if (!gameBoard.includes("")) {
        running = false;
        document.getElementById("status").textContent = "It's a tie!";
    }
}

function updateScores() {
    document.getElementById("player1-score").textContent = `Score: ${player1.score}`;
    document.getElementById("player2-score").textContent = `Score: ${player2.score}`;
}

restartBtn.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = player1;
    running = true;
    document.getElementById("status").textContent = `${currentPlayer.name}'s turn`;
});

