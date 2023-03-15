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

        currentMark: 'fa-xmark',

        cells: document.querySelectorAll('.cell'),

        currentMarkSetter () {
            this.currentMark === 'fa-xmark'? this.currentMark = 'fa-o': this.currentMark = 'fa-xmark';
        },

        placeMarker (x) {
            if (!x.classList.contains('checked') && this.gameLogic() === false) {
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
                let x = Math.floor(Math.random() * 9);
                if (!this.invalid.includes(x)) {
                    randNum = x;
                    this.invalid.push(x);
                    console.log(x);
                }

                else if (this.range.every(item => this.invalid.includes(item))) break;
                return randNum;
            }
        },

        placeAIMarker () {
            makeGameBoard.placeMarker(makeGameBoard.cells[this.makeAIMoveAndPush()]);
        }
    }
})();


makeGameBoard.cells.forEach(cell => cell.addEventListener('click', (e) => {
    makeGameBoard.placeMarker(e.target);

    if (makeGameBoard.gameLogic() === false) {
        let cellIndex = Array.prototype.indexOf.call(makeGameBoard.cells, cell);

        makeGameBoard.pushPlayerIndex(cellIndex);
        AI.placeAIMarker();
    }
}));