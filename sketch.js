const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;




var canvas, engine, world;
var shooter1_img, shooter2_img, arrow1, arrow2;
var obstacle1Image, obstacle2Image;
var database, gameState;
var form, player, playerCount;
var allPlayers, archer1, archer2, arrow, bow, obstacles;
var archers = [], angle;






function preload() {
  shooter1_img = loadImage("../assets/shooter1.png");
  shooter2_img = loadImage("../assets/shooter2.png");
  arrow_img = loadImage("../assets/Arrow.png");
  obstacle1Image = loadImage("./assets/waterBubble.png");
  obstacle2Image = loadImage("./assets/redbubble.png");  
  lifeImage = loadImage("./assets/life.png");
  boomImage = loadImage("./assets/blast.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();  
}

function draw() {
    background("papayawhip");
    if( playerCount === 2) {
        game.update(1);
    }

    if (gameState === 1) {
        game.play();
    }

    Engine.update(engine);
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

