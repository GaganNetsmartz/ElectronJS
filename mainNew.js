'use strict'

var app = require('electron').app;

var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;

var ipc = require('electron').ipcMain;

ipc.on('close-main-window', function(){
    //close the app

    app.quit();
})

app.on('ready', function(){
    
    //initializing the window

    mainWindow = new BrowserWindow({
        resizable: true,
        height: 600,
        width: 800,
        webPreferences:{
            nodeIntegration: true
        }
    })
})