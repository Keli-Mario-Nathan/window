'use strict';

function createRows() {
    const tbody = document.getElementById('Panes');
    const row = tbody.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerHTML = 'Name';
    cell2.innerHTML = 'Feb. 2018';
    cell3.innerHTML = '?';;
}

function time(){
    const date = '2018-02-21';
    const format = 'LLLL';
    const result = moment(date).format(format);
    console.log(result);
}

createRows();
time();