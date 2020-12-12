
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime=0;
var monkey_collided

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  monkey_collided= loadAnimation ("sprite_0.png");
  
}



function setup() {
  createCanvas(600,600);

  foodGroup=new Group();
  obstacleGroup=new Group();
  
  monkey = createSprite (80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  
 
  
  
}


function draw() {
background("white");
  
  if (gameState===PLAY){
    if (monkey.isTouching(obstacleGroup)){
    gameState=END;
    
  }
    monkey.changeAnimation("collided",monkey_collided)
  }
  
  if (gameState===END){
    survivalTime=0;
    obstacleGroup.setVelocityEach(0);
    foodGroup.setVelocityEach(0);
    ground.velocityX=0;                                    
  }
  
   ground= createSprite (400,350,900,10);
  ground.velocityX=-4;
  
  ground.x=ground.width/2;
  console.log(ground.x);
  
  if (keyDown("space") && monkey.y>100 ){
   monkey.velocityY=-5;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  stroke ("black");
  textSize=20;
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text ("SURVIVAL TIME:"+survivalTime,300,50);
  
  if (monkey.isTouching(foodGroup)){
foodGroup.destroyEach();
  }
  
    
  
  
  
  
  drawSprites();
  spawnFood();
  spawnObstacles();
}

function spawnFood (){
if (frameCount%80===0){
  banana=createSprite(600,random(120,200),20.20);
  banana.addImage(bananaImage)
  banana.scale=0.1;
  banana.lifetime=200;
  banana.velocityX=-3;
  foodGroup.add(banana);
}
}

function spawnObstacles (){
  if (frameCount%300===0){
    obstacle=createSprite(600,330,100,100);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime=300;
    obstacle.velocityX=-6;
    obstacleGroup.add(obstacle);
    obstacle.scale=0.1;
  }
  
}


