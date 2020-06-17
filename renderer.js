// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// const { app, BrowserWindow } = require("electron");
var cron = require("node-cron");
const request = require("request");
const screenshot = require("screenshot-desktop");
//var screenshot = require("desktop-screenshot");

var fs = require("fs");

var log = 0;

// cron.schedule("*/60 * * * * *", () => {
//     log = log + 1;
//     var DATETIEM = Date.now();
//     // screenshot({ filename: "images/" + DATETIEM + ".jpg" }).then((imgPath) => {
//     //     var data = {
//     //         file: fs.createReadStream(imgPath),
//     //     };
//     //     document.getElementById("imageid").src = imgPath;
//     //     // request.post({
//     //     //         url: "http://projects.sparkleinfotech.com/nodeLog/updatelog.php",
//     //     //         formData: data,
//     //     //     },
//     //     //     function callback(err, response, body) {
//     //     //         if (err) {
//     //     //             return console.error("Failed to upload:", err);
//     //     //         }

//     //     //         // document.write(
//     //     //         //     "<img src='" +
//     //     //         //     imgPath +
//     //     //         //     "' height='250' wirdth='250'> <br><br>http://projects.sparkleinfotech.com/nodeLog/screenShot/" +
//     //     //         //     DATETIEM +
//     //     //         //     ".jpg"
//     //     //         // );
//     //     //     }
//     //     // );
//     // });

//     var options = {
//         method: "POST",
//         url: "http://projects.sparkleinfotech.com/nodeLog/updatelog.php",
//         headers: {
//             "cache-control": "no-cache",
//             "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
//         },
//         formData: { log: "Update" + log },
//     };

//     request(options, function(error, response, body) {
//         if (error) throw new Error(error);

//         console.log(body);
//     });
// });
//var ioHook = require("iohook");
// var keyCount = 0;
// var clickCount = 0;

var task = cron.schedule(
    "*/60 * * * * *",
    () => {
        var DATETIEM = Date.now();
        screenshot({ filename: "images/" + DATETIEM + ".jpg" }).then((imgPath) => {
            var data = {
                file: fs.createReadStream(imgPath),
            };
            document.getElementById("imageid").src = imgPath;
            document.getElementById("keyEvent").innerHTML =
                "KeybordEvent =" + keyCount + " Mouse event" + clickCount;
            keyCount = 0;
            clickCount = 0;
            // ioHook.stop();
            // ioHook.start();
        });
    }, {
        scheduled: false,
    }
);
// ioHook.on("keydown", (event) => {
//     keyCount = keyCount + 1;
// });
// ioHook.on("mouseclick", (event) => {
//     clickCount = clickCount + 1;
// });
// ioHook.start();