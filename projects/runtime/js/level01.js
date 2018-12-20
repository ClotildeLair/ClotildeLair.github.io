var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'wheel',x:100,y:200},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade (x,y){
            console.log('sawblade function!');
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
                myObstacle.x = x;
                myObstacle.y = y;
                    game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
                myObstacle.addChild(obstacleImage);
                obstacleImage.x = -25;
                obstacleImage.y = -25;
        }
        createSawBlade(300,200);
        createSawBlade(500,300);
        createSawBlade(600,100);
        createSawBlade(200,150);
        createSawBlade(400,400);
        
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var currentLevelData = levelData[i];
        }

        function createWheel (x,y) {
            console.log('Wheel function!');
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle); // NOTE: Needs damage value set!
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/Wheel.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        createWheel(100,200);
        
        function createEnemy() {
            var enemy = game.createGameItem('enemy', 25);
            var redSquare = draw.rect(50,50,'blue');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = 400;
            enemy.y = groundY-50;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function() { 
                console.log('The enemy has hit halle');
                game.changeIntegrity(-10);
            };
            enemy.onProjectileCollision = function() {
              enemy.fadeOut();
              game.increaseScore(100);
            };
        }
        
        createEnemy(400,groundY-10);
        createEnemy(800,groundY-100);
        createEnemy(1200,groundY-50);
        
        
        function createReward(){
            var reward = game.createGameItem('reward', 25);
            game.addGameItem(reward);
            var rewardImage = draw.bitmap('img/tinySpaceship.jpg');
            reward.x = 1000;
            reward.y = 200;
            reward.addChild(rewardImage);
            rewardImage.x = -25;
            rewardImage.y = -25;
            reward.velocityX = -1;
            reward.onPlayerCollision = function() {
                console.log('bonk!');
                reward.fadeOut();
                game.increaseScore(100);
            };
            
        }
        
    createReward();
        
        
                
};
};
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}