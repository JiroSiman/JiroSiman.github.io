const cells = document.querySelectorAll('td');
const chooseDiv = document.getElementById('choose');
const chooseXBtn = document.getElementById('chooseX');
const chooseOBtn = document.getElementById('chooseO');
const modal = document.getElementById('modal');
const modalResult = document.getElementById('modal-result');
const modalNewGame = document.getElementById('modal-newGame');

let player = 'X';
let computer = 'O';
let gameOver = false;

chooseXBtn.addEventListener('click', () => { player='X'; computer='O'; chooseDiv.style.display='none'; });
chooseOBtn.addEventListener('click', () => { player='O'; computer='X'; chooseDiv.style.display='none'; });

const winCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const winMessages = [
  "Yay baby! 🎉 You nailed it 💪",
  "Winner love! 🏆 That’s how it’s done 😎",
  "Congrats baby! 🎊 You crushed it 💥",
  "Nice one love 😎, victory is yours 🎉"
];

const loseMessages = [
  "It’s okay baby 😢, it’s not the end. You can try again 💪",
  "Don’t worry love 😅, next round is yours!",
  "Oops baby 😎, almost had it! Try again ",
  "Chill love 😌, losing is just part of the game 🎮"
];

const drawMessages = [
  "It’s a tie baby 😅, try again to break it!",
  "Draw love 🤔, nobody wins this round 💪",
  "Tie baby! 😎 Close one, give it another shot 🎮"
];

function getRandomMessage(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

function checkWin(board,symbol){return winCombos.some(combo=>combo.every(i=>board[i]===symbol));}
function checkDraw(board){return board.every(cell=>cell!=='');}

function getHumanLikeMove(board){
  if(Math.random()<0.2){
    const emptyCells=board.map((c,i)=>c===''?i:null).filter(i=>i!==null);
    return emptyCells[Math.floor(Math.random()*emptyCells.length)];
  }
  for(let combo of winCombos){
    let cellsVals=combo.map(i=>board[i]);
    if(cellsVals.filter(v=>v===computer).length===2 && cellsVals.includes('')) return combo[cellsVals.indexOf('')];
    if(cellsVals.filter(v=>v===player).length===2 && cellsVals.includes('')) return combo[cellsVals.indexOf('')];
  }
  const center=4; if(board[center]==='') return center;
  const corners=[0,2,6,8].filter(i=>board[i]===''); if(corners.length>0) return corners[Math.floor(Math.random()*corners.length)];
  const sides=[1,3,5,7].filter(i=>board[i]===''); return sides[Math.floor(Math.random()*sides.length)];
}

function makeMove(i,symbol){cells[i].textContent=symbol;}
function boardState(){return [...cells].map(cell=>cell.textContent);}
function showModal(message){modalResult.textContent=message; modal.classList.remove('hidden'); gameOver=true;}

cells.forEach((cell,i)=>{
  cell.addEventListener('click',()=>{
    if(cell.textContent==='' && !gameOver && chooseDiv.style.display==='none'){
      makeMove(i,player);
      if(checkWin(boardState(),player)){ showModal(getRandomMessage(winMessages)); return; }
      if(checkDraw(boardState())){ showModal(getRandomMessage(drawMessages)); return; }
      setTimeout(()=>{
        let compMove=getHumanLikeMove(boardState());
        makeMove(compMove,computer);
        if(checkWin(boardState(),computer)){ showModal(getRandomMessage(loseMessages)); return; }
        if(checkDraw(boardState())){ showModal(getRandomMessage(drawMessages)); return; }
      },500);
    }
  });
});

modalNewGame.addEventListener('click', () => {
  cells.forEach(cell => cell.textContent = '');
  modal.classList.add('hidden');
  gameOver = false;
  chooseDiv.style.display = 'block';
});
