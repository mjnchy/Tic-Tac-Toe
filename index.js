const makeGameBoard = (() => {
    return {
        Combos: [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ],

        range: [0,1,2,3,4,5,6,7,8],

        invalid: [],
        
        cells: document.querySelectorAll('.cell'),

        currentMark: (function () {
            let currentMark;
            let playerMark = prompt('Chose X or O');

            let inpValid = false;

            while(inpValid === false) {
                if (playerMark.toLocaleLowerCase() === 'x' || playerMark.toLocaleLowerCase() === 'o') {
                    inpValid = true;
                }

                else playerMark = prompt('Please Chose X or O');
            };

            playerMark === 'x'? currentMark = 'fa-xmark': currentMark = 'fa-o';
            return currentMark;
        })(),

        currentMarkSetter () {
            this.currentMark === 'fa-xmark'? this.currentMark = 'fa-o': this.currentMark = 'fa-xmark';
        },

        placeMarker (x) {
            if (this.gameLogic() === false) {
                x.classList.add('fa-solid', this.currentMark, 'checked');
                this.gameLogic() === false? this.currentMarkSetter(): null;
            };
        },

        pushPlayerIndex (x) {
            if (!this.invalid.includes(x)) {
                this.invalid.push(x);
                return true;
            }

            else return false;
        },

        gameLogic () {
            return this.Combos.some(array => array.every(item => this.cells[item].classList.contains(this.currentMark)))?
            true: false;
        }
    };
})();

const AI = (() => {
    return {
        range: makeGameBoard.range,
        invalid: makeGameBoard.invalid,

        makeAIMoveAndPush () {
            let randNum;

            while (!randNum) {
                const x = Math.floor(Math.random() * 9);
                if (!this.invalid.includes(x)) {
                    randNum = x;
                    this.invalid.push(randNum);
                    return randNum;
                }

                if (this.range.every(item => this.invalid.includes(item))) {
                    return false;
                };
            };
        },

        placeAIMarker () {
            setTimeout(() => {
                makeGameBoard.placeMarker(makeGameBoard.cells[this.makeAIMoveAndPush()]);
            }, 250)
        }
    }
})();


makeGameBoard.cells.forEach(cell => cell.addEventListener('click', (e) => {
    if (!e.target.classList.contains('checked')) {
        makeGameBoard.placeMarker(e.target);

    if (makeGameBoard.gameLogic() === false) {
        let cellIndex = Array.prototype.indexOf.call(makeGameBoard.cells, cell);

        makeGameBoard.pushPlayerIndex(cellIndex);
        AI.placeAIMarker();
    }
    }
}));