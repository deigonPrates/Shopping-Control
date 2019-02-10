
var list = [
    {"desc":"rice","amount": "1", "value": "5.40"},
    {"desc":"beer","amount": "12", "value": "1.99"},
    {"desc":"meat","amount": "1", "value": "15.00"},
];
function getTotal(list){
    var total = 0;

    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatNumber(total);
}
function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr><tbody>';

    for(var key in list){
        table += '<tr><td>'+formatText(list[key].desc)+'</td><td>'+list[key].amount+'</td><td>'+formatNumber(list[key].value)+'</td><td><button onclick="updateData('+key+');" class="btn btn-warning">Edit</button>   <button onclick="deleteData('+key+');" class="btn btn-danger">Delete</button></td></tr>';
    }
    table += '</tbody>';

    document.getElementById('listTable').innerHTML = table;
    setDataStorage(list);
    getTotal(list);
}
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
    if(!validation()){
        return;
    }
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
    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="inputID" value="'+id+'">';

}
function resetForm() {
    document.getElementById("alert").style.display = "none";

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";

    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("inputIDUpdate").innerHTML = "";
}
function saveData() {
    if(!validation()){
        return;
    }
   var id = document.getElementById("inputID").value;
   var desc = document.getElementById("desc").value;
   var amount = document.getElementById("amount").value;
   var value = document.getElementById("value").value;

   list[id] = {"desc":desc,"amount":amount,"value":value};
   resetForm();
   setList(list);
}
function deleteData(id) {
    if(confirm("Delete this item?")){
        if(id === list.length - 1){
            list.pop();
        }else if(id === 0){
            list.shift();
        }else{
            var fist = list.slice(0, id);
            var last = list.slice(id + 1);

            list = fist.concat(last);
        }
        setList(list);
    }
    
}
function validation() {
    document.getElementById("alert").style.display = "none";
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";

    if(desc === ""){
        errors += "<p>Description not null</p>";
    }
    if(amount === ""){
        errors += "<p>Amount not null</p>";
    }else if(amount != parseInt(amount)){
        errors += "<p>Amount is not invalid</p>";
    }
    if(value === ""){
        errors += "<p>Value not null";
    }else if(value != parseFloat(value)){
        errors += "<p>Value is notinvalid</p>";
    }

    if(errors === ""){
        return 1;
    }else{
        document.getElementById("alert").style.display = "inline-block";
        document.getElementById("alert").innerHTML = ' <div id="divAlert"class="alert alert-danger alert-dismissible fade show" role="alert" style="display: none;">'+errors+'</div>';
        return 0;
    }
}
function deleteAll(){
    if(confirm("Delete this list all?")){
        list = [];
        setList();
    }
}
function setDataStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}
function initDataSotrage(){
    var listStorage = localStorage.getItem("list");

    if(listStorage){
        list = JSON.parse(listStorage);
    }
    setList(list);
}
initDataSotrage();


/*
console.log(getTotal(list));
*/