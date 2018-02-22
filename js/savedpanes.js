

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

const userSettings = document.getElementById();
userSettings.addEventListener('submit', function() {
    event.preventDefault();
    const numOfComponents = this[].value
    const backgroundH = this[].value
    const backgroundS = this[].value
    const backgroundL = this[].value
    const speed = this[].value
    const size = this[].value
    const colorH = this[].value
    const colorS = this[].value
    const colorL = this[].value
    
const settings = {numOfComponents: numOfComponents,}


});
createRows();