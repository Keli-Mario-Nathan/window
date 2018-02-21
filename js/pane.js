'use strict';

const canvasWidth = 800;
const canvasHeight = 600;

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function Weather(backgroundH, backgroundS, backgroundL) {
    this.components = [];
    this.backgroundH = backgroundH;
    this.backgroundS = backgroundS;
    this.backgroundL = backgroundL;
}

Weather.prototype.collectComponents = function(colorH, colorS, colorL) {
    for (let i = 0; i < this.numOfComponents; i++) {
        this.components.push(new Component(colorH, colorS, colorL));
    }
};

Weather.prototype.setControls = function() {
    $('#quantity-slider').slider('option', 'max', scene.quantityMax);
    $('#quantity-slider').slider('option', 'value', scene.numOfComponents);
    $('#speed-slider').slider('option', 'min', this.speedMin);
    $('#speed-slider').slider('option', 'max', this.speedMax);
    $('#speed-slider').slider('option', 'values', [this.speedLow, this.speedHigh]);
    $('#size-slider').slider('option', 'min', this.sizeMin);
    $('#size-slider').slider('option', 'max', this.sizeMax);
    $('#size-slider').slider('option', 'values', [this.sizeLow, this.sizeHigh]);
};

function Rain(backgroundH, backgroundS, backgroundL) {
    Weather.call(this, backgroundH, backgroundS, backgroundL);
    this.numOfComponents = 25;
    this.quantityMax = 400;
    this.speedMin = 3;
    this.speedMax = 10;
    this.speedLow = 4;
    this.speedHigh = 8;
    this.sizeMin = 2;
    this.sizeMax = 20;
    this.sizeLow = 4;
    this.sizeHigh = 6;
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
            drop.xPosition = randNum(0, canvasWidth + drop.size);
        }
    }
};

function Snow(backgroundH, backgroundS, backgroundL) {
    Weather.call(this, backgroundH, backgroundS, backgroundL);
    this.numOfComponents = 60;
    this.quantityMax = 300;
    this.speedMin = 2;
    this.speedMax = 6;
    this.speedLow = 3;
    this.speedHigh = 5;
    this.sizeMin = 2;
    this.sizeMax = 20;
    this.sizeLow = 9;
    this.sizeHigh = 12;
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
            flake.xPosition = randNum(0, canvasWidth + flake.size);
        }
    }
};

function Clouds(backgroundH, backgroundS, backgroundL) {
    Weather.call(this, backgroundH, backgroundS, backgroundL);
    this.numOfComponents = 100;
    this.quantityMax = 200;
    this.speedMin = 0.1;
    this.speedMax = 2;
    this.speedLow = 0.2;
    this.speedHigh = 1;
    this.sizeMin = 100;
    this.sizeMax = 300;
    this.sizeLow = 120;
    this.sizeHigh = 160;
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
            cloud.yPosition = randNum(0, canvasHeight + cloud.size);
        }
    }
};

function Component(colorH, colorS, colorL) {
    this.size = randNum(scene.sizeLow, scene.sizeHigh);
    this.colorH = colorH;
    this.colorS = colorS;
    this.colorL = colorL;
    this.speed = randFloat(scene.speedLow, scene.speedHigh);
    this.xPosition = randNum(0, canvasWidth + this.size);
    this.yPosition = randNum(0, canvasHeight + this.size);
}

const rainPane = new Rain(183, 4, 62);
const snowPane = new Snow(183, 4, 86);
const cloudPane = new Clouds(212, 79, 73);

let scene = rainPane;
$('#quantity-slider').slider();
$('#speed-slider').slider();
$('#size-slider').slider();
scene.setControls();

function setup() {
    colorMode(HSL);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('container');
    noStroke();
    scene.collectComponents(181, 100, 50);
}

function draw() {
    scene.render();
}

const dropdown = document.getElementById('choose');
dropdown.addEventListener('input', function() {
    if (this.value === 'rain') {
        scene = rainPane;
        scene.setControls();
        if (scene.components.length === 0) {
            scene.collectComponents(181, 100, 50);
        }
    } else if (this.value === 'snow') {
        scene = snowPane;
        scene.setControls();
        if (scene.components.length === 0) {
            scene.collectComponents(0, 10, 97);
        }
    } else if (this.value === 'clouds') {
        scene = cloudPane;
        scene.setControls();
        if (scene.components.length === 0) {
            scene.collectComponents(183, 4, 93);
        }
    }
});

$(function() {
    $('#quantity-slider').slider({
        min: 1,
        max: scene.quantityMax,
        change: function(event, ui) {
            if (scene.numOfComponents > ui.value) {
                scene.components.splice(ui.value);
            } else if (scene.numOfComponents < ui.value) {
                for (let i = 0; i < (ui.value - scene.numOfComponents); i++) {
                    scene.components.push(new Component(181, 100, 50));
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
        }
    });
});

$(function() {
    $('#size-slider').slider({
        range: true,
        min: scene.sizeMin,
        max: scene.sizeMax,
        values: [scene.sizeLow, scene.sizeHigh],
        step: 0.1,
        change: function(event, ui) {
            for (let i = 0; i < scene.components.length; i++) {
                scene.components[i].size = randNum(ui.values[0], ui.values[1]);
            }
            scene.sizeLow = ui.values[0];
            scene.sizeHigh = ui.values[1];
        }
    });
});

$(function() {
    $('#bg-hue-slider').slider({
        range: true,
        min: 0,
        max: 360,
        values: [100, 200],
    });
});

$(function() {
    $('#bg-sat-slider').slider({
        range: true,
        min: 0,
        max: 100,
        values: [100, 200],
    });
});

$(function() {
    $('#bg-light-slider').slider({
        range: true,
        min: 0,
        max: 100,
        values: [100, 200],
    });
});

$(function() {
    $('#component-hue-slider').slider({
        range: true,
        min: 0,
        max: 360,
        values: [100, 200],
    });
});

$(function() {
    $('#component-sat-slider').slider({
        range: true,
        min: 0,
        max: 100,
        values: [100, 200],
    });
});

$(function() {
    $('#component-light-slider').slider({
        range: true,
        min: 0,
        max: 100,
        values: [100, 200],
    });
});