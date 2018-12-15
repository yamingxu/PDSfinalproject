var checkbox_purple;
var checkbox_red;
var checkbox_orange;
var checkbox_white;
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
var posY = 170;
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
}]
var color_orange =[{
  h:354,
  s:20,
  l:82
}]
var color_red =[{
  h:210,
  s:40,
  l:76
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
  checkbox_purple = createCheckbox('purple', false);
  checkbox_red = createCheckbox('red', false);
  checkbox_white = createCheckbox('white', false);
  checkbox_orange = createCheckbox('orange', false);
  checkbox_purple.changed(myCheckedEventPurple);
  checkbox_orange.changed(myCheckedEventOrange);
  checkbox_white.changed(myCheckedEventWhite);
  checkbox_red.changed(myCheckedEventRed);
  checkbox_red.position(windowWidth*0.75,windowHeight*0.25);
  checkbox_purple.position(windowWidth*0.75,windowHeight*0.25+20);
  checkbox_orange.position(windowWidth*0.75,windowHeight*0.25+40);
  checkbox_white.position(windowWidth*0.75,windowHeight*0.25+60);
  button = createButton('submit');
  button.position(50,50,65);
  button.mousePressed(drawFlower);
}

var h;
var s;
var l;


function drawFlower(){
  clear();
 var color = random(colors);
 h = color.h;
 s = color.s;
 l = color.l;
  //bg
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

  //select flowers
  //  if(flowers.length < 7){
  for(var i = 0; i <chosenColor.length; i++){
    var flower = {
      f:chosenColor[i],
      x:random(posX,posX+cardWidth-80),
      y:random(posY,posY+cardHeight/2-30),
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
    image(img_stem[b],random(posX+20, posX+cardWidth/2), posY-10,img_stem[i].width/4,img_stem[i].height/4);
  }

  //draw leaves
  for(var i = 0; i < img_leave.length; i++){
    push();
    imageMode(CENTER);
    translate(posX+i*cardWidth/5+random(-10,10), posY+random(50,70));
    rotate(random(-0.5,0.5));
    image(img_leave[i],0+img_leave[i].width/12,0,img_leave[i].width/6,img_leave[i].height/6);
    pop();
  }

  //draw flowers
  for(var m = 0; m < flowers.length; m++){
    image(flowers[m].f,flowers[m].x,flowers[m].y, flowers[m].f.width/flowers[m].size,flowers[m].f.height/flowers[m].size);
  }

  fill(255);
  rectMode(CORNER);
  noStroke();
  rect(cardWidth+posX+1,posY-100,400,cardHeight+100);
  rect(posX-5,posY-100,cardWidth+5,100);
  //}








  //things to do:
  // 1. 统一尺寸
  // 2. 确定位置
  // 3. 改变颜色和层次
  // 4. 确定背景颜色和花纹
  // 5. 确定搭配
  //    红色，
  //紫色， hsl :   var li = map(n, 0, 1, 10, 30),var hu = map(n, 0, 1, 220, 240); s = 10
  //黄色，
  //白色，
  //粉色

  //背景颜色
  //rule for random?
  textSize(16);
  fill(h+random(50,60),s+random(-30,0),l+random(-30,-10));
  textAlign(CENTER);
  textFont("Avenir");
  text("Phlower Studio",posX+cardWidth/2,posY+cardHeight/2+140);

  //reset array
  flowers = [];

}

function myCheckedEventPurple() {
  if (this.checked()) {
    chosenColor = concat(chosenColor,img_purple);
    colors = color_purple;
  } else {
    for(var i = 0; i < chosenColor.length; i++){
      if (chosenColor[i] == img_purple[0]){
        chosenColor.splice(i,img_purple.length);
        console.log("removed");
      }
    }
    console.log('Unchecking!');
  }
}

function myCheckedEventOrange() {
  if (this.checked()) {
    chosenColor = concat(chosenColor,img_orange);
    colors = color_orange;
    console.log(chosenColor);
  } else {
    for(var i = 0; i < chosenColor.length; i++){
      if (chosenColor[i] == img_orange[0]){
        chosenColor.splice(i,img_orange.length);
        console.log("removed");
      }
    }
    console.log('Unchecking!');
  }
}

function myCheckedEventWhite() {
  if (this.checked()) {
    chosenColor = concat(chosenColor,img_white);
    colors = color_white;
    console.log(chosenColor);
  } else {
    for(var i = 0; i < chosenColor.length; i++){
      if (chosenColor[i] == img_white[0]){
        chosenColor.splice(i,img_white.length);
        console.log("removed");
      }
    }
    console.log('Unchecking!');
  }
}

function myCheckedEventRed() {
  if (this.checked()) {
    chosenColor = concat(chosenColor,img_red);
    colors = color_red;
  } else {
    for(var i = 0; i < chosenColor.length; i++){
      if (chosenColor[i] == img_red[0]){
        chosenColor.splice(i,img_red.length);
        console.log("removed");
      }
    }
    console.log('Unchecking!');
  }
}
