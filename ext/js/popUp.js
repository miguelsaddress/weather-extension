"use strict";

let weather = new WeatherApi();


weather.getForecast(function(forecast) {

    let current = forecast.getFutureDay(0);

    let currentData = {
        tempAvg: Math.round(current.tempAvg),
        tempMin: Math.round(current.tempMin),
        tempMax: Math.round(current.tempMax),
        icon: '/icons/' + current.icon.substring(0,2) + '.svg'
    };

    let forecastData = [];

    for (let i = 0; i < 3; i++) {
        let day = forecast.getFutureDay(i + 1);

        forecastData[i] = {
            dayName: day.dayName.toUpperCase(),
            tempMin: Math.round(day.tempMin),
            tempMax: Math.round(day.tempMax),
            tempAvg: Math.round(day.tempAvg),
            icon: '/icons/' + day.icon.substring(0,2) + '.svg'
        };
    }

    template({currentData, forecastData});
});



function template(content) {

     let main = `
        <div class="title">Madrid hoy</div>
        <div id="main">
                <div class="main-temp">
                    <div class="forecast-temp">${content.currentData.tempAvg}°C</div>
                    <div class="forecast-min">MÍN <span class="main-grown"></span>${content.currentData.tempMin}°C</div>
                    <div class="forecast-max">MÁX <span class="main-grown"></span>${content.currentData.tempMax}°C</div>
                </div>
                <div class="main-icon">
                    <img src="${content.currentData.icon}" alt="forecast today">
                </div>
        </div>
        `;

    // card number independent
    let cards = '';
    content.forecastData.forEach(function (forecastDay) {
        cards += `
            <div class="card">
                <div class="card-header">${forecastDay.dayName}</div>
                <div class="card-image"><img src="${forecastDay.icon}" alt="" ></div>
                <div class="card-inside">
                    <div class="card-temp">${forecastDay.tempAvg}°</div>
                    <div class="card-min">MÍN <span class="card-grown">${forecastDay.tempMin}°</span></div>
                    <div class="card-max">MÁX <span class="card-grown">${forecastDay.tempMax}°</span></div>
                </div>
            </div>
         `;
    });

    let deck = `
        <div id="deck">
            ${cards}
        </div>
    `;

    document.getElementById("container").innerHTML = main + deck;
}