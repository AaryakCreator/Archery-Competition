var canvas;
var backgroundImage, shooter1_img, shooter2_img, track;
var fuelImage, powerCoinImage, lifeImage, boomImage, repairKitImage;
var obstacle1Image, obstacle2Image, policeCarImage, potholesImage;
var database, gameState;
var form, player, playerCount;
var allPlayers, archer1, archer2, fuels, powerCoins, obstacles;
var cars = [];

function preload() {
  shooter1_img = loadImage("../assets/shooter1.png");
  shooter2_img = loadImage("../assets/shooter2.png");
  powerCoinImage = loadImage("./assets/goldCoin.png");
  obstacle1Image = loadImage("./assets/waterBubble.png");
  obstacle2Image = loadImage("./assets/redbubble.png");
  lifeImage = loadImage("./assets/life.png");
  boomImage = loadImage("./assets/blast.png");

  
  // potholesImage = loadImage("./assets/pothole.jpg");
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
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
