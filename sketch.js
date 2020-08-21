var backG;
var img;
var score;
var hscore;
var live;
var air;

var cust;

var bounce;
var hit;
var miss;

var puckX = 640;
var puckY = 357;
var puckSpeedX = 4;
var puckSpeedY = 4;

var playerX = 340;
var playerY = 332;
var oppX = 930;
var oppY = 332;

var playerScore = 0;
var oppScore = 0;
var life = 5;
var label='YOU LOST';
var labelWin="YOU WON";
var labelDraw="GAME OVER"
var highScore = 0;
var updateHighScore=0;


function preload() {
  soundFormats('m4a');
  bounce = loadSound("assets/ballBounce.m4a");
  hit = loadSound("assets/ballHit.m4a");
  miss = loadSound("assets/ballMissed.m4a");
  cust = loadFont('digital-7.ttf');
}

function setup() {
    backG = loadImage("assets/wooden.jpg");
    createCanvas(1280, 720);
    img = loadImage("assets/bariers.jpg");
    score = loadImage("assets/scoreboard.png");
    hscore = loadImage("assets/hscore.png");
    live = loadImage("assets/live.png")
    air = loadImage("assets/airh.png")
    // any additional setup code goes here
}

function draw() {
  background(backG);
  fill(0);
  image(img, 325, 150);
  ellipse(puckX, puckY, 20, 20);
  puckMove();
  rect(playerX, playerY, 10,50);
  playerY = mouseY;
  rect(oppX, oppY, 10,50);
  oppMove();
  image(score, 540,30);
  image(hscore, 1180, 550);
  image(live, 0, 550);
  image(air, 100, 100);
  stroke(255,0,0);
  fill(255,0,0)
  textFont(cust,50);
  text(playerScore, 580, 105);
  text(oppScore, 670, 105);
  text(life,40, 615);
  text(highScore, 1220, 615)
  fill(0);
  rect(1020, 200, 200, 200);
  fill(255);
  stroke(0);
  textSize(30);
  text('PRESS ESCAPE',1030, 230 )
  text('TO END GAME',1030, 260 )
  text('PRESS ENTER',1030, 310)
  text('TO START NEW',1030, 340 )
  text('GAME',1030, 370 )


  if (life==0 && oppScore>playerScore) {
    stroke(0);
    fill(0);
    text(label, 540, 670);
    highScoreCounter();

  }else if(life==0 && oppScore<playerScore){

    stroke(0);
    fill(0);
    text(labelWin, 540, 670);
    highScoreCounter();

  }else if (life==0 && oppScore==playerScore){
    stroke(0);
    fill(0);
    text(labelDraw, 540, 670);

  }
  // your "draw loop" code goes here
}

// for info on handling key presses, see the FAQ:
// https://cs.anu.edu.au/courses/comp1720/assignments/03-simple-arcade-game/#handling-keypresses

function puckMove() {
  puckX += puckSpeedX;
  puckY += puckSpeedY;
  if (puckX < 350) {
    //puckSpeedX *= -1;
    resetPuck();
    oppScore++
    miss.play();
    life--
    if (life==0) {
      endGame();
}
  }
  if(puckX < 360 && puckY > playerY && puckY < playerY + 50){
    puckSpeedX *= -1;
    hit.play();
    }
  if(puckX > 920 && puckY > oppY && puckY < oppY + 50){
    puckSpeedX *= -1;
    hit.play();
    }
  if (puckX > 930) {
  //  puckSpeedX *= -1;
   resetPuck();
   playerScore++
   miss.play();

  }
  if (puckY < 175) {
    puckSpeedY *= -1;
    bounce.play();
  }
  if (puckY > 540) {
    puckSpeedY *= -1;
    bounce.play();
  }  // your "mouse pressed" code goes here
}

function resetPuck(){
  puckX = 640;
  puckY = 357;
  puckSpeedX *= -1;
}

function oppMove() {
  var middle = oppY + 50/2;
  if (middle < puckY+10){
    oppY += 3.5;
  }
  if (middle > puckY-10){
    oppY -= 3.5;
  }
}

function restartScreen(){
  // backG = loadImage("assets/wooden.jpg");
  // createCanvas(1280, 720);
  playerScore=0;
  oppScore=0;
  life=5;
  puckSpeedX = 4;
  puckSpeedY = 4;
  puckX = 640;
  puckY = 357;
  puckSpeedX *= -1;


}

function endGame(){
  // playerScore=0;
  // oppScore=0;
  puckSpeedX=0;
  puckSpeedY=0;
  puckX=640;
  puckY=360;

}

function highScoreCounter(){

if (oppScore > highScore && oppScore > playerScore) {
  highScore=oppScore;


}else if (playerScore > highScore && playerScore>oppScore) {

  highScore=playerScore;

}

}

function keyPressed() {
  if (keyCode === ESCAPE) {
    gameFinish();
   } else if (keyCode === ENTER) {

     restartScreen();

   }
}

function gameFinish() {
  playerScore=0;
  oppScore=0;
  puckSpeedX=0;
  puckSpeedY=0;
  puckX=640;
  puckY=360;
}
