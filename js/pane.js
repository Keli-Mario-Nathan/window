'use strict';

const canvasWidth = 800;
const canvasHeight = 600;

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function Weather(quantityCurrent, quantityMax, backgroundH, backgroundS, backgroundL, speedMin, speedMax, speedLower, speedUpper, sizeMin, sizeMax, sizeLower, sizeUpper, colorHLower, colorHUpper, colorSLower, colorSUpper, colorLLower, colorLUpper) {
    this.components = [];
    this.quantity = {
        current: quantityCurrent,
        max: quantityMax
    };
    this.background = {
        hue: backgroundH,
        saturation: backgroundS,
        lightness: backgroundL
    };
    this.speed = {
        min: speedMin,
        max: speedMax,
        lower: speedLower,
        upper: speedUpper
    };
    this.size = {
        min: sizeMin,
        max: sizeMax,
        lower: sizeLower,
        upper: sizeUpper};
    this.color = {
        hue: {
            lower: colorHLower,
            upper: colorHUpper
        },
        saturation: {
            lower: colorSLower,
            upper: colorSUpper
        },
        lightness: {
            lower: colorLLower,
            upper: colorLUpper
        }
    };
}

Weather.prototype.collectComponents = function() {
    for (let i = 0; i < this.quantity.current; i++) {
        this.components.push(new Component());
    }
};

Weather.prototype.setControls = function() {
    $('#quantity-slider').slider('option', 'max', this.quantity.max);
    $('#quantity-slider').slider('option', 'value', this.quantity.current);
    $('#bg-hue-slider').slider('option', 'value', this.background.hue);
    $('#bg-sat-slider').slider('option', 'value', this.background.saturation);
    $('#bg-light-slider').slider('option', 'value', this.background.lightness);
    $('#speed-slider').slider('option', 'min', this.speed.min);
    $('#speed-slider').slider('option', 'max', this.speed.max);
    $('#speed-slider').slider('option', 'values', [this.speed.lower, this.speed.upper]);
    $('#size-slider').slider('option', 'min', this.size.min);
    $('#size-slider').slider('option', 'max', this.size.max);
    $('#size-slider').slider('option', 'values', [this.size.lower, this.size.upper]);
    $('#component-hue-slider').slider('option', 'values', [this.color.hue.lower, this.color.hue.upper]);
    $('#component-sat-slider').slider('option', 'values', [this.color.saturation.lower, this.color.saturation.upper]);
    $('#component-light-slider').slider('option', 'values', [this.color.lightness.lower, this.color.lightness.upper]);
};

function Rain(quantityCurrent, quantityMax, backgroundH, backgroundS, backgroundL, speedMin, speedMax, speedLower, speedUpper, sizeMin, sizeMax, sizeLower, sizeUpper, colorHLower, colorHUpper, colorSLower, colorSUpper, colorLLower, colorLUpper) {
    Weather.call(this, quantityCurrent, quantityMax, backgroundH, backgroundS, backgroundL, speedMin, speedMax, speedLower, speedUpper, sizeMin, sizeMax, sizeLower, sizeUpper, colorHLower, colorHUpper, colorSLower, colorSUpper, colorLLower, colorLUpper);
    this.weatherType = 'rain';
}

Rain.prototype = Object.create(Weather.prototype);

