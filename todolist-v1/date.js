module.exports.getDate = getDate;
module.exports.getDay = getDay;


function getDate() {
    let today = new Date();
    let option = {weekday: 'long', month: 'long', day: 'numeric'};


    let day = today.toLocaleDateString("en-US", option);
    return day;
}

function getDay() {
    let today = new Date();
    let option = {weekday: 'long'};


    let day = today.toLocaleDateString("en-US", option);
    return day;
}
