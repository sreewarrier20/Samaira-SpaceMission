var gameState= 1
var astronaut1, astronaut2
var block, ghost, sky
var startTime, endTime
var fireball
var gameover
var music
var score=0
//initialise state to 0-> to monitor whether the space is pressed or not
var state=0;

function preload(){
  astronautimage1= loadAnimation("images/astronaut1.png")
  astronautimage2= loadAnimation("images/astronaut2.png")
  blockimage= loadImage("images/block.png")
  ghostimage= loadImage("images/ghost.png")
  skyimage = loadImage("images/sky.jpeg")
  backgroundimage=loadImage("images/background.png")
  gameoverimage=loadImage("images/gameover.png")
  fireball1=loadAnimation("images/fireball-1.png","images/fireball-2.png", "images/fireball-3.png", "images/fireball-4.png")
  music=loadSound("images/Retro-Space-Hero.mp3")
  stoneimage=loadImage("images/stone.png")
  }

function setup() {
  createCanvas(displayWidth,displayHeight);
  astronaut1 =createSprite(displayWidth/2, displayHeight-10, 50, 50);
  astronaut1.addAnimation("image1",astronautimage1)

  astronaut1.addAnimation("image2",astronautimage2)

  ghostGroup=new Group ()
  astronaut1.debug=true
  astronaut1.setCollider("rectangle",0,0,50,100)
  
  startTime=new Date().getTime()


  



  //created left and right invisible sprites.
  left_invisible_sprite=createSprite(10,-20*displayHeight,20,41*displayHeight)
  right_invisible_sprite=createSprite(displayWidth-10,-20*displayHeight,20,41*displayHeight)
  left_invisible_sprite.visible=false
  right_invisible_sprite.visible=false
 
  music.loop();
}

function draw() {
  background("#33768E");

image (backgroundimage,0,-50*displayHeight,displayWidth,51*displayHeight)
drawSprites();  


// made astronaut1 collide always with left and right invisible sprites
astronaut1.collide(left_invisible_sprite)
astronaut1.collide(right_invisible_sprite)

if(gameState==1){



  if(keyWentDown("space")|| touches.length>0){// to consider the tap as well
    console.log("hello")
    //to start updating the score board
  state=1;
  touches=[]  //emptying touches array to identify the next tap on the screen
    astronaut1.changeAnimation("image2",astronautimage2)
     astronaut1.velocityY=-10


  }

/*
  if(keyWentDown("right")){
    astronaut1.velocityX=20
  }
  if(keyWentDown("left")){
    astronaut1.velocityX=-20
  }

  if(keyWentUp("right")){
    astronaut1.velocityX=0
  }
  if(keyWentUp("left")){
    astronaut1.velocityX=0
  }
  */
 astronaut1.x=mouseX;
  camera.position.y= astronaut1.y
  camera.position.x=width/2

  
  obstacle()
if (astronaut1.isTouching(ghostGroup)){
  endTime=currentTime
  gameover=createSprite(width/2, astronaut1.y,20,20)
 gameover.addImage(gameoverimage)
 gameover.scale=1
  gameState=0

}  
currentTime=new Date().getTime()

textSize(25)
strokeWeight(5)
stroke ("white")
  text(dateDiffToString(startTime, currentTime),(width)*3/4,(astronaut1.y-300) )
 


  //start calculating score only if space bar is pressed and astronaut moves up.
if(state===1){
score=score+Math.round(getFrameRate()/60)// changed 50 to 60.
}


fill("white")
textSize(50)
stroke(2)
 text(score+ " points",width/2,astronaut1.y+100)// modified x,y

  if(score > 1500 && frameCount%100==0){
      var stone=createSprite(random(50,700),astronaut1.y-500,20,20)
      stone.addImage(stoneimage)
        stone.scale=0.2
        stone.velocityY=3+score/1000
        stone.debug=true
        ghostGroup.add(stone)
      }
  }


if(gameState==0){
  astronaut1.velocityY=0
  astronaut1.velocityX=0

//stop music in end state.
music.stop()

 
 
ghostGroup.setVelocityEach(0,0)
 textSize(25)
 strokeWeight(5)
 stroke ("white")
 text(dateDiffToString(endTime, startTime),(width)*3/4,(astronaut1.y-300) )

text("Press x to Restart",width/3,astronaut1.y-100) 
text("You have earned "+score+ " points",width/3,astronaut1.y+100)// modified x,y
 if (keyDown("x")||touches.length>0){// to restart the game on a tap.
  
touches=[]  // resetting touches array.
//gameover.destroy();

  gameover.destroy()
  reset()

 }
 console.log(gameover.lifetime)

}

 
}

 




function obstacle(){

  if(frameCount%Math.round(random(40,50))==0){
o = createSprite (random(0,width),astronaut1.y-500)
var number=Math.round(random(1,2))
if(number==1){
  o .addImage(ghostimage) 

}
else if(number==2){
o.addAnimation("fire",fireball1)
o.scale=0.1
}
ghostGroup.add(o)
o.velocityY=4+score/1000
o.setCollider("circle",0,0,40)
o.debug=true

o.lifetime=900

  }

}





function dateDiffToString(a, b){


  diff = Math.abs(a - b);

  ms = diff % 1000;
  diff = (diff - ms) / 1000
  ss = diff % 60;
  diff = (diff - ss) / 60
  mm = diff % 60;
  diff = (diff - mm) / 60
  hh = diff % 24;
  days = (diff - hh) / 24

  return "MM : " +mm+" SS : "+ss+"."+ms;

}




function reset(){
  gameState=1
  startTime=new Date().getTime()


image (backgroundimage,0,-5*displayHeight,displayWidth,6*displayHeight)
astronaut1.x=displayWidth/2 
astronaut1.y= displayHeight-10
ghostGroup.destroyEach()

score=0

}

