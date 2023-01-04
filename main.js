const { app, BrowserWindow } = require('electron')
/*  
    Importing two Electron modules with CommonJS module syntax
    app: controls application's event lifecycle.
    BrowserWindow: creates and manages app windows. 
*/

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}
/*
The createWindow() function loads web page into a new BrowserWindow instance.
*/

app.whenReady().then(() => {
  createWindow()
})
// calling function when the app is ready

