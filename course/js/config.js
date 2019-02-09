

function setConfig(){
    var text = {
        "title": "Shopping Control"
    };

    document.title = text.title;
    document.getElementById('navTitle').innerText = text.title;
}

setConfig();