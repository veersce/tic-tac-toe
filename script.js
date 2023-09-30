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
    let isFinished;

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
        let index = parseInt(event.target.className.slice(-1));
        if (gameboard.getGameboard()[index] !== '')
            return;
        gameboard.update(index, players[currentPlayerIndex].mark);
        gameboard.render();

        currentPlayerIndex = currentPlayerIndex === 1 ? 0 : 1;
    }

    return { start, handleClick }
})()

const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', () => Game.start())