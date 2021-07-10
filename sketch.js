//Create variables here
var dog,dogImg,happyDogImg;
var database,foodS,foodStock;

var food;
var addFood,feed;
var fedTime,lastFed;

function preload()
{
	dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 500);
  
  dog = createSprite(900,250);
  dog.addImage(dogImg);
  dog.scale = 0.2

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  food = new Food();

  addFood = createButton("Add Food");
  addFood.position(500,70);
  addFood.mousePressed(AddFood);

  feed = createButton("Feed Food");
  feed.position(600,70);
  feed.mousePressed(FeedFood);
}


function draw() {  

  //background("#2E8A57");
  background("#edc309");

  fedTime = database.ref("FeedTime")

  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  drawSprites();

  food.display();
}

function readStock(data){
  foodS=data.val();
  food.updateFood(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function AddFood(){
  foodS++;
  dog.addImage(dogImg);
  database.ref('/').update({
    Food:foodS,
  })
}

function FeedFood(){
  if(foodS > 0){
    foodS--;
    dog.addImage(happyDogImg);
  
    database.ref('/').update({
      Food:foodS,
      FeedTime:hour()
    })
  }
}


