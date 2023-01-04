const { app, BrowserWindow } = require('electron');
const path = require('path');
/*  
    Importing two Electron modules with CommonJS module syntax
    app: controls application's event lifecycle.
    BrowserWindow: creates and manages app windows. 
*/

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
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
