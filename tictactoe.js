const player = {
    p1: "X",
    gamePlaying: true,
    roundWon: false,
    gameState: ['','','','','','','','',''],
    winningConditions : [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
}
const statusDisplay = document.querySelector('.game-status');


const winningMessage = () => `Player ${player.p1} has won!`;
const drawMessage = () => `Game ended as a draw!`;
const currentPlayerTurn = () => `It's ${player.p1}'s turn`;

//write a function to display X on the grid
function updatePlay(clickedCellIndex, target){
/*
Next up we need to check whether the call has already been played,
or if the game is paused. If either of those is true we will simply ignore the click.
*/
    if (player.gameState[clickedCellIndex] !== '' || !player.gamePlaying) {
        return;
    }   

    target.innerHTML = player.p1;
    
    player.gameState[clickedCellIndex] = player.p1;

    //nextPlayer Function
    nextPlayer();
    // i should be able to store the clickedcellindex
}

function nextPlayer(){
   /*if(player.p1 === 'X'){
       player.p1 = 'O';
   }
   else{
       player.p1 = 'X';
   }*/
  

    gameValidation();
    
    

   //console.log(player.gameState);
   
}

function gameValidation(){
    const {gameState} = player;
    //first iterate through the winning conditions
    for(i = 0; i<8; i++){
        let winCondition = player.winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if(a===''||b===''||c===''){
            
            continue;
        }
        if (a===b && b===c){
            player.roundWon = true;
            
            break;
        }
    }

    if(player.roundWon){
        player.gamePlaying = false;
        statusDisplay.innerHTML = winningMessage();
        return;
    }

    let draw = !player.gameState.includes('');
    if (draw) {
        player.gamePlaying = false;
        statusDisplay.innerHTML =  drawMessage();
        return;
    }

    player.p1 = player.p1 === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

const grid = document.querySelector('.grid-container');
const pauseGame = document.querySelector('.game-pause');
const continueGame = document.querySelector('.game-continue');
const restartGame = document.querySelector('.game-restart');


grid.addEventListener("click", (event) => {
    const{ target } = event;
    //const clickedCellIndex = parseInt(target.getAttribute('data'));
    if(target.classList.contains('grid-item')){
        //console.log("Im working", clickedCellIndex );
        updatePlay(target.getAttribute('data'), target);
        return;
    }

    else{
        console.log("none")
    }
});

pauseGame.addEventListener("click", ()=>{
    player.gamePlaying = false;
    return;
});

continueGame.addEventListener("click", () => {
    player.gamePlaying = true;
    return;
});

restartGame.addEventListener('click', ()=>{
    player.p1 =  "X";
    player.gamePlaying = true;
    player.roundWon = false;
    player.gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.grid-item').forEach(
        element => element.innerHTML = ''
    );
    
});