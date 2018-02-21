'use strict';

const canvasWidth = 800;
const canvasHeight = 400;

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function Weather(numOfComponents, backgroundH, backgroundS, backgroundL) {
    this.components = [];
    this.numOfComponents = numOfComponents;
    this.backgroundH = backgroundH;
    this.backgroundS = backgroundS;
    this.backgroundL = backgroundL;
}

Weather.prototype.collectComponents = function(size, colorH, colorS, colorL) {
    for (let i = 0; i < this.numOfComponents; i++) {
        this.components.push(new Component(size, colorH, colorS, colorL));
    }
};

Weather.prototype.setControls = function() {
    // $('#speed-slider').slider('option', 'min', this.speedMin);
    // $('#speed-slider').slider('option', 'max', this.speedMax);
    $('#speed-slider').slider('option', 'values', [this.speedLow, this.speedHigh]);
    $('#quantity-slider').slider('option', 'value', scene.numOfComponents);
};

function Rain(numOfComponents, backgroundH, backgroundS, backgroundL) {
    Weather.call(this, numOfComponents, backgroundH, backgroundS, backgroundL);
    this.speedMin = 3;
    this.speedMax = 10;
    this.speedLow = 4;
    this.speedHigh = 8;
}

Rain.prototype = Object.create(Weather.prototype);

Rain.prototype.render = function() {
    background(this.backgroundH, this.backgroundS, this.backgroundL);
    for (let i = 0; i < this.components.length; i++) {
        const drop = this.components[i];
        fill(drop.colorH, drop.colorS, drop.colorL);
        ellipse(drop.xPosition, drop.yPosition, drop.size, drop.size);
        drop.yPosition += drop.speed;
        if (drop.yPosition - drop.size / 2 > canvasHeight) {
            drop.yPosition = 0 - drop.size / 2;
        }
    }
};

function Snow(numOfComponents, backgroundH, backgroundS, backgroundL) {
    Weather.call(this, numOfComponents, backgroundH, backgroundS, backgroundL);
    this.speedMin = 2;
    this.speedMax = 6;
    this.speedLow = 3;
    this.speedHigh = 5;
}

Snow.prototype = Object.create(Weather.prototype);

Snow.prototype.render = function() {
    background(this.backgroundH, this.backgroundS, this.backgroundL);
    for (let i = 0; i < this.components.length; i++) {
        const flake = this.components[i];
        fill(flake.colorH, flake.colorS, flake.colorL);
        ellipse(flake.xPosition, flake.yPosition, flake.size, flake.size);
        flake.yPosition += flake.speed;
        if (flake.yPosition - flake.size / 2 > canvasHeight) {
            flake.yPosition = 0 - flake.size / 2;
        }
    }
};

function Clouds(numOfComponents, backgroundH, backgroundS, backgroundL) {
    Weather.call(this, numOfComponents, backgroundH, backgroundS, backgroundL);
    this.speedMin = 0.1;
    this.speedMax = 2;
    this.speedLow = 0.2;
    this.speedHigh = 1;
}

Clouds.prototype = Object.create(Weather.prototype);

Clouds.prototype.render = function() {
    background(this.backgroundH, this.backgroundS, this.backgroundL);
    for (let i = 0; i < this.components.length; i++) {
        const cloud = this.components[i];
        fill(cloud.colorH, cloud.colorS, cloud.colorL);
        ellipse(cloud.xPosition, cloud.yPosition, cloud.size, cloud.size / 2);
        cloud.xPosition += cloud.speed;
        if (cloud.xPosition - cloud.size / 2 > canvasWidth) {
            cloud.xPosition = 0 - cloud.size / 2;
        }
    }
};

function Component(size, colorH, colorS, colorL) {
    this.size = size;
    this.colorH = colorH;
    this.colorS = colorS;
    this.colorL = colorL;
    this.speed = randFloat(scene.speedLow, scene.speedHigh);
    this.xPosition = randNum(0, canvasWidth + this.size);
    this.yPosition = randNum(0, canvasHeight + this.size);
}

const defaultRain = new Rain(25, 183, 4, 62);
const defaultSnow = new Snow(60, 183, 4, 86);
const defaultClouds = new Clouds(100, 212, 79, 73);

let scene = defaultRain;
$('#quantity-slider').slider();
$('#speed-slider').slider();
scene.setControls();

function setup() {
    colorMode(HSL);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('container');
    noStroke();
    scene.collectComponents(5, 181, 100, 50);
}

function draw() {
    scene.render();
}

const dropdown = document.getElementById('choose');
dropdown.addEventListener('input', function() {
    if (this.value === 'rain') {
        scene = defaultRain;
        scene.components = [];
        scene.setControls();
        scene.collectComponents(5, 181, 100, 50);
    } else if (this.value === 'snow') {
        scene = defaultSnow;
        scene.components = [];
        scene.setControls();
        scene.collectComponents(10, 0, 10, 97);
    } else if (this.value === 'clouds') {
        scene = defaultClouds;
        scene.components = [];
        scene.setControls();
        scene.collectComponents(150, 183, 4, 93);
    }
});

$(function() {
    $('#quantity-slider').slider({
        min: 1,
        max: 100,
        change: function(event, ui) {
            if (scene.numOfComponents > ui.value) {
                scene.components.splice(ui.value);
            } else if (scene.numOfComponents < ui.value) {
                for (let i = 0; i < (ui.value - scene.numOfComponents); i++) {
                    scene.components.push(new Component(5, 181, 100, 50));
                }
            }
            scene.numOfComponents = ui.value;
        }
    });
});

$(function() {
    $('#speed-slider').slider({
        range: true,
        min: scene.speedMin,
        max: scene.speedMax,
        values: [scene.speedLow, scene.speedHigh],
        step: 0.1,
        change: function(event, ui) {
            for (let i = 0; i < scene.components.length; i++) {
                scene.components[i].speed = randFloat(ui.values[0], ui.values[1]);
            }
            scene.speedLow = ui.values[0];
            scene.speedHigh = ui.values[1];
        console.log(scene.speedLow, scene.speedHigh);
            
        }
    });
});

// $(function() {
//     $('#size-slider').slider({
//         range: true,
//         min: 0,
//         max: 360,
//         values: [100, 200],
//     });
// });

// $(function() {
//     $('#color-slider').slider({
//         range: true,
//         min: 0,
//         max: 360,
//         values: [100, 200],
//     });
// });

