const board = document.querySelector('.game-board');
const msgBox = document.querySelector('.message');
const msgBoxCont = document.querySelector('.msg-container')
const newButton = document.querySelector('.new-button');
const resetButton = document.querySelector('.reset-button');

const arr = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

for(let i=0; i<9; i++) {
    const box = document.createElement('button');
    box.setAttribute('class', 'box');
    board.appendChild(box)
}
const boxArray = document.querySelectorAll('.box');
let flag = true;

boxArray.forEach(box => {
    box.addEventListener(('click'), () => {
        if(flag) {
            box.innerText = 'X';
        }
        else {
            box.innerText = 'O'
        }
        flag = !flag
        box.disabled = 'true'
        checkWin(); 
        const a = checkTie();
        if(a){
            msgBox.innerText = `No Winner. Play Again`;
            msgBoxCont.classList.remove('hide')
        }
    })
})

const checkTie = () => {
    let tie = true;
    for(let box of boxArray) {
        if(box.innerText == ''){
            tie=false;
        }
    }
    return tie;
}

const disableBox = () => {
    for(let box of boxArray) {
        box.disabled = true;
    }
}
const enableBox = () => {
    for(let box of boxArray) {
        box.disabled = false;
    }
}
newButton.addEventListener(('click'), () => {
    msgBoxCont.classList.add('hide');
    flag = true;
    boxArray.forEach((box) => {
        box.innerText = '';
    })
    enableBox();
})

resetButton.addEventListener(('click'), () => {
    msgBoxCont.classList.add('hide');
    flag = true;
    boxArray.forEach((box) => {
        box.innerText = '';
    })
    enableBox();
})

const checkWin = () => {
    arr.forEach(arr => {
        let pos1 = boxArray[arr[0]].innerText;
        let pos2 = boxArray[arr[1]].innerText;
        let pos3 = boxArray[arr[2]].innerText;

        if(pos1 != '' && pos2 != '' && pos3 != '') {
            if(pos1 == pos2 && pos2 == pos3) {
                showWinner(pos1);
            }
        }
    });
}

const showWinner = (winner) => {
    msgBox.innerText = `Congratulations: ${winner} is the Winner`;
    msgBoxCont.classList.remove('hide')
    disableBox();
}
