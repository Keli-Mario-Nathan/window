

function createRows() {
    var tbody = document.getElementById("Panes");
    var row = tbody.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Name";
    cell2.innerHTML = "Feb. 2018";
    cell3.innerHTML = "?";;
}
createRows();