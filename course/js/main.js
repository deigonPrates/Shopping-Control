
var list = [
    {"desc":"rice","amount": "1", "value": "5.40"},
    {"desc":"beer","amount": "12", "value": "1.99"},
    {"desc":"meat","amount": "1", "value": "15.00"},
];

function getTotal(list) {
    var total = 0;

    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    return total;
}
function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr><tbody>';

    for(var key in list){
        table += '<tr><td>'+formatText(list[key].desc)+'</td><td>'+list[key].amount+'</td><td>'+formatNumber(list[key].value)+'</td><td><button onclick="updateData('+key+');" class="btn btn-default">Edit</button> | Delete</td></tr>';
    }
    table += '</tbody>';

    document.getElementById('listTable').innerHTML = table;
}
setList(list);

function formatText(text) {
    var str = text.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}
function formatNumber(number) {
    var str = parseFloat(number).toFixed(2) + "";
    str = str.replace(".",",");
    str = '$ '+ str;
    return str;
}
function addData() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({"desc":desc,"amount":amount,"value":value});
    setList(list);
}
function updateData(id) {
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;

    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
}
function resetForm() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";

    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
}


/*
console.log(getTotal(list));
*/