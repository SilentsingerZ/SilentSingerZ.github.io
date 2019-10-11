class Time {
    constructor(haha) {
        this.myDate = haha;
    }
    getWeekdayName() {
        let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekdays[this.myDate.getDay()];
    }
    getMonthInfo() {
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let months = monthNames[this.myDate.getMonth()];
        let days = ("0" + this.myDate.getDate()).slice(-2)
        let sufix
        switch (this.myDate.getDate()) {
            case 1:
            case 21:
            case 31:
                sufix = "st";
            case 2:
            case 22:
                sufix = "nd";
            case 3:
            case 23:
                sufix = "rd";
            default:
                sufix = "th";
        }
        return months+" "+days+sufix;
    }
    getTimeInfo() {
        let hrs = this.myDate.getHours();
        let mins = ("0" + this.myDate.getMinutes()).slice(-2)
        return hrs + ':' + mins;
    }
    getEnergyPct() {
        let hrs = this.myDate.getHours();
        let mins = ("0" + this.myDate.getMinutes()).slice(-2)
        let energypct = ((17.5 - hrs - mins/60)/0.08).toFixed(0) + '%'
        return energypct
    }
    getGreetingInfo() {
        let hrs = this.myDate.getHours();
        let greet;
        if (hrs < 12)
            greet = 'Good Morning!';
        else if (hrs >= 12 && hrs <= 17)
            greet = 'Good Afternoon!';
        else if (hrs >= 17 && hrs <= 24)
            greet = 'Good Evening!';
        return greet;
    }
}

export default Time;

// let todolist = new Time(new Date())
// document.getElementById('wds').innerHTML = todolist.getWeekdayName();
// document.getElementById('Time').innerHTML = todolist.getTimeInfo();
// document.getElementById('energypct').innerHTML = todolist.getEnergyPct();
// document.getElementById('lblGreetings').innerHTML = todolist.getGreetingInfo();
// document.getElementById('Date').innerHTML = todolist.getMonthInfo();