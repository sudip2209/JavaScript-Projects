"use strict";
let score = 20;
let highScore = 0;
let secreatNumber=Math.trunc(Math.random()*20)+1;

const displayMessage = function (msg){
    document.querySelector('.message').textContent=msg;
}
// if current score is more than high score
const updateHighScore=function(){
    if(score>highScore){
        highScore=score;
        document.querySelector('.highscore').textContent=highScore;
    }
}

// after click the ckeck button
document.querySelector('.check').addEventListener('click',function(){
   const userInput=Number(document.querySelector('.guess').value);
   if(userInput<1 && userInput>20){
        displayMessage('⛔️ Enter a valid number!');
   }
   else if(userInput==secreatNumber){
        displayMessage('🎉 Correct Number!');
        document.querySelector('body').style.backgroundColor='#60b347';
        document.querySelector('.number').textContent=secreatNumber;
        document.querySelector('.number').style.width='30rem';
        updateHighScore();
   }
   else{
       if(score>1){
            displayMessage((userInput>secreatNumber)?'📈 Too high!':'📉 Too low!');
            score--;
            document.querySelector('.score').textContent=score;
        }
       else{
            displayMessage('💥 You lost the game!');
            document.querySelector('.score').textContent = 0;
       }
   }
});

// restart the game
document.querySelector('.again').addEventListener('click',function(){
   score=20;
   document.querySelector('.score').textContent=score;
   document.querySelector('.guess').value='';
   secreatNumber=Math.trunc(Math.random()*20)+1;
   document.querySelector('.number').textContent='?';
   displayMessage('Start guessing...');
   document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
