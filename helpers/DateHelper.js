// format date for API based on given date. Yesterday by default
function getFormattedDate (date = null) {
    if (date === null) {
        date = new Date();
        date.setDate(date.getDate() - 1); // yesterday
    }
    
    let year = date.getFullYear();
    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 9 ? '0' + date.getDate() : date.getDate();
    let result = '' + year + month + day;

    return result;
}

function prettyDisplay (date) {
    let year = date.substr(0, 4);
    let month = date.substr(4, 2);
    let day = date.substr(6, 2);

    return day + '/' + month + '/' + year;
}

export { getFormattedDate, prettyDisplay };