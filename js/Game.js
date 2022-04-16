class Game {
    constructor() {
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("reset");
        this.angle = 0;
    }

    
    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        });
    }

    
    update(state) {
        database.ref("/").update({
            gameState: state
        });
    }


    start() {
        player = new Player();
        playerCount = player.getCount();

        form = new Form();
        form.display();

        engine = Engine.create();
        world = engine.world;
    
        archer1 = createSprite(width / 2 - 0, height - 100);
        archer1.addImage("shooter1", shooter1_img);
        archer1.scale = 0.1;
    
        archer2 = createSprite(width / 2 + 100, height - 100);
        archer2.addImage("shooter1", shooter2_img);
        archer2.scale = 0.1;

        arrow = new Arrow(200, 50);

        bow = new Bow(arrow.body, {x:200, y:50});

        archers = [archer1, archer2];

        obstacles = new Group();



        var obstaclesPostions = [
            {x: width / 2 + 50, y: height - 240, image: obstacle2Image },
            { x: width / 2 - 50, y: height - 300, image: obstacle1Image },
            { x: width / 2 + 50, y: height - 360, image: obstacle1Image },
            { x: width / 2 - 80, y: height - 400, image: obstacle2Image },
            { x: width / 2, y: height - 800, image: obstacle2Image },
            { x: width / 2 - 80, y: height - 460, image: obstacle1Image },
            { x: width / 2 + 80, y: height - 510, image: obstacle2Image },
            { x: width / 2 + 50, y: height - 580, image: obstacle2Image },
            { x: width / 2 - 50, y: height - 640, image: obstacle1Image },
            { x: width / 2 + 50, y: height - 800, image: obstacle2Image },
            { x: width / 2, y: height - 1040, image: obstacle1Image },
            { x: width / 2 - 80, y: height - 860, image: obstacle2Image }
        ];


        this.addSprites(obstacles, obstaclesPostions.length, obstacle1Image, 0.07, obstaclesPostions);
        this.addSprites(obstacles, obstaclesPostions.length, obstacle2Image, 0.07, obstaclesPostions);

    }


    



    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
        for (var i = 0; i < numberOfSprites; i++) {
            var x, y;
    
          
            if (positions.length > 0) {
                x = positions[i].x;
                y = positions[i].y;
                spriteImage = positions[i].image;
            } else {
                x = random(width / 2 + 50, width / 2 - 50);
                y = random(-height, height );
            }
            var sprite = createSprite(x, y);
            sprite.addImage("sprite", spriteImage);
            sprite.velocityY += 8;
    
            sprite.scale = scale;
            spriteGroup.add(sprite);
        }
    }



    handleElements() {
        form.hide();
        form.title.position(40, 50);
        form.title.class("gameTitleAfterEffect");
    
        
        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 200, 40);
    
        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 230, 100);
    }


    play() {
        this.handleElements();
        this.handleResetButton();

        Player.getPlayersInfo();


        if (allPlayers !== undefined) {
            
            var index = 0;

            // arrow.position.x = player.positionX;
            // arrow.position.y = player.positionY;

            for (var plr in allPlayers) {
                index = index + 1;


                var x = allPlayers[plr].positionX;
                var y = allPlayers[plr].positionY;


                archers[index - 1].position.x = allPlayers[plr].positionX;
                archers[index - 1].position.y = allPlayers[plr].positionY;



                if (index === player.index) {
                    fill("red");
                    textSize(24);
                    text(allPlayers[plr].name, x - 20, y - 50);

                    
                }
            }

            this.handlePlayerControls();
            this.handleArrowControls();
            


            drawSprites();
        }
    }


    handleResetButton() {
        this.resetButton.mousePressed(() => {
            
            database.ref("/").set({
                playerCount: 0,
                gameState: 0,
                players: {}
            });

            window.location.reload();
        });
    }



    handlePlayerControls() {
        if (keyIsDown(UP_ARROW)) {
            player.positionY -= 5;
            player.update();
        }

        if (keyIsDown(DOWN_ARROW)) {
            player.positionY += 5;
            player.update();
        }

    }


    handleArrowControls() {

        function mouseDragged() {
            if (gameState == 1) {
              Matter.Body.setPosition(arrow.body, {x: mouseX, y: mouseY});
            }
        }
          
        function mouseReleased() {
            bow.fly();
        }
       
    }
}



