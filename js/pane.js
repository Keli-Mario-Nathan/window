let rSlider, gSlider, bSlider;
const drops = [];
const dropNum = 25;

function Drop (xPosition, yPosition, dropColor, speed) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.dropColor = dropColor;
    this.speed = speed;
}

function setup() {
    // create canvas
    const canvas = createCanvas(710, 400);
    canvas.parent('container');
    textSize(15);
    noStroke();
    for (let i = 0; i < dropNum; i++) {
        const xPosition = random(0, 710);
        const yPosition = random(0, 400);
        const dropColor = color(255);
        const speed = 4;
        drops.push(new Drop (xPosition, yPosition, dropColor, speed));
    }




    // create sliders
    rSlider = createSlider(0, 255, 100);
    rSlider.parent('container');
    rSlider.position(20, 20);
    rSlider.class('red');

    gSlider = createSlider(0, 255, 0);
    gSlider.parent('container');
    gSlider.position(20, 50);
    gSlider.class('red');

    bSlider = createSlider(0, 255, 255);
    bSlider.parent('container');
    bSlider.position(20, 80);
    bSlider.style('red');

}


function draw() {
    const r = rSlider.value();
    const g = gSlider.value();
    const b = bSlider.value();

    background(r, g, b);
    for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        fill(drop.dropColor);
        const dropSize = 10;
        ellipse(drop.xPosition, drop.yPosition, dropSize, dropSize);
        drop.yPosition += drop.speed;
        if (drop.yPosition > 400) {
            drop.yPosition = 0;
        }
    }


    // background(r, g, b);
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
};
