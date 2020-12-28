var player, player_running;
var banana;
var obstacleGroup;
var score = 0;
var backImage;
var ground;



function preload(){
backimage = loadImage("jungle.jpg");
  
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  
  bananaImage = loadImage("Banana.png");
  
  obstacleImage = loadImage("stone.png");
                                 


}
function setup() {
  createCanvas(400, 400);
  var backdrop = createSprite(200,200,400,400);
  backdrop.addAnimation("jungle.jpg", backImage);
  backdrop = ground.width/2;
  backdrop.velocityX = -4;

}

function draw() {
  background(220);
  
  var PLAY = 1;
  var gameState = 1;
  
  var player = createSprite(100,300,20,50);
  player.scale = 0.2;
  
  var ground = createSprite(400,350,800,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  ground.visible = false;
  
  var ObstaclesGroup = createGroup();
  var bananaGroup = createGroup();

   if(gameState === PLAY){
  
    //scoring
     score= Math.ceil(World.frameCount/World.frameRate);
  
    stroke("white");
    textSize(20);
    fill("white");
    text("Score:"+score, 500,50);
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && player.y >= 300){
      player.velocityY = -12;

    }
  
    //add gravity
  player.velocityY = player.velocityY + 0.8;
    
    
    //spawn obstacles and banana
    spawnBanana();
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(player)){
      player.scale = 0.2;
       }
     switch(score){
         case 1: player.scale= 0.4;
         break;
         case 10: player.scale= 0.5;
         break;
         case 10: player.scale= 0.6;
         break;
         case 20: player.scale= 0.7;
         break;
         case 30: player.scale= 0.8;
         break;
         case 50: player.scale= 0.9;
         break;
         default: break;
         
         
     }
  }
  
  drawSprites();
}



function reset(){
  
  //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
}

function spawnBanana(){
  if(World.frameCount % 80 === 0) {
    var banana = createSprite(250,220,10,30);
    banana.setAnimation("Banana");
    banana.scale = 0.05;
    banana.velocityX = -4;
    bananaGroup.add(banana);
    banana.lifetime = -100;
    
  }
  }
  
  function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,346,10,40);
     obstacle.setAnimation("Stone");
    obstacle.lifetime = -100;
    obstacle.velocityX =-4;
    //assign scale to the obstacle           
    obstacle.scale = 0.09;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }

}
