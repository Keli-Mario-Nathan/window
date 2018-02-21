'use strict';


let speedMin = 3;
let speedMax = 4;

$(function() {
    $('#quantity-slider').slider({
        range: true,
        min: 1,
        max: 12,
        values: [speedMin, speedMax],
        change: function( event, ui ) {
            if (ui.handleIndex === 0) {
                speedMin = ui.values[0];
            } else if (ui.handleIndex === 1) {
                speedMax = ui.values[1];
            }
            for (let i = 0; i < scene.components.length; i++) {
                scene.components[i].speed = randNum(speedMin, speedMax);
            }
        }
    });
});
$(function() {
    $('#speed-slider').slider({
        range: true,
        min: 0,
        max: 360,
        values: [100, 200],
        change: function( event, ui ) {
            console.log(ui.values);
        }
    });
});
$(function() {
    $('#size-slider').slider({
        range: true,
        min: 0,
        max: 360,
        values: [100, 200],
    });
});
$(function() {
    $('#color-slider').slider({
        range: true,
        min: 0,
        max: 360,
        values: [100, 200],
    });
});

const canvasWidth = 800;
const canvasHeight = 400;

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

function Rain(numOfComponents, backgroundColorH, backgroundColorS, backgroundColorL) {
    Weather.call(this, numOfComponents, backgroundColorH, backgroundColorS, backgroundColorL);
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
    this.speed = randNum(speedMin, speedMax);
    this.xPosition = randNum(0, canvasWidth + this.size);
    this.yPosition = randNum(0, canvasHeight + this.size);
}

const defaultRain = new Rain(25, 183, 4, 62);
const defaultSnow = new Snow(60, 183, 4, 86);
const defaultClouds = new Clouds(100, 212, 79, 73);

let scene = defaultRain;

function setup() {
    colorMode(HSL);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('container');
    noStroke();
    scene.collectComponents(5, 181, 100, 50, 8);
}

function draw() {
    scene.render();
}

const dropdown = document.getElementById('choose');
dropdown.addEventListener('input', function() {
    if (this.value === 'rain') {
        scene = defaultRain;
        scene.components = [];
        scene.collectComponents(5, 181, 100, 50);
    } else if (this.value === 'snow') {
        scene = defaultSnow;
        scene.components = [];
        scene.collectComponents(10, 0, 10, 97);
    } else if (this.value === 'clouds') {
        scene = defaultClouds;
        scene.components = [];
        scene.collectComponents(150, 183, 4, 93);
    }
});