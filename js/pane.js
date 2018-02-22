'use strict';

const canvasWidth = 800;
const canvasHeight = 600;

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function Weather() {
    this.components = [];
    this.savedAs = 'myPane';
}

Weather.prototype.collectComponents = function() {
    for (let i = 0; i < this.numOfComponents; i++) {
        this.components.push(new Component());
    }
};

Weather.prototype.setControls = function() {
    $('#quantity-slider').slider('option', 'max', this.quantityMax);
    $('#quantity-slider').slider('option', 'value', this.numOfComponents);
    $('#bg-hue-slider').slider('option', 'value', this.backgroundH);
    $('#bg-sat-slider').slider('option', 'value', this.backgroundS);
    $('#bg-light-slider').slider('option', 'value', this.backgroundL);
    $('#speed-slider').slider('option', 'min', this.speedMin);
    $('#speed-slider').slider('option', 'max', this.speedMax);
    $('#speed-slider').slider('option', 'values', [this.speedLow, this.speedHigh]);
    $('#size-slider').slider('option', 'min', this.sizeMin);
    $('#size-slider').slider('option', 'max', this.sizeMax);
    $('#size-slider').slider('option', 'values', [this.sizeLow, this.sizeHigh]);
    $('#component-hue-slider').slider('option', 'values', [this.colorHLow, this.colorHHigh]);
    $('#component-sat-slider').slider('option', 'values', [this.colorSLow, this.colorSHigh]);
    $('#component-light-slider').slider('option', 'values', [this.colorLLow, this.colorLHigh]);
};

function Rain() {
    Weather.call(this);
    this.weatherType = 'rain';
    this.numOfComponents = 125;
    this.backgroundH = 183;
    this.backgroundS = 4;
    this.backgroundL = 62;
    this.quantityMax = 400;
    this.speedMin = 3;
    this.speedMax = 10;
    this.speedLow = 4;
    this.speedHigh = 7;
    this.sizeMin = 2;
    this.sizeMax = 20;
    this.sizeLow = 4;
    this.sizeHigh = 6;
    this.colorHLow = 185;
    this.colorSLow = 90;
    this.colorLLow = 65;
    this.colorHHigh = 190;
    this.colorSHigh = 100;
    this.colorLHigh = 80;
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

function Snow() {
    Weather.call(this);
    this.weatherType = 'snow';
    this.numOfComponents = 60;
    this.backgroundH = 183;
    this.backgroundS = 4;
    this.backgroundL = 86;
    this.quantityMax = 300;
    this.speedMin = 2;
    this.speedMax = 6;
    this.speedLow = 3;
    this.speedHigh = 5;
    this.sizeMin = 2;
    this.sizeMax = 20;
    this.sizeLow = 9;
    this.sizeHigh = 12;
    this.colorHLow = 190;
    this.colorSLow = 0;
    this.colorLLow = 90;
    this.colorHHigh = 210;
    this.colorSHigh = 20;
    this.colorLHigh = 100;
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

function Clouds() {
    Weather.call(this);
    this.numOfComponents = 100;
    this.weatherType = 'clouds';
    this.backgroundH = 212;
    this.backgroundS = 79;
    this.backgroundL = 73;
    this.quantityMax = 200;
    this.speedMin = 0.1;
    this.speedMax = 2;
    this.speedLow = 0.2;
    this.speedHigh = 0.7;
    this.sizeMin = 100;
    this.sizeMax = 300;
    this.sizeLow = 130;
    this.sizeHigh = 260;
    this.colorHLow = 200;
    this.colorSLow = 0;
    this.colorLLow = 90;
    this.colorHHigh = 220;
    this.colorSHigh = 10;
    this.colorLHigh = 100;
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

function Component() {
    this.size = randNum(scene.sizeLow, scene.sizeHigh);
    this.speed = randFloat(scene.speedLow, scene.speedHigh);
    this.colorH = randNum(scene.colorHLow, scene.colorHHigh);
    this.colorS = randNum(scene.colorSLow, scene.colorSHigh);
    this.colorL = randNum(scene.colorLLow, scene.colorLHigh);
    this.xPosition = randNum(0 - this.size / 2, canvasWidth + this.size / 2);
    this.yPosition = randNum(0 - this.size / 2, canvasHeight + this.size / 2);
}

const rainPane = new Rain();
const snowPane = new Snow();
const cloudPane = new Clouds();


const dropdown = document.getElementById('choose');

let scene;
if (localStorage.getItem('choice')) {
    switch (localStorage.getItem('choice')) {
    case 'rain':
        scene = rainPane;
        dropdown.value = 'rain';
        break;
    case 'snow':
        scene = snowPane;
        dropdown.value = 'snow';
        break;
    case 'clouds':
        scene = cloudPane;
        dropdown.value = 'clouds';
        break;
    }
    localStorage.removeItem('choice');
} else if (localStorage.getItem('requestedPane')) {
    scene = JSON.parse(localStorage.getItem('requestedPane'));
    localStorage.removeItem('requestedPane');
} else {
    scene = rainPane;
}

$('#quantity-slider').slider();
$('#bg-hue-slider').slider();
$('#bg-sat-slider').slider();
$('#bg-light-slider').slider();
$('#speed-slider').slider();
$('#size-slider').slider();
$('#component-hue-slider').slider();
$('#component-sat-slider').slider();
$('#component-light-slider').slider();
scene.setControls();

function setup() { //eslint-disable-line
    colorMode(HSL);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('container');
    noStroke();
    scene.collectComponents();
}

function draw() { //eslint-disable-line
    scene.render();
}

dropdown.addEventListener('input', function() {
    switch (this.value) {
    case 'rain':
        scene = rainPane;
        break;
    case 'snow':
        scene = snowPane;
        break;
    case 'clouds':
        scene = cloudPane;
        break;
    }
    scene.setControls();
    if (scene.components.length === 0) {
        scene.collectComponents();
    }
});

const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', function() {
    scene.savedAs = prompt('Give your pane a name:');
    scene.savedAt = moment().format('LLL'); //eslint-disable-line
    if (localStorage.getItem('savedPanes')) {
        const saved = JSON.parse(localStorage.getItem('savedPanes'));
        saved.push(scene);
        localStorage.setItem('savedPanes', JSON.stringify(saved));
    } else {
        localStorage.setItem('savedPanes', JSON.stringify([scene]));
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
                    scene.components.push(new Component());
                }
            }
            scene.numOfComponents = ui.value;
        }
    });
});

