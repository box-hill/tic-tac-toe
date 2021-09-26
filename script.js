// gameboard object
// properties like board (array of length 9)

const Gameboard = (() => {
    let board = ['X',' ',' ',' ',' ',' ',' ',' ',' '];
    let state = 1; // 1 = waiting on player 1 input, 2 = P2 input
    
    const renderBoard = () => { // IIFE to render board for now
        // create the container for the board
        const boardContainer = document.createElement('div');
        boardContainer.setAttribute("id", "board");
        
        // add the squares
        for(let i = 0; i < 9; i++){
            const square = document.createElement('div');
            square.classList.add('square');
            square.innerHTML = board[i];
            square.setAttribute('data-index', i);
            boardContainer.appendChild(square);
        }
        // add container with squares to body
        const body = document.querySelector('body');
        body.appendChild(boardContainer);
    };

    const updateBoard = () => {
        // get the correct square data attribute
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => addEventListener('click', updateBoardArray));
        squares.forEach(square => console.log(square));
        function updateBoardArray(e){ // update the array based on data-index
            if(e.target.getAttribute('data-index') === null) return; // exit if not square click
            
            board[e.target.getAttribute('data-index')] = 'O';
            e.target.innerHTML = 'O';
        }
    };

    const intialise = (() => {
        renderBoard();
        updateBoard();

    })();

    return {renderBoard,board};
})();

// player object should have private names.
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return {getName, getSymbol};
};


let player1_name = prompt('Player 1 Name: ', 'Bob');
let player2_name = prompt('Player 2 Name:', 'Bob');
let player1 = Player()