'use strict';

const canvasWidth = 800;
const canvasHeight = 596;

function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

const defaultRain = {
    quantity: {
        current: 125,
        max: 400
    },
    background: {
        hue: 183,
        saturation: 4,
        lightness: 62
    },
    speed: {
        min: 3,
        max: 10,
        lower: 4,
        upper: 7
    },
    size: {
        min: 2,
        max: 20,
        lower: 4,
        upper: 6
    },
    color: {
        hue: {
            lower: 185,
            upper: 190
        },
        saturation: {
            lower: 90,
            upper: 100
        },
        lightness: {
            lower: 65,
            upper: 80
        }
    }
};

const defaultSnow = {
    quantity: {
        current: 60,
        max: 300
    },
    background: {
        hue: 183,
        saturation: 4,
        lightness: 86
    },
    speed: {
        min: 2,
        max: 6,
        lower: 3,
        upper: 5
    },
    size: {
        min: 2,
        max: 20,
        lower: 9,
        upper: 12
    },
    color: {
        hue: {
            lower: 190,
            upper: 210
        },
        saturation: {
            lower: 0,
            upper: 20
        },
        lightness: {
            lower: 90,
            upper: 100
        }
    }
};

const defaultClouds = {
    quantity: {
        current: 100,
        max: 200
    },
    background: {
        hue: 212,
        saturation: 69,
        lightness: 81
    },
    speed: {
        min: 0.1,
        max: 2,
        lower: 0.2,
        upper: 0.7
    },
    size: {
        min: 100,
        max: 300,
        lower: 130,
        upper: 260
    },
    color: {
        hue: {
            lower: 200,
            upper: 220
        },
        saturation: {
            lower: 0,
            upper: 10
        },
        lightness: {
            lower: 90,
            upper: 100
        }
    }
};

