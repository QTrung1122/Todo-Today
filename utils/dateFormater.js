function getTodayDate() {
    const today = new Date()
    const day_in_week = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}
    return day_in_week[today.getDay()] + '/' + today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
}

module.exports = getTodayDate