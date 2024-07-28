const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let lastHole;
let timeUp = false;
let hiDiv = document.querySelector(".hiscore")
let hiscore = 0;
function randomTime(min,max){
    return Math.round(Math.random()*(max-min) + min);
}
function randomHole(){
    let index = Math.floor(Math.random()*(holes.length));
    let hole = holes[index];
    if(hole === lastHole){
        return randomHole();
    }
    lastHole = hole;
    return hole;
}
function peep() {
    let time;
    if(document.getElementById('level-select').value == 'Newbie'){
        time = randomTime(1500,2000);
    }
    else if(document.getElementById('level-select').value == 'Cunning'){
        time = randomTime(500, 1000);
    }
    else{
        time = randomTime(200,300);
    }
   const hole = randomHole(holes);
   hole.classList.add('up');
   setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
   }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
    timeUp = true;
    if(score > hiscore){
        localStorage.setItem('hiscore', JSON.stringify(score));
    }
    hiscore = JSON.parse(localStorage.getItem('hiscore'));
    hiDiv.textContent = `Hiscore : ${hiscore}`
  }, 5000);
}
function bonk(e){
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener("click", bonk));