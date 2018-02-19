

var rSlider, gSlider, bSlider;

function setup() {
  // create canvas
  createCanvas(710, 400);
  textSize(15);
  noStroke();




  // create sliders
  rSlider = createSlider(0, 255, 100);
  rSlider.position(20, 20);
  rSlider.class('red');

  gSlider = createSlider(0, 255, 0);
  gSlider.position(20, 50);
  gSlider.class('red');

  bSlider = createSlider(0, 255, 255);
  bSlider.position(20, 80);
  bSlider.class('red');

}
function draw() {
  var r = rSlider.value();
  var g = gSlider.value();
  var b = bSlider.value();
  
  background(r, g, b);
  // text("red", rSlider.x * 1 + rSlider.width, 35);
  // text("green", gSlider.x * 1 + gSlider.width, 65);
  // text("blue", bSlider.x * 1 + bSlider.width, 95);
//   push();
//   translate(width*0.2, height*0.5);
//   rotate(frameCount / 10.0);
//   star(15, 20, 2, 20, 4); 
//   pop();

// };
// function star(x, y, radius1, radius2, npoints) {
//   var angle = TWO_PI / npoints;
//   var halfAngle = angle/2.0;
//   beginShape();
//   for (var a = 0; a < TWO_PI; a += angle) {
//     var sx = x + cos(a) * radius2;
//     var sy = y + sin(a) * radius2;
//     vertex(sx, sy);
//     sx = x + cos(a+halfAngle) * radius1;
//     sy = y + sin(a+halfAngle) * radius1;
//     vertex(sx, sy);
//   }
}