Rain.prototype.render = function() {
    background(this.background.hue, this.background.saturation, this.background.lightness);
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

function Snow(quantityCurrent, quantityMax, backgroundH, backgroundS, backgroundL, speedMin, speedMax, speedLower, speedUpper, sizeMin, sizeMax, sizeLower, sizeUpper, colorHLower, colorHUpper, colorSLower, colorSUpper, colorLLower, colorLUpper) {
    Weather.call(this, quantityCurrent, quantityMax, backgroundH, backgroundS, backgroundL, speedMin, speedMax, speedLower, speedUpper, sizeMin, sizeMax, sizeLower, sizeUpper, colorHLower, colorHUpper, colorSLower, colorSUpper, colorLLower, colorLUpper);
    this.weatherType = 'snow';
}

Snow.prototype = Object.create(Weather.prototype);

Snow.prototype.render = function() {
    background(this.background.hue, this.background.saturation, this.background.lightness);
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

function Clouds(quantityCurrent, quantityMax, backgroundH, backgroundS, backgroundL, speedMin, speedMax, speedLower, speedUpper, sizeMin, sizeMax, sizeLower, sizeUpper, colorHLower, colorHUpper, colorSLower, colorSUpper, colorLLower, colorLUpper) {
    Weather.call(this, quantityCurrent, quantityMax, backgroundH, backgroundS, backgroundL, speedMin, speedMax, speedLower, speedUpper, sizeMin, sizeMax, sizeLower, sizeUpper, colorHLower, colorHUpper, colorSLower, colorSUpper, colorLLower, colorLUpper);
    this.weatherType = 'clouds';
}

Clouds.prototype = Object.create(Weather.prototype);

Clouds.prototype.render = function() {
    background(this.background.hue, this.background.saturation, this.background.lightness);
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
    this.size = randNum(scene.size.lower, scene.size.upper);
    this.speed = randFloat(scene.speed.lower, scene.speed.upper);
    this.colorH = randNum(scene.color.hue.lower, scene.color.hue.upper);
    this.colorS = randNum(scene.color.saturation.lower, scene.color.saturation.upper);
    this.colorL = randNum(scene.color.lightness.lower, scene.color.lightness.upper);
    this.xPosition = randNum(0 - this.size / 2, canvasWidth + this.size / 2);
    this.yPosition = randNum(0 - this.size / 2, canvasHeight + this.size / 2);
}

const rainPane = new Rain(125, 400, 183, 4, 62, 3, 10, 4, 7, 2, 20, 4, 6, 185, 190, 90, 100, 65, 80);
const snowPane = new Snow(60, 300, 183, 4, 86, 2, 6, 3, 5, 2, 20, 9, 12, 190, 210, 0, 20, 90, 100);
const cloudPane = new Clouds(100, 200, 212, 79, 73, 0.1, 2, 0.2, 0.7, 100, 300, 130, 260, 200, 220, 0, 10, 90, 100);


const dropdown = document.getElementById('choose');

let scene = rainPane;
dropdown.value = 'rain';
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
createSliderLabels();
fillSliderLabels();

if (localStorage.getItem('choice')) {
    switch (localStorage.getItem('choice')) {
    case 'rain':
        scene = rainPane;
        dropdown.value = 'rain';
        fillSliderLabels();
        break;
    case 'snow':
        scene = snowPane;
        dropdown.value = 'snow';
        fillSliderLabels();
        break;
    case 'clouds':
        scene = cloudPane;
        dropdown.value = 'clouds';
        fillSliderLabels();
        break;
    }
    localStorage.removeItem('choice');
} else if (localStorage.getItem('requestedPane')) {
    const rawScene = JSON.parse(localStorage.getItem('requestedPane'));
    localStorage.removeItem('requestedPane');
    switch (rawScene.weatherType) {
    case 'rain':
        scene = new Rain(rawScene.quantity.current, rawScene.quantity.max, rawScene.background.hue, rawScene.background.saturation, rawScene.background.lightness, rawScene.speed.min, rawScene.speed.max, rawScene.speed.lower, rawScene.speed.upper, rawScene.size.min, rawScene.size.max, rawScene.size.lower, rawScene.size.upper, rawScene.color.hue.lower, rawScene.color.hue.upper, rawScene.color.saturation.lower, rawScene.color.saturation.upper, rawScene.color.lightness.lower, rawScene.color.lightness.upper);
        scene.savedAs = rawScene.savedAs;
        dropdown.value = 'rain';
        fillSliderLabels();
        break;
    case 'snow':
        scene = new Snow(rawScene.quantity.current, rawScene.quantity.max, rawScene.background.hue, rawScene.background.saturation, rawScene.background.lightness, rawScene.speed.min, rawScene.speed.max, rawScene.speed.lower, rawScene.speed.upper, rawScene.size.min, rawScene.size.max, rawScene.size.lower, rawScene.size.upper, rawScene.color.hue.lower, rawScene.color.hue.upper, rawScene.color.saturation.lower, rawScene.color.saturation.upper, rawScene.color.lightness.lower, rawScene.color.lightness.upper);
        scene.savedAs = rawScene.savedAs;
        dropdown.value = 'snow';
        fillSliderLabels();
        break;
    case 'clouds':
        scene = new Clouds(rawScene.quantity.current, rawScene.quantity.max, rawScene.background.hue, rawScene.background.saturation, rawScene.background.lightness, rawScene.speed.min, rawScene.speed.max, rawScene.speed.lower, rawScene.speed.upper, rawScene.size.min, rawScene.size.max, rawScene.size.lower, rawScene.size.upper, rawScene.color.hue.lower, rawScene.color.hue.upper, rawScene.color.saturation.lower, rawScene.color.saturation.upper, rawScene.color.lightness.lower, rawScene.color.lightness.upper);
        scene.savedAs = rawScene.savedAs;
        dropdown.value = 'clouds';
        fillSliderLabels();
        break;
    }
}


function setup() { //eslint-disable-line
    colorMode(HSL);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('container');
    noStroke();
    scene.collectComponents();
}

function draw() { //eslint-disable-line
    scene.render();
    // noLoop();
}

dropdown.addEventListener('input', function() {
    switch (this.value) {
    case 'rain':
        scene = rainPane;
        fillSliderLabels();
        break;
    case 'snow':
        scene = snowPane;
        fillSliderLabels();
        break;
    case 'clouds':
        scene = cloudPane;
        fillSliderLabels();
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
    if (!scene.savedAs) {
        scene.savedAs = 'myPane';
    }
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
        max: scene.quantity.max,
        change: function(event, ui) {
            if (scene.quantity.current > ui.value) {
                scene.components.splice(ui.value);
            } else if (scene.quantity.current < ui.value) {
                for (let i = 0; i < (ui.value - scene.quantity.current); i++) {
                    scene.components.push(new Component());
                }
            }
            scene.quantity.current = ui.value;
        }
    });
});

$(function() {
    $('#bg-hue-slider').slider({
        min: 0,
        max: 360,
        change: function(event, ui) {
            scene.background.hue = ui.value;
        }
    });
});

$(function() {
    $('#bg-sat-slider').slider({
        min: 0,
        max: 100,
        change: function(event, ui) {
            scene.background.saturation = ui.value;
        }
    });
});

$(function() {
    $('#bg-light-slider').slider({
        min: 0,
        max: 100,
        change: function(event, ui) {
            scene.background.lightness = ui.value;
        }
    });
});

$(function() {
    $('#speed-slider').slider({
        range: true,
        min: scene.speed.min,
        max: scene.speed.max,
        values: [scene.speed.lower, scene.speed.upper],
        step: 0.1,
        change: function(event, ui) {
            for (let i = 0; i < scene.components.length; i++) {
                scene.components[i].speed = randFloat(ui.values[0], ui.values[1]);
            }
            scene.speed.lower = ui.values[0];
            scene.speed.upper = ui.values[1];
        }
    });
});

$(function() {
    $('#size-slider').slider({
        range: true,
        min: scene.size.min,
        max: scene.size.max,
        values: [scene.size.lower, scene.size.upper],
        step: 0.1,
        change: function(event, ui) {
            for (let i = 0; i < scene.components.length; i++) {
                scene.components[i].size = randNum(ui.values[0], ui.values[1]);
            }
            scene.size.lower = ui.values[0];
            scene.size.upper = ui.values[1];
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
            scene.color.hue.lower = ui.values[0];
            scene.color.hue.upper = ui.values[1];
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
            scene.color.saturation.lower = ui.values[0];
            scene.color.saturation.upper = ui.values[1];
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
            scene.color.lightness.lower = ui.values[0];
            scene.color.lightness.upper = ui.values[1];
        }
    });
});

function createSliderLabels() {
    const controlPanel = document.getElementById('controls');
    const sliders = document.getElementsByClassName('ui-slider');
    for (let i = 0; i < sliders.length; i++) {
        const p = document.createElement('p');
        controlPanel.insertBefore(p, sliders[i]);
    }
}

function fillSliderLabels() {
    let componentType;
    if (scene instanceof Rain) {
        componentType = 'drop';
    } else if (scene instanceof Snow) {
        componentType = 'flake';
    } else if (scene instanceof Clouds) {
        componentType = 'cloud';
    }
    const sliderLabels = [
        'number of ' + componentType + 's',
        'background hue',
        'background saturation',
        'background lightness',
        'speed of ' + componentType + 's',
        'size of ' + componentType + 's',
        componentType + ' hue',
        componentType + ' saturation',
        componentType + ' lightness'
    ];
    const p = document.querySelectorAll('#controls p');
    for (let i = 0; i < sliderLabels.length; i++) {
        p[i].textContent = sliderLabels[i];
    }
}