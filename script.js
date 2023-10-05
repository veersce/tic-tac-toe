const gameboard = (() => {
    let fields = ['', '', '', '', '', '', '', '', ''];
    let gameboardEl = document.querySelector('.game-board');

    const render = () => {
        gameboardEl.innerHTML = "";
        for (index in fields) {
            let newField = document.createElement('div');
            newField.innerHTML = `<p class="field index-${index}">${fields[index]}</p>`
            gameboardEl.appendChild(newField);
            bindListeners();
        }
    };

    const update = (index, mark) => {
        fields[index] = mark;
    }

    const bindListeners = () => {
        const fields = document.querySelectorAll('.field')
        fields.forEach((field) => {
            field.addEventListener('click', Game.handleClick);
        })
    }

    const getGameboard = () => fields;
    return { render, update, getGameboard };
})();

const playerFactory = (name, mark) => {
    return { name, mark };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let isFinished = false;

    const start = () => {
        players = [
            playerFactory(document.querySelector(".player1.nickname").value, "O"),
            playerFactory(document.querySelector(".player2.nickname").value, "X")
        ]
        currentPlayerIndex = 0;
        isFinished = false;
        gameboard.render();
    }

    const handleClick = (event) => {
        if(isFinished){
            return;
        }
        let index = parseInt(event.target.className.slice(-1));
        if (gameboard.getGameboard()[index] !== '')
            return;
        gameboard.update(index, players[currentPlayerIndex].mark);
        gameboard.render();

        if(checkForWin(gameboard.getGameboard(), players[currentPlayerIndex].mark)){
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins!`);
            isFinished = true;
        } else if(checkForTie(gameboard.getGameboard())){
            displayController.renderMessage("Tie!")
            isFinished = true;
        }

        currentPlayerIndex = currentPlayerIndex === 1 ? 0 : 1;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            gameboard.update(i,'');
        }
        gameboard.render();
        isFinished  = false;
        currentPlayerIndex = 0;
        displayController.renderMessage("");
    }

    const checkForWin = (board) =>{
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i =0; i < winningCombinations.length;i++){
            const [a,b,c] = winningCombinations[i]
            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                return true;
            }
        }
    }

    const checkForTie = (board) =>{
        return board.every(cell => cell !== "")
    }

    return { start, handleClick, restart }
})()

const displayController = (() =>{
    const renderMessage= (message) => {
        document.querySelector('.winner-msg').innerHTML = message;
    }
    return{
        renderMessage
    }
})()

const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', () => Game.start())

const restartBtn = document.querySelector('.restart-btn');
restartBtn.addEventListener('click', ()=> Game.restart())