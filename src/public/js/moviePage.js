function setRate(val) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "updateRate", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(Json.stringify({
        value: val
    }));
}