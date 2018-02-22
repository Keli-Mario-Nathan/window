'use strict';

const tbody = document.getElementById('panes');

if (localStorage.getItem('savedPanes')) {
    const saved = JSON.parse(localStorage.getItem('savedPanes'));
    for (let i = 0; i < saved.length; i++) {
        const row = tbody.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        const cell3 = row.insertCell();
        cell1.textContent = saved[i].savedAs;
        cell2.textContent = saved[i].savedAt;
        cell3.textContent = 'Go!';
        cell3.addEventListener('click', function() {
            event.preventDefault;
            localStorage.setItem('requestedPane', JSON.stringify(saved[i]));
            window.location.href = 'pane.html';
        });
    }
}
// function createRows() {
//     const tbody = document.getElementById('Panes');
//     const row = tbody.insertRow(0);
//     const cell1 = row.insertCell(0);
//     const cell2 = row.insertCell(1);
//     const cell3 = row.insertCell(2);
//     cell1.innerHTML = 'Name';
//     cell2.innerHTML = 'Feb. 2018';
//     cell3.innerHTML = '?';;
// }

// createRows();