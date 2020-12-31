class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
    passed_finished=false;
    
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(69,69,69));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          fill("red");
          stroke(3);
          ellipse(x,y,90,120);

        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passed_finished !== true){
      player.distance +=20
      player.update();
    }

    if(player.distance > 3690 && passed_finished === false){
      //gameState = 2;
      Player.updatefinishedplayer();
      player.rank = leaderboard;
      player.update();
      passed_finished = true;
    }
   
    drawSprites();
  
  
  
  }

  ranks(){
 
  background("black");
  image(bronze,displayWidth/4,displayHeight/8-50,200,200);
  image(silver,displayWidth/4-100,displayHeight/8+50,220,220);
  image(gold,displayWidth/2,-150,250,250);
   
  for(var plr in allPlayers){

  if(allPlayers[plr].rank===1){
 
  text(" 🥇 1st You are First !!! 1st 🥇 "+ allPlayer[plr].name,0,100)

  }

  else if(allPlayers[plr].rank===2){
 
    text("🥈 2nd You are Second ! 2nd 🥈"+ allPlayer[plr].name,displayWidth/4,displayHeight/8+100)
  
    }

     else if(allPlayers[plr].rank===3){
 
      text("🥉 3rd You are third 3rd -\_(ツ)_/-🥉"+ allPlayer[plr].name,displayWidth/-4,displayHeight/8+100)
    
      }

      else if(allPlayers[plr].rank===4){
 
        text("You are fourth :( "+ allPlayer[plr].name,0,-300)
      
        }
  

  }
  
  }

}
