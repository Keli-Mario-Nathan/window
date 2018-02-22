'use strict';

const choices = document.getElementById('choices');
choices.addEventListener('input', function() {
    localStorage.setItem('choice', event.target.value);
    choices.parentElement.reset();
    window.location.href = 'pane.html';
});