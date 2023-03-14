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

        currentMark: 'fa-xmark',

        cells: document.querySelectorAll('.cell'),

        currentMarkSetter () {
            this.currentMark === 'fa-xmark'? this.currentMark = 'fa-o': this.currentMark = 'fa-xmark';
        },

        placeMarker (x) {
            if (!x.classList.contains('checked') && this.gameLogic() === false) {
                x.classList.add('fa-solid', this.currentMark, 'checked');
            };
        },

        gameLogic () {
            return this.Combos.some(array => array.every(item => this.cells[item].classList.contains(this.currentMark)))?
            true: false;
        }
    };
})();

makeGameBoard.cells.forEach(cell => cell.addEventListener('click', (e) => {
    makeGameBoard.placeMarker(e.target);
    makeGameBoard.gameLogic();
    makeGameBoard.gameLogic() === false? makeGameBoard.currentMarkSetter(): null;
}));