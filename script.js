const board = document.querySelector('.game-board');
const msgBox = document.querySelector('.message');
const msgBoxCont = document.querySelector('.msg-container');
const newButton = document.querySelector('.new-button');
const resetButton = document.querySelector('.reset-button');

const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const tieSound = document.getElementById('tie-sound');

const arr = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

for (let i = 0; i < 9; i++) {
    const box = document.createElement('button');
    box.setAttribute('class', 'box');
    board.appendChild(box);
}

const boxArray = document.querySelectorAll('.box');
let flag = true;
let moves = 0;

boxArray.forEach(box => {
    box.addEventListener('click', () => {
        if (box.innerText === '') {
            clickSound.play();
            box.innerText = flag ? 'X' : 'O';
            flag = !flag;
            box.disabled = true;
            moves++;
            checkWin(moves);
        }
    });
});

const disableBox = () => {
    boxArray.forEach(box => (box.disabled = true));
};

const enableBox = () => {
    boxArray.forEach(box => (box.disabled = false));
};

const stopAllSounds = () => {
    clickSound.pause();
    winSound.pause();
    loseSound.pause();
    tieSound.pause();
    clickSound.currentTime = 0;
    winSound.currentTime = 0;
    loseSound.currentTime = 0;
    tieSound.currentTime = 0;
};

newButton.addEventListener('click', () => {
    msgBoxCont.classList.add('hide');
    flag = true;
    boxArray.forEach(box => {
        box.innerText = '';
        box.classList.remove('winner');
    });
    enableBox();
    moves = 0;
    stopAllSounds()
});

resetButton.addEventListener('click', () => {
    msgBoxCont.classList.add('hide');
    flag = true;
    boxArray.forEach(box => {
        box.innerText = '';
        box.classList.remove('winner');
    });
    enableBox();
    moves = 0;
    stopAllSounds()
});

const checkWin = (moves) => {
    let flag = false;
    arr.forEach(combo => {
        let [a, b, c] = combo;
        if (
            boxArray[a].innerText &&
            boxArray[a].innerText === boxArray[b].innerText &&
            boxArray[a].innerText === boxArray[c].innerText
        ) {
            showWinner(boxArray[a].innerText);
            boxArray[a].classList.add('winner');
            boxArray[b].classList.add('winner');
            boxArray[c].classList.add('winner');
            flag = true;
        }
    });
    if (!flag && moves === 9) {
        tieSound.play();
        msgBox.innerText = `No Winner. Play Again`;
        msgBoxCont.classList.remove('hide');
    }
};

const showWinner = winner => {
    msgBox.innerText = `Congratulations: ${winner} is the Winner!`;
    msgBoxCont.classList.remove('hide');
    disableBox();
    winSound.play();
};

// Winner animation
const winnerAnimation = document.createElement('style');
winnerAnimation.innerHTML = `
  @keyframes winner {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .winner {
    animation: winner 0.5s ease-in-out infinite;
  }
`;
document.head.appendChild(winnerAnimation);
