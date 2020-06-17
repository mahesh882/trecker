let $ = require("jquery");
var Timer = require("easytimer.js").Timer;

//const ioHook = require("iohook");

var timerInstance = new Timer();
var timer = new Timer();

document.getElementById("namesss").innerHTML =
    "Hello    " + store.get("Username");
$("#timeSwitch").change(function() {
    if ($(this).prop("checked") == true) {
        task.start();
        timer.reset();
    } else if ($(this).prop("checked") == false) {
        task.stop();
        timer.stop();
    }
});

timer.addEventListener("secondsUpdated", function(e) {
    $("#basicUsage").html(timer.getTimeValues().toString());
});