"use strict";

const URL_CURRENT_WEATHER = "http://api.openweathermap.org/data/2.5/weather?id=3117735&units=metric&appid=65dedd8dbb2d88ad5d6ed5d6e2da804b";
const URL_FORECAST_WEATHER = "http://api.openweathermap.org/data/2.5/forecast/daily?id=3117735&units=metric&appid=65dedd8dbb2d88ad5d6ed5d6e2da804b";

function WeatherApi () {

    this.fetchData = function ( url, callback ) {
        return fetch(url)
            .then(validateResponse)
            .then(transformJsonResponse)
            .then(function (response) {
                return callback(response);
            })
            .catch(function (err) {
                console.log(err.message);
            });
    };

    let validateResponse = function ( response ) {
        if (!response.ok) {
            return Promise.reject(new Error('OpenWeatherMaps request error. Status : ' + response.statusCode));
        }

        return Promise.resolve(response);
    };

    let transformJsonResponse = function ( response ) {
        return response.json();
    };
}

WeatherApi.prototype.getCurrent = function (callback) {
    return this.fetchData(URL_CURRENT_WEATHER, function (data) {
        callback(new Current(data));
    });
};

WeatherApi.prototype.getForecast = function (callback) {
    return this.fetchData(URL_FORECAST_WEATHER, function (data) {
        callback(new Forecast(data));
    });
};

function Current (data) {
    this.data = data;
}

Current.prototype.getTemp = function () {
    return this.data.main.temp;
};

Current.prototype.getIcon = function () {
    return this.data.weather[0].icon;
};

function Forecast (data) {
    this.data = data;
}

/**
 *
 * @param daysInFuture Number 0-n days in the future.
 */
Forecast.prototype.getFutureDay = function (daysInFuture) {

    let date = new Date();
    let dayToday = date.getDate();
    date.setDate(dayToday + daysInFuture);

    let names = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    let day_name, temp_min, temp_max, temp_avg, icon;

    this.data.list.forEach(function (forecast) {
        let forecastDate = new Date(forecast.dt * 1000);

        if (forecastDate.getDate() === date.getDate()) {
            day_name = names[forecastDate.getDay()];
            temp_min = forecast.temp.min;
            temp_max = forecast.temp.max;
            temp_avg = forecast.temp.day;
            icon = forecast.weather[0].icon;
        }
    });

    return {
        dayName: day_name,
        tempMin: temp_min,
        tempMax: temp_max,
        tempAvg: temp_avg,
        icon: icon
    };
};























