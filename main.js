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
        submenu: [
            {
                label: "Exit",
                click: () => app.quit(),
            }
        ]
    },
    {
        label: "About",
        submenu: [
            {
                label: "Contact"
            },
            {
                type: "separator"
            },
            {
                label: "View"
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
                click: () => {
                    shell.openExternal("https://electronjs.org");
                }
            }
        ]
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

  win.loadFile('src/index.html')
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
