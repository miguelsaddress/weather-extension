"use strict";

let weather = new WeatherApi();


weather.getForecast(function(forecast) {

    let current = forecast.getFutureDay(0);

    // TODO this is sloooooooooow, change it by placeholders or templates


    document.querySelector('.forecast-temp').innerHTML = Math.round(current.tempAvg) + '°C';
    document.querySelector('.forecast-min > .main-grown').innerHTML = Math.round(current.tempMin) + '°C';
    document.querySelector('.forecast-max > .main-grown').innerHTML = Math.round(current.tempMax) + '°C';
    document.querySelector('.main-icon > img').src = '/icons/' + current.icon.substring(0,2) + '.svg';


    let weekName = document.querySelectorAll('.card-header');
    let temp = document.querySelectorAll('.card-temp');
    let min = document.querySelectorAll('.card-min > .card-grown');
    let max = document.querySelectorAll('.card-max > .card-grown');
    let icon = document.querySelectorAll('.card-image > img');


    for (let i = 0; i < 3; i++) {
        let day = forecast.getFutureDay(i + 1);

        weekName[i].innerHTML = day.dayName.toUpperCase();
        temp[i].innerHTML = Math.round(day.tempAvg) + '°';
        min[i].innerHTML = Math.round(day.tempMin) + '°';
        max[i].innerHTML = Math.round(day.tempMax) + '°';
        icon[i].src = '/icons/' + day.icon.substring(0,2) + '.svg';

    }


});

