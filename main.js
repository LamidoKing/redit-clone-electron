const { app, BrowserWindow, ipcMain } = require('electron')

let mainWindow
let settings
function createWindow () {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  settings = new BrowserWindow({ width: 500, height: 400, parent: mainWindow, show: false })
  mainWindow.loadFile('index.html')
  settings.loadFile('settings.html')
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  settings.on('closed', function () {
    settings = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
ipcMain.on('toggle-settings', () => {
  settings.isVisible() ? settings.hide() : settings.show()
})
