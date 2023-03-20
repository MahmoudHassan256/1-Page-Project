const nextyear=(new Date().getFullYear()) + 1;
const Birthday = "25 Jun "+ nextyear;

function countdown() {
    const BirthdayDate = new Date(Birthday);
    const currentDate = new Date();

    const totalSeconds = (BirthdayDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML = formatTime(hours);
    document.getElementById("minutes").innerHTML = formatTime(mins);
    document.getElementById("seconds").innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// initial call
countdown();

setInterval(countdown, 1000);