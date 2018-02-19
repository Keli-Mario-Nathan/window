function setup(){
  createCanvas(800, 400);
  // background(119, 244, 66);

  // fill(204, 101, 192, 127);
  // stroke(127, 63, 120);

  // rect(40, 120, 120, 40);
  // ellipse(600, 120, 60, 60);
}
var slider = createSlider(0, 255)
var xPositions = [5, 354, 14, 25, 45, 66, 76, 134,150, 234, 300];
var yPositions = [12,34, 23, 21, 21, 34, 30, 40, 23, 34, 21];
var xPositionsB =[200, 125, 250, 175, 300, 225, 350, 375, 400];
var yPositionsB =[50, 55, 54, 53, 48, 45, 57, 60, 67, 65, 80];

draw = function() {
  background(119, 244, 66);

  for (var i = 0; i < xPositions.length; i++) {
      noStroke();
      fill(0, 200, 255);
      ellipse(xPositions[i], yPositions[i], 10, 10);
      stroke(5, 28, 11);
      fill(66, 244, 107);
      star(xPositionsB[i], yPositionsB[i], 2, 20, 6); 
      // translate(width*.1, height*0.1);
      // rotate(frameCount / 500);

      yPositions[i] += 3;
      yPositionsB[i] += 5;

      if (yPositions[i] > 400){
        yPositions[i] = 0;
      
      if (yPositionsB[i] > 400){
        yPositionsB[i] = 0;
      }

  };
  
      };


};
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
};
