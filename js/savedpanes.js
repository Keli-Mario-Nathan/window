


function createRows() {
    const tbody = document.querySelector('Panes');
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    const unserInput = document.createElement('td');
    unserInput.textContent = '         ';
    tr.appendChild(unserInput);

    for(let i = 0; i < '              '; i++) {
        const td = document.createElement('td');
        td.textContent = this.cookiesArray[i];
        tr.appendChild(td);

    }
}

createRows();