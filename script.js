const X_Class = "x";
const Circle_Class = "circle";

const Winning_Combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  
]
const board = document.getElementById("board");
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageText = document.querySelector("[data-winning-message-text]")
const winningMessageElement = document.getElementById("winningMessage")
const restartButton = document.getElementById("restartButton")

let circleTurn;

startGame()
restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(X_Class)
        cell.classList.remove(Circle_Class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener("click", handleClick, {once:true});
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}

function handleClick(event){
    const cell = event.target;
    const currentClass = circleTurn ? Circle_Class : X_Class;
    
    //place mark
    placeTheMark(cell, currentClass)
    //check win
    if(checkWin(currentClass)){
        console.log("winner");
         gameover(false)
    }else if( isDraw()){
        gameover(true)
    }else{
    swapPlayer()
    setBoardHoverClass() }
}

function gameover(draw){
    if(draw){
        winningMessageText.innerText = 'Draw'
    }
    else{
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add("show")
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class)
    })
}
function placeTheMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapPlayer(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    
    board.classList.remove(X_Class)
    board.classList.remove(Circle_Class)

    if(circleTurn){
        board.classList.add(Circle_Class)
    }else{
        board.classList.add(X_Class)
    }
}

function checkWin(currentClass){
    return Winning_Combinations.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}