'use strict';

const tbody = document.getElementById('panes');
const saved = JSON.parse(localStorage.getItem('savedPanes'));

buildTable();

function buildTable() {
    if (localStorage.getItem('savedPanes')) {
        for (let i = 0; i < saved.length; i++) {
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
                    saved.splice(i, 1);
                    if (saved.length) {
                        localStorage.setItem('savedPanes', JSON.stringify(saved));
                        resetTable();
                        buildTable();
                    } else {
                        localStorage.removeItem('savedPanes');
                    }
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

function resetTable() {
    const tableBodyRows = document.querySelectorAll('tbody tr');
    for (let i = 0; i < tableBodyRows.length; i++) {
        tableBodyRows[i].remove();
    }
}