'use strict';

const chooser = document.getElementById('choose2');
chooser.addEventListener('input', function() {
    const choice = this.value;
    localStorage.setItem('choice', choice);
    window.location.href = 'pane.html';
});

