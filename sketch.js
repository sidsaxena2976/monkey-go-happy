  PLAY = 1;
  END = 0;


  var monkey, ground, monkeyRunning, monkeyCollided, banana, obstacle;
  var bananaImage, obstacleImage, forestImage;
  var foodGroup, obstacleGroup;
  var survivalTime;


  gameState = PLAY;


function preload(){
  
  
  monkeyRunning = loadAnimation("sprite_0.png",
                  "sprite_1.png", "sprite_2.png",
                  "sprite_3.png", "sprite_4.png",
                  "sprite_5.png", "sprite_6.png",
                  "sprite_7.png", "sprite_8.png");
  
  
  bananaImage = loadImage("banana.png");
  

  obstacleImage = loadImage("obstacle.png");

  
  forestImage = loadImage("forest.png");
  
 
  monkeyOut = loadImage("sprite_0.png");
  
  
  monkeyCollided = loadImage("sprite_0.png");
  
}


function setup() {
  
  
  createCanvas(550, 350);
  
  
  monkey = createSprite(85, 280, 15, 35);
  monkey.addAnimation("running", monkeyRunning);
  monkey.addAnimation("collided", monkeyCollided);
  monkey.scale = 0.1;
  
  
  ground = createSprite(550, 335, 1100, 50);
  ground.velocityX = -7;
  ground.shapeColor = "lightGreen";
  ground.x = ground.width/2;

  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
  survivalTime = 0;
  
}


function draw() {

  
  background(forestImage);
  
  
  monkey.collide(ground);
  
  
  if (gameState === PLAY) {
    
    
    if (ground.x < 0) {
      ground.x = ground.width/2;
    }
  console.log(monkey.y)
  
    if (keyDown("space") && monkey.y >= 275) {
      monkey.velocityY = -12
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
  
  
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
      monkey.changeAnimation("collided", monkeyCollided);
    }
  
  
    if (foodGroup.isTouching(monkey)) {
      survivalTime = survivalTime + 2;
      foodGroup.destroyEach();
    }
  
  
    bananas();
    enemies();
  
  
  }
  
  
  if (gameState === END) {
    
    
    ground.velocityX = 0;
    
    
    monkey.setVelocity(0, 0);
    
    
    foodGroup.setVelocityXEach(0);
    
    
    obstacleGroup.setVelocityXEach(0);
    
    
    obstacleGroup.setLifetimeEach(-1);
    
    
    foodGroup.setLifetimeEach(-1);
    
    
  }
  
  
  drawSprites();
  
  
  stroke("cyan");
  strokeWeight(2)
  fill("black");
  text("Survival Time : "+survivalTime, 430, 60);
  
}


function bananas() {
  
  
  if (frameCount % 90 === 0) {
    
    banana = createSprite(570, 100, 1, 1);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = round(random(160, 200));
    banana.velocityX = -(5+(survivalTime/6));
    banana.lifetime = 120;
    foodGroup.add(banana);

  }
  
  
}


function enemies() {
  
  
  if (frameCount % 300 === 0) {
    
    obstacle = createSprite(570, 280, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.18;
    obstacle.velocityX = -(5+(survivalTime/10));
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
  }
  
  
}