const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {ipcMain} = require('electron')
const HWInfoManager = require('./util/HardwareInfoManager')

let win

function createWindow() {

    win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.webContents.openDevTools()
    // to clear hardware info refresh interval, save id here
    win.intervalId = null;

    win.on('closed', () => {
        if (win.intervalId) {
            clearInterval(win.intervalId)
        }
        win = null
    })

    var hwi = new HWInfoManager();

    // send hardware information
    win.intervalId = setInterval(() => {
        hwi.update()
        win.webContents.send('HW_INFOS', hwi.infos)
    }, 1000);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindows()
    }
})