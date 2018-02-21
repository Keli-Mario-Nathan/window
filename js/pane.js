'use strict';



// $(function() {
//     $('#quantity-slider').slider({
//         range: true,
//         min: 1,
//         max: 12,
//         values: [speedMin, speedMax],
//         change: function( event, ui ) {
//             console.log(ui.values);
//         }
//     });
// });

$(function() {
    const speedSlider = $('#speed-slider').slider({
        range: true,
        step: 0.1,
        change: function( event, ui ) {
            for (let i = 0; i < scene.components.length; i++) {
                scene.components[i].speed = randFloat(ui.values[0], ui.values[1]);
            }
        }
    });
});

// jQuery(document).ready(function ($) {
//     var price = $("#price").slider({
//         id: "AmazonPrice",
//         min: 0,
//         max: 5000,
//         range: true,
//         value: [0, 5000],
//     });

//     price.change(function () {
//         val = $(this).slider("option", "value");
//         console.log(val);
//     });
// });

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

const canvasWidth = 800;
const canvasHeight = 400;

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function Weather(numOfComponents, backgroundColorH, backgroundColorS, backgroundColorL) {
    this.components = [];
    this.numOfComponents = numOfComponents;
    this.backgroundColorH = backgroundColorH;
    this.backgroundColorS = backgroundColorS;
    this.backgroundColorL = backgroundColorL;
}

Weather.prototype.collectComponents = function(size, colorH, colorS, colorL) {
    for (let i = 0; i < this.numOfComponents; i++) {
        this.components.push(new Component(size, colorH, colorS, colorL));
    }
};

Weather.prototype.setRanges = function() {
    $('#speed-slider').slider('option', 'min', this.speedMin);
    $('#speed-slider').slider('option', 'max', this.speedMax);
    const midRange = (this.speedMax - this.speedMin) / 2;
    $('#speed-slider').slider('option', 'values', [midRange - 1 + this.speedMin, midRange + 1 + this.speedMin]);
};

function Rain(numOfComponents, backgroundColorH, backgroundColorS, backgroundColorL) {
    Weather.call(this, numOfComponents, backgroundColorH, backgroundColorS, backgroundColorL);
    this.speedMin = 3;
    this.speedMax = 10;
}

Rain.prototype = Object.create(Weather.prototype);

Rain.prototype.render = function() {
    background(this.backgroundColorH, this.backgroundColorS, this.backgroundColorL);
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

function Snow(numOfComponents, backgroundColorH, backgroundColorS, backgroundColorL) {
    Weather.call(this, numOfComponents, backgroundColorH, backgroundColorS, backgroundColorL);
    this.speedMin = 2;
    this.speedMax = 6;
}

Snow.prototype = Object.create(Weather.prototype);

Snow.prototype.render = function() {
    background(this.backgroundColorH, this.backgroundColorS, this.backgroundColorL);
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

function Clouds(numOfComponents, backgroundColorH, backgroundColorS, backgroundColorL) {
    Weather.call(this, numOfComponents, backgroundColorH, backgroundColorS, backgroundColorL);
    this.speedMin = 0.1;
    this.speedMax = 5;
}

Clouds.prototype = Object.create(Weather.prototype);

Clouds.prototype.render = function() {
    background(this.backgroundColorH, this.backgroundColorS, this.backgroundColorL);
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
    this.speed = randFloat(scene.speedMin, scene.speedMax);
    this.xPosition = randNum(0, canvasWidth + this.size);
    this.yPosition = randNum(0, canvasHeight + this.size);
}

const defaultRain = new Rain(25, 183, 4, 62);
const defaultSnow = new Snow(60, 183, 4, 86);
const defaultClouds = new Clouds(100, 212, 79, 73);

let scene = defaultRain;
$('#speed-slider').slider();
scene.setRanges();

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
        scene.setRanges();
        scene.collectComponents(5, 181, 100, 50);
    } else if (this.value === 'snow') {
        scene = defaultSnow;
        scene.components = [];
        scene.setRanges();
        console.log(scene.speedMin, scene.speedMax);
        scene.collectComponents(10, 0, 10, 97);
    } else if (this.value === 'clouds') {
        scene = defaultClouds;
        scene.components = [];
        scene.setRanges();
        console.log(scene.speedMin, scene.speedMax);
        scene.collectComponents(150, 183, 4, 93);
    }
});

