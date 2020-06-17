// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { session } = require("electron");

let child;
let win;

function createWindow() {
    child = new BrowserWindow({
        width: 350,
        height: 600,
        frame: true,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            devTools: true,
        },
    });
    child.setResizable(false);

    child.loadFile("login.html");
}

ipcMain.on("entry-accepted", (event, arg) => {
    if (arg == "ping") {
        win = new BrowserWindow({
            width: 350,
            height: 600,
            frame: true,
            autoHideMenuBar: true,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                nodeIntegration: true,
            },
        });
        win.setResizable(false);
        win.loadFile("index.html");

        child.destroy();
    }
});
app.whenReady().then(() => {
    createWindow();
    app.on("activate", function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
// Quit when all windows are closed.
app.on("window-all-closed", function() {
    if (process.platform !== "darwin") app.quit();
});