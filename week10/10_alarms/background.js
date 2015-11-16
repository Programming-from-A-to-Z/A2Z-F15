
chrome.runtime.onInstalled.addListener(scheduleAlarm);

function scheduleAlarm() {
  var params = {
    delayInMinutes: 0.1, 
    periodInMinutes: 0.1
  }
  chrome.alarms.create("A2Z", params);
}

chrome.alarms.onAlarm.addListener(alarmEvent);

function alarmEvent(alarm) {
  alert("Got an alarm!");
  console.log(alarm);
}
