'use strict';

const tbody = document.getElementById('panes');
// 

if (localStorage.getItem('savedPanes')) {
    const saved = JSON.parse(localStorage.getItem('savedPanes'));
    for (let i = 0; i < saved.length; i++) {
        const row = tbody.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        const cell3 = row.insertCell();
        const cell4 = row.insertCell();
        cell1.textContent = saved[i].savedAs;
        cell2.textContent = saved[i].savedAt;
        cell3.textContent = 'Go!';
        cell4.textContent = 'Delete';
        cell4.addEventListener('click', function () {
            confirm('Do you want to delete your pane?');
            event.preventDefault;
            document.getElementById('panes').deleteRow(0);
            localStorage.removeItem('requestedPane', JSON.stringify(saved[i]));
        });
        cell3.addEventListener('click', function() {
            event.preventDefault;
            localStorage.setItem('requestedPane', JSON.stringify(saved[i]));
            window.location.href = 'pane.html';
        });
    }
}

