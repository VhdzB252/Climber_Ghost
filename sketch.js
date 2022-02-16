var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
 

}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300, 300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
}

function draw() {
  background(0);
  
 if (gameState === "play"){

  if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("space")){
     ghost.velocityY = -2;
    }

   if (keyDown("left_arrow")){
    ghost.x = ghost.x -3;
   }

   if (keyDown("right_arrow")){
   ghost.x = ghost.x +3;
   }

 
   ghost.velocityY = ghost.velocityY +0.6;

   if (climbersGroup.isTouching(ghost)){
     ghost.velocityY = 0;
   }

   if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
     gameState = "end";
   }

    spawnDoors();
    drawSprites();
  }

if (gameState === "end"){
  stroke ("yellow");
  fill("yellow");
  textSize(35);
  text("GAME OVER", 250, 300);
}

}

function spawnDoors(){

  //Codigo para aparecer puertas en la torre
  if (frameCount % 240 === 0) {
    var door = createSprite(200,-50);
    door.addImage(doorImg);
    door.scale = 0.9;
    
    var climber = createSprite(200, 10);
    climber.addImage(climberImg);

    var invisibleBlock = createSprite(200, 12);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
     

     door.x = Math.round(random(125,400));
     door.velocityY = 1;

     climber.x = door.x;
     climber.velocityY = 1;
     climber.scale = 0.9;
      
     invisibleBlock.x = door.x;
     invisibleBlock.velocityY = 1;

     //asignar tiempo de vida a la variable
    door.lifetime = 800;
    climber.lifetime = 800;

    //ajustar la profundidad.
    climber.depth = door.depth;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    
    //agregar cada nube a un grupo.
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
