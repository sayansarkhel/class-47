var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie , zombieImg, zombies
var bullet,bulletImg,bullets
var heart1Img,heart2Img,heart3Img,heart1,heart2,heart3
var bullets = 50
var score = 0
var gamestate = "fight"
var life = 3


function preload(){
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/bullet.png")
  winning = loadSound("assets/win.mp3")
  lose = loadSound("assets/lose.mp3")
  explosion = loadSound("assets/explosion.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

//adding the background image
bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite player.addImage(shooterImg)
  player = createSprite(displayWidth-1150,displayHeight-300,50,50)
   
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)
  player.addImage(shooterImg)
   zombies = new Group();
   bulletsGroup = new Group();

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.addImage(heart1Img)
   heart1.scale = 0.4
   heart1.visible = false

   
  heart2 = createSprite(displayWidth-150,40,20,20)
  heart2.addImage(heart2Img)
  heart2.scale = 0.4
  heart2.visible = false

  
  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale = 0.4
  heart3.visible = true
}

function draw() {
  background(0); 

if(gamestate==="fight"){

if (life===3){
heart3.visible=true
heart2.visible=false;
heart1.visible=false
}
if(life===2){
heart2.visible=true;
heart3.visible=false;
heart1.visible=false

}
if(life===1){
heart1.visible=true;
heart2.visible=false;
heart3.visible=false;
}
if(life===0){
gamestate="lost"
lose.play()
}
if(score===150){
gamestate="won"
winning.play()
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
 }
 if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
 }
 if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30

  
 }


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(player.x,player.y-30,20,10)
 bullet.addImage(bulletImg)
 bullet.velocityX = 20
 bullet.scale=0.03
bulletsGroup.add(bullet)
player.depth=bullet.depth
player.depth=player.depth+2
bullets = bullets-1
  player.addImage(shooter_shooting)
  explosion.play()
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullets===0){
gamestate="bullet"
lose.play()
}
if(zombies.isTouching(player)){
for(var i=0;i<zombies.length;i++){
if(zombies[i].isTouching(player)){
zombies[i].destroy()
life = life-1
}
}}
if(zombies.isTouching(bulletsGroup)){
  for(var i=0;i<zombies.length;i++){
  if(zombies[i].isTouching(bulletsGroup)){
  zombies[i].destroy()
  bulletsGroup.destroyEach()
  score=score+1
    }
  }
}
spawnZombies()
}
drawSprites();
fill("red")
textSize(20)
text("SCORE = "+score,displayWidth-10,50)
text("LIFE = "+life,displayWidth-10,70)
if(gamestate==="lost"){
textSize(100)
fill("yellow")
text("YOU LOST",displayWidth/2,displayHeight/2)
zombies.destroyEach()
player.destroy()
}
else if(gamestate==="won"){
  textSize(100)
  fill("green")
  text("YOU WON",displayWidth/2,displayHeight/2)
  zombies.destroyEach()
  player.destroy()
}
else if(gamestate==="bullet"){
  textSize(50)
  fill("green")
  text("YOU RAN OUT OF BULLETS",displayWidth/2-200,displayHeight/2)
  zombies.destroyEach()
  bulletsGroup.destroyEach()
  player.destroy()

}
}

function spawnZombies(){
if(frameCount%100===0){
zombie = createSprite(windowWidth,random(100,windowHeight-100),100,100)
zombie.addImage(zombieImg)
zombie.scale = 0.1;

zombie.velocityX = -15
zombies.add(zombie)  
}


}
function createBullets(){
  var bullet = createSprite(player.x+5,player.y-22,10,10)
  bullet.velocityX = +25
  bullet.addImage(bulletImg)
  bullet.scale = 0.05;
  bullets.add(bullet)
  }  


