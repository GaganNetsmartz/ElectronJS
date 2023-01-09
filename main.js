const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

var ipc = require('electron').ipcMain;
var os = require('os');
var {dialog} = require('electron');

var mainWindow = null;

const menuItems = [
    {
        label: "Home",
        click: async () => {
            mainWindow.loadFile('src/hotelComponents/home.html')  
            mainWindow.once('ready-to-show', () => mainWindow.show()); 
        }
    },
    {
        label: "About",
        submenu: [
            {
                label: "Contact Us",
                click: async () => {                    
                    mainWindow.loadFile('src/hotelComponents/contact.html')  
                    mainWindow.once('ready-to-show', () => mainWindow.show()); 
                }
            },
            {
                type: "separator"
            },
            {
                label: "Gallery",
                click: async () => {                    
                    mainWindow.loadFile('src/hotelComponents/gallery.html')  
                    mainWindow.once('ready-to-show', () => mainWindow.show()); 
                }
            }
        ]
    },
    {
        label: "Rooms",
        submenu: [
            {
                label: "1 seated",
                click: async () => {
                    mainWindow.loadFile('src/hotelComponents/reservation.html')  
                    mainWindow.once('ready-to-show', () => mainWindow.show()); 
                }
            },
            {
                type: "separator"
            },
            {
                label: "2 seated",
                click: async () => {
                    mainWindow.loadFile('src/hotelComponents/reservation.html')  
                    mainWindow.once('ready-to-show', () => mainWindow.show()); 
                }
            },
            {
                type: "separator"
            },
            {
                label: "4 seated",
                click: async () => {                     
                    mainWindow.loadFile('src/hotelComponents/reservation.html')  
                    mainWindow.once('ready-to-show', () => mainWindow.show()); 
                }
            }
        ]
    },
    {
        label: "Open Camera",
        click: async () => {
            mainWindow.webContents.openDevTools();
            mainWindow.loadFile('src/Camera/camera.html')  
            mainWindow.once('ready-to-show', () => mainWindow.show()); 
            mainWindow.on('closed',()=> {                
                mainWindow = null;
              })
        }
    },
    {
        label: "Window",
        submenu: [
            {
                label: "Learn More",
                click: async () => {
                    await shell.openExternal("https://electronjs.org");
                }
            },
            {
                role: "Minimize"
            },
            {
                role: "close"
            }            
        ]
    },
    {
        label: "File Upload",
        click: async () => {
            mainWindow.webContents.openDevTools();
            mainWindow.loadFile('src/FileUpload/fileUpload.html');            
            mainWindow.once('ready-to-show', () => mainWindow.show());            
        }      

    }
]

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

app.on('ready', function(){
    
    //initializing the window
    mainWindow = new BrowserWindow({
        resizable: true,
        height: 1600,
        width: 1000,
        webPreferences:{
            nodeIntegration: true
        }
    })
    
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('src/hotelComponents/home.html');
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

// const createWindow = () => {
//    win = new BrowserWindow({
//     width: 1600,
//     height: 1000,
//     webPreferences: {
//         preload: path.join(__dirname, 'preload.js'),
//       },
//   })

//   win.loadFile('src/hotelComponents/home.html');
//   win.on('closed',()=>{
//     win=null;
//     win3=null;
//   })
// }


// app.whenReady().then(() => {
//     createWindow();
  
//     app.on('activate', () => {
//       if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//       }
//     });
//   });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }    
// })
