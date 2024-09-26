const { app, BrowserWindow, ipcMain } = require('electron');
const { create } = require('node:domain');
const path = require('node:path')
const WebSocket = require("ws");


let mainWindow;
let passwordWindow;
let extraWindow;

//Create the main BrowserWindow once the electron app is ready
app.on('ready', () => {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', (ws) => {
      console.log('Client connected to WebSocket');
  
      // Listen for messages from the Vite frontend
      ws.on('message', (message) => {
        console.log('Received:', message);
        const data = JSON.parse(message);
  
        // Handle redirection if message type is 'redirect'
        if (data.type === 'redirect') {
          mainWindow.loadFile("index.html");
        }
      });
    });

    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        kiosk: true,
        fullscreen: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile('index.html');
});

//Switch to an app when receiving the correct IPC event
ipcMain.on("Request-App", (event, args) => {
    url0 = "http://localhost/Bass"
    url1 = "http://localhost/Film"
    if (args["ID"] === 0){
        mainWindow.loadURL(url0);
    }
    else {
        mainWindow.loadURL(url1);
    }
})

ipcMain.on("Request-Dash", (event, args) => {
    mainWindow.loadFile("index.html");
})

function createPasswordWindow() {
    passwordWindow = new BrowserWindow({
        width: 1150,
        height: 500,
        modal: true, // To make it appear on top of the main window
        parent: mainWindow, // Reference to your main window
        webPreferences: {
            nodeIntegration: true, // Depends on your Electron setup
            contextIsolation: false, // Allows ipcRenderer in renderer
        }
    });
    passwordWindow.removeMenu();
    passwordWindow.loadFile('password.html'); // The HTML file for the password prompt
    passwordWindow.on('closed', () => {
        passwordWindow = null;
    });
}
ipcMain.on("Request-Quit", (event, args) => {
    createPasswordWindow();
})
//Check whether the password is correct when it is submitted and quit if it is.
ipcMain.on("submit-password", (event, password) => {
    const pass = "123";
    
    if (password === pass) {
        if(passwordWindow) {
            passwordWindow.close();
        }
        app.quit(); // Quit the app if the password is correct
    } else {
        event.reply('password-result', 'Incorrect password');
    }
});

function createExtraWindow() {
    extraWindow = new BrowserWindow({
        modal: true, // To make it appear on top of the main window
        parent: mainWindow, // Reference to your main window
    });
    extraWindow.removeMenu();
    extraWindow.on('closed', () => {
        extraWindow = null;
    });
}

ipcMain.on("Request-Credits", (event, args) => {
    createExtraWindow();
    extraWindow.setSize(600, 700);
    extraWindow.center();
    extraWindow.loadFile('credits.html');
})

ipcMain.on("Request-Text", (event, args) => {
    file = args==="film" ? "filmText.html" : "bassText.html";
    
    createExtraWindow();
    extraWindow.setSize(800, 1000);
    extraWindow.center();
    extraWindow.loadFile(file);
})