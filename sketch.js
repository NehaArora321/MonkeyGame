var monkey,bananaImage,obstacleImage,obstacleGroup,backg,score,backgImg;
var monkeyImg,score,obstouch,gameState,obsTouchCount;

function preload(){
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  backgImg=loadImage("jungle.jpg");
  monkeyImg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
  createCanvas(700, 400);
  
  backg=createSprite(0,0,800,400);
  backg.addImage(backgImg);
  backg.scale=2;
  backg.velocityX=-4;
  
  monkey=createSprite(50,340);
  monkey.addAnimation("running",monkeyImg);
  monkey.scale=0.1;
  
  invisibleGround=createSprite(400,370,800,10);
  invisibleGround.visible=false;
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  score=0;
  
}

function draw() {
  background(0);
  
  if(backg.x<0){
     backg.x=250;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-10;
  }
  monkey.velocityY=monkey.velocityY+0.5;
  
  if(bananaGroup.isTouching(monkey)){
     score=score+5;
    bananaGroup.destroyEach();
  }
  
    
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
    gameState="end";
  }
 
  switch(score){
    case 10 : monkey.scale=0.12;
              break;
    case 20 : monkey.scale=0.14;
              break;
    case 30 : monkey.scale=0.16;
              break;
    case 40 : monkey.scale=0.18;
              break;
    default:  break;
  }
 

  food();
  obstacles();

  monkey.collide(invisibleGround);
  
  drawSprites();
  
  fill("white");
  textSize(15);
  text("Score: "+score,600,50);
  
  

}

function food(){
 if(frameCount%100===0){
   var banana=createSprite(800,300);
   banana.addImage(bananaImage);
   banana.y=Math.round(random(200,300));
   banana.velocityX=-4;
   banana.scale=0.05;
   
   banana.lifetime=800;
   bananaGroup.add(banana);
 }
}
function obstacles(){
 if(frameCount%150===0){
   var obstacle=createSprite(800,340);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX=-4;
   obstacle.scale=0.2;
   
   obstacle.lifetime=800;
   obstacleGroup.add(obstacle);
 }
}