$(function() {
    $('#bg-hue-slider').slider({
        min: 0,
        max: 360,
        change: function(event, ui) {
            scene.backgroundH = ui.value;
        }
    });
});

$(function() {
    $('#bg-sat-slider').slider({
        min: 0,
        max: 100,
        change: function(event, ui) {
            scene.backgroundS = ui.value;
        }
    });
});

$(function() {
    $('#bg-light-slider').slider({
        min: 0,
        max: 100,
        change: function(event, ui) {
            scene.backgroundL = ui.value;
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
    $('#component-hue-slider').slider({
        range: true,
        min: 0,
        max: 360,
        change: function(event, ui) {
            for (let i = 0; i < scene.components.length; i++) {
                scene.components[i].colorH = randNum(ui.values[0], ui.values[1]);
            }
            scene.colorHLow = ui.values[0];
            scene.colorHHigh = ui.values[1];
        }
    });
});

$(function() {
    $('#component-sat-slider').slider({
        range: true,
        min: 0,
        max: 100,
        change: function(event, ui) {
            for (let i = 0; i < scene.components.length; i++) {
                scene.components[i].colorS = randNum(ui.values[0], ui.values[1]);
            }
            scene.colorSLow = ui.values[0];
            scene.colorSHigh = ui.values[1];
        }
    });
});

$(function() {
    $('#component-light-slider').slider({
        range: true,
        min: 0,
        max: 100,
        change: function(event, ui) {
            for (let i = 0; i < scene.components.length; i++) {
                scene.components[i].colorL = randNum(ui.values[0], ui.values[1]);
            }
            scene.colorLLow = ui.values[0];
            scene.colorLHigh = ui.values[1];
        }
    });
});