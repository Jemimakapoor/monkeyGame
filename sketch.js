var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey1
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey1=loadAnimation("sprite_6.png")
 
}

function setup() {
  createCanvas(600, 600);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.addAnimation("stop",monkey1)
  
  monkey.scale=0.1;
  
  ground= createSprite(400,350,1200,10);
  ground.velocityX=-7;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
background(225);
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time; "+ survivalTime, 100, 50);
                          
                          
  
   if(gameState === PLAY){
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY= monkey.velocityY + 0.8;
  monkey.collide(ground);
    
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
     
if(monkey.isTouching(obstacleGroup)){
  gameState= END;
}
   
  
  hungry();
  enemy();
   }
 
   else if (gameState === END) {
   FoodGroup.setVelocityXEach(0);
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
  monkey.changeAnimation("stop");
     obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
  survivalTime=0
   }
  
    
  
  
  drawSprites();
}

function hungry(){
if (frameCount % 100 === 0){
var banana=createSprite(600,165,10,40);
  banana.velocityX= -5
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.lifetime = 200;
  FoodGroup.add( banana);

}

}

function enemy(){
  if (frameCount % 300 === 0){
    var obstacle=createSprite(600,325,20,20);
    obstacle.velocityX=-5;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
    
    
    
  }
}









