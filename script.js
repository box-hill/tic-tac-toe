const Gameboard = (() => {
    let board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
    let state = 1; // 1 = waiting on player 1 input, 2 = P2 input, 3 = game end
    let winningLines = ['012','345','678','036','147','258','048','246'];
    
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
        function updateBoardArray(e){ // update the array based on data-index
            if(state === 3) return; // exit if game has ended;
            if(e.target.getAttribute('data-index') === null) return; // exit if not square click
            if(board[e.target.getAttribute('data-index')] != ' ') return; // exit if marker already placed
            board[e.target.getAttribute('data-index')] = (state === 1)?'O':'X';
            e.target.innerHTML = (state === 1)?'O':'X';
            state = (state === 1)?2:1;
            checkWin();
        }
        function checkWin(){
            for(let i=0; i<winningLines.length; i++){
                let markersOnLine = '';
                for(let j=0; j<3; j++){
                    let line = winningLines[i];
                    let index = parseInt(line.charAt(j));
                    markersOnLine += board[index];
                }
                if(markersOnLine === 'OOO'){
                    alert(`${player1.getName()} has won!`);
                    state = 3;
                    return;
                }
                else if(markersOnLine === 'XXX') {
                    alert(`${player2.getName()} has won!`);
                    state = 3;
                    return;
                }
            }
        }
    };

    const intialise = (() => {
        renderBoard();
        updateBoard();

    })();

    return {};
})();


const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return {getName, getSymbol};
};


let player1_name = prompt('Player 1 Name: ', 'Bob');
let player2_name = prompt('Player 2 Name:', 'Jeff');
let player1 = Player(player1_name, 'O');
let player2 = Player(player2_name, 'X');
