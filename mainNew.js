'use strict'

const { Menu } = require('electron');
var app = require('electron').app;

var BrowserWindow = require('electron').BrowserWindow;

var mainWindow = null;

var ipc = require('electron').ipcMain;

var os = require('os');
var {dialog} = require('electron');

ipc.on('close-main-window', function(){
    //close the app

    app.quit();
})

const menuItems = [   
    {
        label: "About",
        submenu: [
            {
                label: "Contact Us",
                click: async () => {                    
                    mainWindow.loadFile('src/hotelComponents/contact.html')  
                    mainWindow.once('ready-to-show', () => mainWindow.show()); 
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

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
    
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('file://' +__dirname + '/src/FileUpload/fileUpload.html');
    mainWindow.on('closed', function(){
        
        //making the main window to null
        mainWindow = null;
    })

    //retrieve the event that is send by the renderer process
    ipc.on('open-file-dialog-for-file', function(event){
        //checking the operating system of the user
        
        if(os.platform() === 'linux' || os.platform() === 'win32' || os.platform() === 'win64')
        {
            dialog.showOpenDialog({
                properties: ['openFile']
            }, function(files){
                if(files){
                    event.sender.send('selected-file', files[0])
                }
            })
        }
        else{
            //this is mac
            dialog.showOpenDialog({
                properties:['openFile', 'openDirectory']
            }, function(files){
                if(files)
                {
                    event.sender.send('selected-file', files[0]);
                }
            })
        }
    })

})