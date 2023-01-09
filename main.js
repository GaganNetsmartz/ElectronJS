const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

var ipc = require('electron').ipcMain;
var os = require('os');
var {dialog} = require('electron');


let win;
let win3;
const menuItems = [
    {
        label: "Home",
        click: async () => {
            const winHome = new BrowserWindow({
                height: 300,
                weight: 400,
                show: false,
                backgroundColor: '#2e2c29',
            }); 
            winHome.loadFile('src/hotelComponents/home.html')  
            winHome.once('ready-to-show', () => winHome.show()); 
        }
    },
    {
        label: "About",
        submenu: [
            {
                label: "Contact Us",
                click: async () => {
                    const winContact = new BrowserWindow({
                        height: 1200,
                        weight: 1600,
                        show: false,
                        backgroundColor: '#2e2c29',
                    }); 
                    winContact.loadFile('src/hotelComponents/contact.html')  
                    winContact.once('ready-to-show', () => winContact.show()); 
                }
            },
            {
                type: "separator"
            },
            {
                label: "Gallery",
                click: async () => {
                    const winContact = new BrowserWindow({
                        height: 1200,
                        weight: 1600,
                        show: false,
                        backgroundColor: '#2e2c29',
                    }); 
                    winContact.loadFile('src/hotelComponents/gallery.html')  
                    winContact.once('ready-to-show', () => winContact.show()); 
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
                    const winContact = new BrowserWindow({
                        height: 1200,
                        weight: 1600,
                        show: false,
                        backgroundColor: '#2e2c29',
                    }); 
                    winContact.loadFile('src/hotelComponents/reservation.html')  
                    winContact.once('ready-to-show', () => winContact.show()); 
                }
            },
            {
                type: "separator"
            },
            {
                label: "2 seated",
                click: async () => {
                    const winContact = new BrowserWindow({
                        height: 1200,
                        weight: 1600,
                        show: false,
                        backgroundColor: '#2e2c29',
                    }); 
                    winContact.loadFile('src/hotelComponents/reservation.html')  
                    winContact.once('ready-to-show', () => winContact.show()); 
                }
            },
            {
                type: "separator"
            },
            {
                label: "4 seated",
                click: async () => {
                    const winContact = new BrowserWindow({
                        height: 1200,
                        weight: 1600,
                        show: false,
                        backgroundColor: '#2e2c29',
                    }); 
                    winContact.loadFile('src/hotelComponents/reservation.html')  
                    winContact.once('ready-to-show', () => winContact.show()); 
                }
            }
        ]
    },
    {
        label: "Open Camera",
        click: async () => {
             win3 = new BrowserWindow({
                height: 300,
                weight: 400,
                show: false,
                movable: false,
                parent:win,
                modal:false 
            }); 
            win3.webContents.openDevTools();
            win3.loadFile('src/Camera/camera.html')  
            win3.once('ready-to-show', () => win3.show()); 
            win3.on('closed',()=>{
                
                win3=null;
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
            const winHome = new BrowserWindow({
                height: 300,
                weight: 400,
                show: false,
                backgroundColor: '#2e2c29',
            }); 
            win.webContents.openDevTools();
            winHome.loadFile('src/FileUpload/fileUpload.html');            
            winHome.once('ready-to-show', () => winHome.show()); 
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
        }      

    }
]

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
   win = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
  })

  win.loadFile('src/hotelComponents/home.html');
  win.on('closed',()=>{
    win=null;
    win3=null;
  })
}


app.whenReady().then(() => {
    createWindow();
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }    
})
