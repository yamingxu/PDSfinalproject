var checkbox_purple;
var checkbox_red;
var checkbox_orange;
var checkbox_white;
var radio;
var img_leave = [];
var img_purple = [];
var img_orange = [];
var img_white = [];
var img_red = [];
var img_stem = [];
var leave_num = 7;
var flower_num = 11;
var stem_num = 15;
var posX = 200;
var posY;
var posY_2;
var margin = 100;
var flowers = [];
var chosenColor = [];
var cardWidth = 525;
var cardHeight = 300;
var noiseSize = 9;
var numX = cardWidth/noiseSize;
var numY = cardHeight/noiseSize;
var button;
var colors = [];
var color_white =[{
  h: 35,
  s: 30,
  l: 54
},
{
  h: 231,
  s: 11,
  l:13
},
{
  h: 356,
  s: 38,
  l: 23
},{
  h: 270,
  s: 5,
  l: 75
},{
  h:344,
  s:28,
  l:47
}]
var color_purple =[{
  h:240,
  s:10,
  l:15
},]
var color_orange =[{
  h:354,
  s:20,
  l:82
},{
  h:20,
  s:19,
  l:84
},{
  h:254,
  s:22,
  l:40
}]
var color_red =[{
  h:210,
  s:40,
  l:76
},{
  h:240,
  s:3,
  l:54
},{
  h:35,
  s:12.6,
  l:63
},{
  h:1,
  s:50,
  l:24
}]

function preload(){
  for(var i = 1; i < flower_num+1; i+=1){
    img_purple[(i-1)] = loadImage("assets/flower/purple/" + i + ".png");
  }

  for(var i = 1; i < flower_num+1; i+=1){
    img_orange[(i-1)] = loadImage("assets/flower/orange/" + i + ".png");
  }
  for(var i = 1; i < flower_num+3; i+=1){
    img_red[(i-1)] = loadImage("assets/flower/pink/" + i + ".png");
  }
  for(var i = 1; i < flower_num+3; i+=1){
    img_white[(i-1)] = loadImage("assets/flower/white/" + i + ".png");
  }
  //console.log(img_purple);
  for(var i = 1; i < leave_num+1; i+=1){
    img_leave[(i-1)] = loadImage("assets/leaves_/"+i+".png");
  }
  for(var i = 1; i < stem_num+1; i+=1){
    img_stem[(i-1)] = loadImage("assets/stem/"+i+".png");
  }

}

function setup() {
  colorMode(HSL);
  noStroke();
  createCanvas(windowWidth, windowHeight);
  radio = createRadio();
  radio.option('purple');
  radio.option('white');
  radio.option('pink');
  radio.option('orange');
  textSize(14);
  text("Choose your flower color to start customizing",windowWidth/4*3,windowHeight/4-10);
  radio.position(windowWidth/4*3,windowHeight/4+30);
  button = createButton('submit');
  button.position(windowWidth/4*3,windowHeight/4+90);
  button.mousePressed(drawFlower);
  var val = radio.value();
  posY = (windowHeight-cardHeight*2)/3;
  posY_2 = posY*2+cardHeight;
  //text("Choose your flower color",windowWidth/4*3,windowHeight/4-10);
}

var h;
var s;
var l;


function draw(){

  val = radio.value();
  if(val == 'purple'){
    //text(val,50,50);
    chosenColor = img_purple;
    colors = color_purple;
  }
  else if (val == 'white') {
    chosenColor = img_white;
    colors = color_white;
  }
  else if (val == 'pink') {
    chosenColor = img_red;
    colors = color_red;
  }
  else if (val == 'orange') {
    chosenColor = img_orange;
    colors = color_orange;
  }else{
    chosenColor = [];
    colors = [];
  }

}

function drawFlower(){
  clear();
  scale(5);

  console.log(val);
  var color = random(colors);
  h = color.h;
  s = color.s;
  l = color.l;
  //bg 1
  for(var i = 0; i < cardWidth/noiseSize; i++) {
    for(var j = 0; j < cardHeight/noiseSize; j++) {
      var n = noise(i / 50, j / 50);
      var li = map(n, 0, 1, l-10, l+10);
      var hu = map(n, 0, 1, h-10, h+10);
      fill(hu, s, li);
      rectMode(CORNER);
      rect(posX+i*noiseSize, posY+j*noiseSize, noiseSize, noiseSize);
    }
    console.log("colored");
  }

  //no overlapping
  for(var i = 0; i <chosenColor.length; i++){
    var flower = {
      f:chosenColor[i],
      x:random(posX,posX+cardWidth-80),
      y:random(posY+cardHeight/2,posY+cardHeight-20),
      size: 10
    }
    var overlapping = false;
    for (var j = 0; j < flowers.length; j++) {
      console.log("yes");
      var other = flowers[j];
      var d = dist(flower.x, flower.y, other.x, other.y);
      if (d < (flower.f.width/flower.size/2+other.f.width/flower.size/2 + 20)) {
        overlapping = true;
      }
    }
    if (!overlapping) {
      flowers.push(flower);
    }
  }

  var b = int(random(0,14));//11

  //draw stem
  if (b != 9 ){
    push();
    imageMode(CENTER);
    translate(random(posX+20, posX+cardWidth/2),posY-10);
    rotate(-PI);
    image(img_stem[b],0, -210, img_stem[i].width/4,img_stem[i].height/4);

    pop();
    //noStroke();
}

  //draw leaves
  for(var i = 0; i < img_leave.length; i++){
    push();
    imageMode(CENTER);
    translate(posX+i*cardWidth/5+random(-10,10), posY+random(230,260));
    rotate(-PI);
    image(img_leave[i],0+img_leave[i].width/12,0,img_leave[i].width/6,img_leave[i].height/6);
    pop();
  }

  //draw flowers
  for(var m = 0; m < flowers.length; m++){
    image(flowers[m].f,flowers[m].x,flowers[m].y, flowers[m].f.width/flowers[m].size,flowers[m].f.height/flowers[m].size);
  }




  //reset array
  flowers = [];



  //bg2
  for(var i = 0; i < cardWidth/noiseSize; i++) {
    for(var j = 0; j < cardHeight/noiseSize; j++) {
      var n = noise(i / 50, j / 50);
      var li = map(n, 0, 1, l-10, l+10);
      var hu = map(n, 0, 1, h-10, h+10);
      fill(hu, s, li);
      rectMode(CORNER);
      rect(posX+i*noiseSize, posY*2+cardHeight+j*noiseSize, noiseSize, noiseSize);
    }
    console.log("colored");
  }


  textSize(14);

  fill(h+random(50,60),s+random(-30,0),l+random(30,50));
  textAlign(CENTER);
  textFont("Avenir");
  text("PHLOWER STUDIO",posX+cardWidth/2,posY+cardHeight/2-100);
//  fill(h+random(50,60),s+random(-30,0),l+random(10,50));

  textAlign(CENTER);
  textFont("Avenir");
  textSize(14);
  text("PHLOWER STUDIO",posX+cardWidth/2,posY_2+cardHeight/2);
  textSize(12);
  text("15601776702",posX+cardWidth/2,posY_2+cardHeight/2+130);
  text("#109-1 Yanhong Road,Shanghai,China",posX+cardWidth/2,posY_2+cardHeight/2+147);

  fill(255);
  rectMode(CORNER);
  //stroke(0);
  rect(cardWidth+posX+1,posY-100,400,cardHeight+1000);
  rect(0,posY-100,posX,cardHeight+1000);
  rect(posX-5,posY-100,cardWidth+30,100);
  rect(posX-5,posY+cardHeight,cardWidth,posY);

}
