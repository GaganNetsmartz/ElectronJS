const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
/*  
    Importing two Electron modules with CommonJS module syntax
    app: controls application's event lifecycle.
    BrowserWindow: creates and manages app windows. 
*/

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
            winHome.loadFile('src/home.html')  
            winHome.once('ready-to-show', () => winHome.show()); 
        }
        // submenu: [
        //     {
        //         label: "Exit",
        //         click: () => app.quit(),
        //     },
        // ]
    },
    {
        label: "About",
        submenu: [
            {
                label: "Contact Us"
            },
            {
                type: "separator"
            },
            {
                label: "Gallery"
            },
            {
                type: "separator"
            },
            {
                type: "Team"
            }
        ]
    },
    {
        label: "File",
        submenu: [
            {
                label: "Save"
            },
            {
                label: "Learn More",
                click: async () => {
                    await shell.openExternal("https://electronjs.org");
                }
            },
            {
                label: "New Window",
                click: async () => {
                    const win2 = new BrowserWindow({
                        height: 300,
                        weight: 400,
                        show: false,
                        backgroundColor: '#2e2c29',
                        movable: false 
                    }); 
                win2.loadFile('src/content.html')  
                // win2.loadURL("https://facebook.com") 
                win2.once('ready-to-show', () => win2.show()); 
                }
            }
        ]
    },
    {
        label: "Window",
        submenu: [
            {
                role: "close"
            },
            {
                role: "Minimize"
            }
        ]
    },
    {
        label: "Open Camera",
        click: async () => {
            const win3 = new BrowserWindow({
                height: 300,
                weight: 400,
                show: false,
                movable: false 
            }); 
            // win3.webContents.openDevTools();
            win3.loadFile('src/Camera/camera.html')  
            win3.once('ready-to-show', () => win3.show()); 
        }

    }
]

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
  })

  win.loadFile('src/home.html')
}
/*
The createWindow() function loads web page into a new BrowserWindow instance.
*/

app.whenReady().then(() => {
    createWindow();
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
// calling function when the app is ready

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }    
})
