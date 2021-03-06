class Player {
    constructor() {
        this.name = null;
        this.index = null;
        this.positionX = 0;
        this.positionY = 0;
    }


    addPlayer() {
        var playerIndex = database.ref("players/player" + this.index);

        if (this.index === 1) {
            this.positionX = width / 4 - 100;
            this.positionY = height / 2;
        } else {
            this.positionX = width / 4 + 900;
            this.positionY = height / 2;
        }

        database.ref(playerIndex).set( {
            name: this.name,
            positionX: this.positionX,
            positionY: this.positionY
        });
        
    }


    addArrows() {
        var arrowIndex = database.ref("Bows/arrow" + this.index);

        if (this.index === 1) {
            this.positionX = width / 4 - 100;
            this.positionY = height / 2;
        } else {
            this.positionX = width / 4 + 900;
            this.positionY = height / 2;
        }

        database.ref(arrowIndex).set( {
            positionX: this.positionX,
            positionY: this.positionY
        });
        
    }

    
    getDistance() {
        var playerDistanceRef = database.ref("players/player" + this.index);

        playerDistanceRef.on("value", data => {
            var data = data.val();
            this.positionX = data.positionX;
            this.positionY = data.positionY;
        });
    }


    getCount() {
       var playerCountRef = database.ref("playerCount");
       playerCountRef.on("value", data => {
            playerCount = data.val();
        });
    }


    updateCount(count) {
        database.ref("/").update({
            playerCount: count
        });
    }


    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({
          positionX: this.positionX,
          positionY: this.positionY
        });

        var arrowIndex = "Bows/arrow" + this.index;
        database.ref(arrowIndex).update( {
           positionX: this.positionX,
           positionY: this.positionY 
        })
    }


    static getPlayersInfo() {
       var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data => {
            allPlayers = data.val();
        });
    }
}