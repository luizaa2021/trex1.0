var trex,trex_running, trex_batido;

var solo,solo_imagem,solo_invisivel;

var nuvem, nuvem_imagem;

var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;

var score=0;

var estadojogo,play,end;
play=1;
end=0;
estadojogo=play;

var grupoNuvem;

var grupoCactos;

var gameOver, gameOverimg, restart, restartImg;

var pular, checkpoint, die;

function preload(){
  trex_running=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_batido=loadAnimation("trex_collided.png");
  solo_imagem=loadImage("ground2.png");
  nuvem_imagem=loadImage("cloud.png");
  cacto1=loadImage("obstacle1.png");
  cacto2=loadImage("obstacle2.png");
  cacto3=loadImage("obstacle3.png");
  cacto4=loadImage("obstacle4.png");
  cacto5=loadImage("obstacle5.png");
  cacto6=loadImage("obstacle6.png");

  gameOverimg=loadImage("gameOver.png");
  restartImg= loadImage("restart.png");

  pular=loadSound("jump.mp3");
  checkpoint=loadSound("checkpoint.mp3");
  ddie=loadSound("die.mp3");
}

function carregarNuvens(){
  if(frameCount%60===0){
    nuvem=createSprite(600,70,10,10);
    nuvem.addImage("nuvem",nuvem_imagem);
    nuvem.velocityX= -3;
    nuvem.scale=0.50;
    nuvem.y=Math.round(random(20,80));
    nuvem.lifetime=601;
    nuvem.depth=trex.depth;
    trex.depth=trex.depth+1;
    grupoNuvem.add(nuvem);

  }
}

function carregarObstaculos(){
  if(frameCount%60===0){
    var cacto=createSprite(600,170,10,10);
    cacto.velocityX= -(6+score/400);
    
    var rand= Math.round(random(1,6));
    switch(rand){
      case 1: cacto.addImage(cacto1);
       break;
      case 2:cacto.addImage(cacto2);
       break;
      case 3: cacto.addImage(cacto3);
       break;
      case 4: cacto.addImage(cacto4);
        break;
      case 5: cacto.addImage(cacto5);
        break;
      case 6: cacto.addImage(cacto6);
         break;
      default:break;
    } 
    cacto.scale=0.70;
    cacto.lifetime=601;
    grupoCactos.add(cacto);
  }

}

function setup(){
  createCanvas(600,200);
  trex=createSprite(50,157,20,50);
  trex.scale=0.5;
  trex.addAnimation("running",trex_running);
  
  solo_invisivel=createSprite(1,195,600,10);
  solo_invisivel.visible=false;
  solo=createSprite(1,190,600,20);
  solo.addImage("solo",solo_imagem);

  grupoNuvem=createGroup();
  grupoCactos=createGroup();

  restart= createSprite(300,40);
  restart.addImage(restartImg);
  restart.scale=0.4;
  gameOver= createSprite(300,100);
  gameOver.addImage(gameOverimg);
  gameOver.scale= 0.6;
}


function draw(){
  background(180);
  
  text("score: "+ score, 520,30);
 

  if(estadojogo===play){
    solo.velocityX=-(4+3*score/200);
    gameOver.visible=false;
    restart.visible=false;
    
    score=score+Math.round(frameCount/60);
    
    if(score>0 && score%100===0){
    checkpoint.play();
    
    }

    if(solo.x<0){
    solo.x=solo.width/2;}
    
    if(keyDown("space")&&trex.y>=100){
      trex.velocityY=-12;
      
      pular.play();
    
    }
    
    trex.velocityY=trex.velocityY+0.8;
    
    carregarNuvens();

    carregarObstaculos();
    if (grupoCactos.isTouching(trex)){
     
      estadojogo=end;
      die.play();
      
     
    }

  } else if(estadojogo===end){
    gameOver.visible=true;
    restart.visible=true;
    
    solo.velocityX=0;
    trex.velocityY=0;
    trex.velocityX=0;
    
    trex.changeAnimation("batido", trex_batido);
    grupoCactos.setLifetimeEach(-1);
    grupoNuvem.setLifetimeEach(-1);
    grupoCactos.setVelocityXEach(0);
    grupoNuvem.setVelocityXEach(0);
    
    

   
  }
  
 
  trex.collide(solo_invisivel);
 
  
  

  
  drawSprites();
}