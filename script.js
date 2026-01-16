const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        const gameboard = document.querySelector("#gameboard");
        gameboard.innerHTML = "";

        board.forEach((value, index) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.id = index;
            square.textContent = value;
            square.addEventListener("click", Game.handleClick);
            gameboard.appendChild(square);
        });
    };

    const setMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const getBoard = () => board;

    return {
        render,
        setMark,
        reset,
        getBoard
    };
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const message = document.querySelector("#message");

    const start = () => {
        players = [
            createPlayer(player1.value || "Player 1", "X"),
            createPlayer(player2.value || "Player 2", "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        message.textContent = players[0].name + "'s turn (X)";
        Gameboard.reset();
        Gameboard.render();
    };

    const handleClick = (event) => {
        if (gameOver) return;

        const index = event.target.id;
        const currentPlayer = players[currentPlayerIndex];

        if (!Gameboard.setMark(index, currentPlayer.mark)) return;

        Gameboard.render();

        if (checkWinner()) {
            message.textContent = currentPlayer.name + " wins!";
            gameOver = true;
            return;
        }

        if (checkDraw()) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        switchPlayer();
        message.textContent =
            players[currentPlayerIndex].name +
            "'s turn (" +
            players[currentPlayerIndex].mark +
            ")";
    };

    const switchPlayer = () => {
        if (currentPlayerIndex === 0) {
            currentPlayerIndex = 1;
        } else {
            currentPlayerIndex = 0;
        }
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const mark = players[currentPlayerIndex].mark;

        if (
            (board[0] === mark && board[1] === mark && board[2] === mark) ||
            (board[3] === mark && board[4] === mark && board[5] === mark) ||
            (board[6] === mark && board[7] === mark && board[8] === mark) ||
            (board[0] === mark && board[3] === mark && board[6] === mark) ||
            (board[1] === mark && board[4] === mark && board[7] === mark) ||
            (board[2] === mark && board[5] === mark && board[8] === mark) ||
            (board[0] === mark && board[4] === mark && board[8] === mark) ||
            (board[2] === mark && board[4] === mark && board[6] === mark)
        ) {
            return true;
        }
        return false;
    };

    const checkDraw = () => {
        const board = Gameboard.getBoard();
        let filled = 0;

        board.forEach(cell => {
            if (cell !== "") {
                filled++;
            }
        });

        if (filled === 9) {
            return true;
        }
        return false;
    };

    return {
        start,
        handleClick
    };
})();

document.querySelector("#start-button").addEventListener("click", Game.start);
document.querySelector("#restart-button").addEventListener("click", Game.start);
