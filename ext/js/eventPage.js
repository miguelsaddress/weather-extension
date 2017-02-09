"use strict";

const MINUTE = 0.01;

//const URL_CURRENT_WEATHER = 'http://api.openweathermap.org/data/2.5/weather?id=3117735&appid=65dedd8dbb2d88ad5d6ed5d6e2da804b';
const URL_CURRENT_WEATHER = "currentWeatherExample.json";


chrome.runtime.onInstalled.addListener(scheduleReloadData);
chrome.runtime.onStartup.addListener(scheduleReloadData);
chrome.alarms.onAlarm.addListener(reloadData);



function scheduleReloadData() {
    chrome.alarms.create("reloadData", {periodInMinutes: MINUTE});
}


function reloadData(alarm) {
    if (alarm.name.toString() !== "reloadData") {
        return;
    }

    getData(URL_CURRENT_WEATHER).then(function (data) {
        setIconText(data.main.temp);
        setIconImage(data.weather[0].icon);
    });

}

function getData ( url ) {
    return fetch(url)
        .then(validateResponse)
        .then(transformJsonResponse)
        .catch(function (err) {
            console.log(err.message);
        });

}


function validateResponse( response ) {
    if (!response.ok) {
        return Promise.reject(new Error('OpenWeatherMaps request error. Status : ' + response.statusCode));
    }

    return Promise.resolve(response);
}


function transformJsonResponse( response ) {
    return response.json();
}


function setIconImage( iconId ) {
    var iconName = iconId.substring(0,2);

    chrome.browserAction.setIcon({path: "icons/" + (iconName) + ".svg"});
}


function setIconText( number ) {
    var text = Math.round(number).toString() + '°C';

    chrome.browserAction.setBadgeText({text: (text)});
}


