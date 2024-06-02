

export function getTodayDataTimeString(){
    let date = new Date();
    let dateString = (date.getDate() < 10 ? '0' : '') + date.getDate() + "-" + (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1) + "-" + date.getFullYear();

    return dateString;
}

export function getRandomStrign(strignLength){
    const list = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    var randomString = "";
    for(var i = 0; i < strignLength; i++) {
        var rnd = Math.floor(Math.random() * list.length);
        randomString = randomString + list.charAt(rnd);
    }
    return randomString;
}