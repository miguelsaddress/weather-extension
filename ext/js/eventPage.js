"use strict";

const RELOAD_TIME = 60;

chrome.runtime.onInstalled.addListener(scheduleReloadData);
chrome.runtime.onStartup.addListener(scheduleReloadData);
chrome.alarms.onAlarm.addListener(fetchCurrentData);
chrome.browserAction.onClicked.addListener(createPopup);

function createPopup() {
    chrome.tabs.create({
        url: "popUp.html"
    });
}

function scheduleReloadData() {
    fetchCurrentData();

    chrome.alarms.create("reloadData", {
        periodInMinutes: RELOAD_TIME
    });
}

function fetchCurrentData() {

    let weather = new WeatherApi();
    weather.getCurrent(function(data) {
        setIconText(data.getTemp());
        setIconImage(data.getIcon());
    });

}

function setIconImage( iconId ) {
    let iconName = iconId.substring(0,2);

    chrome.browserAction.setIcon({path: "icons/" + (iconName) + ".svg"});
}

function setIconText( number ) {
    let text = Math.round(number).toString() + '°C';

    chrome.browserAction.setBadgeText({text: (text)});
}