function Weather(weatherObject) {
    this.components = [];
    this.quantity = {
        current: weatherObject.quantity.current,
        max: weatherObject.quantity.max
    };
    this.background = {
        hue: weatherObject.background.hue,
        saturation: weatherObject.background.saturation,
        lightness: weatherObject.background.lightness
    };
    this.speed = {
        min: weatherObject.speed.min,
        max: weatherObject.speed.max,
        lower: weatherObject.speed.lower,
        upper: weatherObject.speed.upper
    };
    this.size = {
        min: weatherObject.size.min,
        max: weatherObject.size.max,
        lower: weatherObject.size.lower,
        upper: weatherObject.size.upper
    };
    this.color = {
        hue: {
            lower: weatherObject.color.hue.lower,
            upper: weatherObject.color.hue.upper
        },
        saturation: {
            lower: weatherObject.color.saturation.lower,
            upper: weatherObject.color.saturation.upper
        },
        lightness: {
            lower: weatherObject.color.lightness.lower,
            upper: weatherObject.color.lightness.upper
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

function Rain(weatherObject) {
    Weather.call(this, weatherObject);
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

function Snow(weatherObject) {
    Weather.call(this, weatherObject);
    this.weatherType = 'snow';
}

Snow.prototype = Object.create(Weather.prototype);

Snow.prototype.collectComponents = function() {
    for (let i = 0; i < this.quantity.current; i++) {
        this.components.push(new Component(Math.random() * Math.PI / 3));
    }
};

Snow.prototype.render = function() {
    background(this.background.hue, this.background.saturation, this.background.lightness);
    for (let i = 0; i < this.components.length; i++) {
        const flake = this.components[i];
        fill(flake.colorH, flake.colorS, flake.colorL);
        hexagon(flake.xPosition, flake.yPosition, flake.size, flake.hexStart);
        flake.yPosition += flake.speed;
        if (flake.yPosition - flake.size > canvasHeight) {
            flake.yPosition = 0 - flake.size;
            flake.xPosition = randNum(0, canvasWidth + flake.size);
        }
    }
};

function Clouds(weatherObject) {
    Weather.call(this, weatherObject);
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

function Component(hexStart) {
    this.size = randNum(scene.size.lower, scene.size.upper);
    this.speed = randFloat(scene.speed.lower, scene.speed.upper);
    this.colorH = randNum(scene.color.hue.lower, scene.color.hue.upper);
    this.colorS = randNum(scene.color.saturation.lower, scene.color.saturation.upper);
    this.colorL = randNum(scene.color.lightness.lower, scene.color.lightness.upper);
    this.xPosition = randNum(0 - this.size / 2, canvasWidth + this.size / 2);
    this.yPosition = randNum(0 - this.size / 2, canvasHeight + this.size / 2);
    this.hexStart = hexStart || null;
}

const rainPane = new Rain(defaultRain);
const snowPane = new Snow(defaultSnow);
const cloudPane = new Clouds(defaultClouds);

let scene = rainPane;
const dropdown = document.getElementById('choose');
dropdown.value = 'rain';

$('#quantity-slider').slider({
    min: 1,
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

$('#bg-hue-slider').slider({
    min: 0,
    max: 360,
    change: function(event, ui) {
        scene.background.hue = ui.value;
    }
});

$('#bg-sat-slider').slider({
    min: 0,
    max: 100,
    change: function(event, ui) {
        scene.background.saturation = ui.value;
    }
});

$('#bg-light-slider').slider({
    min: 0,
    max: 100,
    change: function(event, ui) {
        scene.background.lightness = ui.value;
    }
});

$('#speed-slider').slider({
    range: true,
    step: 0.1,
    change: function(event, ui) {
        for (let i = 0; i < scene.components.length; i++) {
            scene.components[i].speed = randFloat(ui.values[0], ui.values[1]);
        }
        scene.speed.lower = ui.values[0];
        scene.speed.upper = ui.values[1];
    }
});

$('#size-slider').slider({
    range: true,
    step: 0.1,
    change: function(event, ui) {
        for (let i = 0; i < scene.components.length; i++) {
            scene.components[i].size = randNum(ui.values[0], ui.values[1]);
        }
        scene.size.lower = ui.values[0];
        scene.size.upper = ui.values[1];
    }
});

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

createSliderLabels();
configureControls();

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
    configureControls();
    localStorage.removeItem('choice');
} else if (localStorage.getItem('requestedPane')) {
    const rawScene = JSON.parse(localStorage.getItem('requestedPane'));
    localStorage.removeItem('requestedPane');
    switch (rawScene.weatherType) {
    case 'rain':
        scene = new Rain(rawScene);
        dropdown.value = 'rain';
        break;
    case 'snow':
        scene = new Snow(rawScene);
        dropdown.value = 'snow';
        break;
    case 'clouds':
        scene = new Clouds(rawScene);
        dropdown.value = 'clouds';
        break;
    }
    scene.savedAs = rawScene.savedAs;
    configureControls();
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
}

$( function() {
    $('#choose').selectmenu({
        select: function(event, ui) {
            switch (ui.item.value) {
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
            configureControls();
            if (scene.components.length === 0) {
                scene.collectComponents();
            }
        }
    });
});

const form = document.getElementsByTagName('form')[0];
const nameInput = document.getElementById('pane-name');
const myPanesLink = document.getElementById('my-panes-link');
form.addEventListener('submit', function() {
    event.preventDefault();
    myPanesLink.classList.add('animated-link');
    myPanesLink.addEventListener('animationend', function() {
        myPanesLink.classList.remove('animated-link');
    });
    scene.savedAs = nameInput.value;
    if (!scene.savedAs) {
        scene.savedAs = 'My Pane';
    }
    scene.savedAt = moment().format('LLL'); //eslint-disable-line
    if (localStorage.getItem('savedPanes')) {
        const saved = JSON.parse(localStorage.getItem('savedPanes'));
        saved.push(scene);
        localStorage.setItem('savedPanes', JSON.stringify(saved));
    } else {
        localStorage.setItem('savedPanes', JSON.stringify([scene]));
    }
    this.reset();
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

function configureControls() {
    fillSliderLabels();
    scene.setControls();
}

function hexagon(x, y, radius, a) {
    const angle = TWO_PI / 6;
    beginShape();
    for (a; a < TWO_PI; a += angle) {
        const vx = x + cos(a) * radius;
        const vy = y + sin(a) * radius;
        vertex(vx, vy);
    }
    endShape(CLOSE);
}