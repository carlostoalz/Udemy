const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {

    console.log(__dirname);

    // Create the browser window.
    mainWindow = new BrowserWindow({
        simpleFullscreen: true,
        backgroundColor: '#ffffff',
        webPreferences: { nodeIntegration: true },
        icon: url.format({
            pathname: path.join(__dirname, `/dist/favicon.ico`),
            protocol: "file:",
            slashes: true
        })
    });

    // Load index.html into the new BrowserWindow
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    // Open DevTools - Remove for PRODUCTION!
    mainWindow.webContents.openDevTools()

    // Event when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {

    // On macOS specific close process
    if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function() {
    // macOS specific close process
    if (mainWindow === null) createWindow();
})