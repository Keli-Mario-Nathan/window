'use strict';

const tbody = document.getElementById('panes');
const saved = JSON.parse(localStorage.getItem('savedPanes'));

cleanSavedArray();
buildTable();

function buildTable() {
    if (localStorage.getItem('savedPanes')) {
        for (let i = 0; i < saved.length; i++) {
            /*
                Nice find!
            */
            const row = tbody.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell3 = row.insertCell();
            const cell4 = row.insertCell();
            const xOut = document.createElement('img');
            xOut.src = 'images/x-out.png';
            xOut.alt = 'remove pane';
            cell1.appendChild(xOut);
            xOut.addEventListener('click', function(){
                if (confirm('Remove pane forever?')) {
                    row.remove();
                    saved[i] = 'removed';
                }
            });
            cell2.textContent = saved[i].savedAs;
            cell3.textContent = saved[i].savedAt;
            cell4.textContent = 'Go!';
            cell4.addEventListener('click', function() {
                localStorage.setItem('requestedPane', JSON.stringify(saved[i]));
                window.location.href = 'pane.html';
            });
        }
    }
}

window.addEventListener('beforeunload', function() {
    cleanSavedArray();
    if (saved.length === 0) {
        localStorage.removeItem('savedPanes');
    } else {
        localStorage.setItem('savedPanes', JSON.stringify(saved));
    }
});

function cleanSavedArray() {
    const toRemove = [];
    if (saved) {
        for (let i = 0; i < saved.length; i++) {
            if (saved[i] === 'removed') {
                toRemove.push(i);
            }
        }
        for (let i = 0; i < toRemove.length; i++) {
            saved.splice(toRemove[i], 1);
        }
    }
}
