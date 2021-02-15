const ticTactoe = new TicTacToe();
ticTactoe.start();

function TicTacToe(){
    const board  = new Board();
    const pHuman = new Phuman(board);
    const pCom   = new Pcom(board);
    let turn = 0;
    
    this.start = function(){
        const config = { childList: true };
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
    }

    function takeTurn(){
        if(board.checkWinner()){
            return;
        }

        if(turn %2 == 0){
            pHuman.takeTurn();
        }
        else
            pCom.takeTurn();
        turn++;
    }
}

function Board(){
    this.positions = Array.from(document.querySelectorAll('.col'));

    this.checkWinner = function(){
        let winner = false;
        const winningChoice = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [0, 4, 8],
            [2, 4, 6],
            [1, 4, 7],
            [2, 5, 8],
        ];

        const positions = this.positions;

        winningChoice.forEach((winningStack) => {
            const pos0InnerText = positions[winningStack[0]].innerText;
            const pos1InnerText = positions[winningStack[1]].innerText;
            const pos2InnerText = positions[winningStack[2]].innerText;
            
            if(pos0InnerText == 'O' && pos0InnerText == pos1InnerText && pos1InnerText == pos2InnerText){
                winner = true;
                document.getElementById("result").innerHTML = "You win";
            }
            else if(pos0InnerText == 'X' && pos0InnerText == pos1InnerText && pos1InnerText == pos2InnerText){
                winner = true;
                document.getElementById("result").innerHTML = "Computer win";
            }
        });
        
        return winner;
    }
}

function Pcom(board){

    this.takeTurn = function(){
        let availablePositions = board.positions.filter((p) => p.innerText == '');
        const move = Math.floor(Math.random() * (availablePositions.length - 0));
        availablePositions[move].innerText = 'X';
    }
}

function Phuman(board){

    this.takeTurn = function(){
        board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
    }

    function handleTurnTaken(event){
        event.target.innerText = 'O';
        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
    }
}