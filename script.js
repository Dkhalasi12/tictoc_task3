document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    const cells = [];

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
        cells.push(cell);

        cell.addEventListener('click', function() {
            if (gameState[i] === '' && gameActive) {
                gameState[i] = currentPlayer;
                cell.textContent = currentPlayer;
                checkGameStatus();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        });
    }

    // Function to check if there's a winner or if the game is a draw
    function checkGameStatus() {
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

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                // Display winning message
                status.textContent = `Player ${gameState[a]} wins!`;

                // Add class for celebration animation
                board.classList.add('celebrate');

                gameActive = false;
                return;
            }
        }

        if (!gameState.includes('')) {
            status.textContent = "It's a draw!";
            gameActive = false;
            return;
        }
    }

    // Event listener for restart button
    restartButton.addEventListener('click', function() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
        board.classList.remove('celebrate'); // Remove celebration class
    });

    // Reset game when animation ends
    board.addEventListener('animationend', function() {
        board.classList.remove('celebrate');
    });
});
