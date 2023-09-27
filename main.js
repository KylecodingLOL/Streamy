const { app, BrowserWindow } = require('electron');
const { ipcRenderer } = require('electron');
const { ipcMain } = require('electron');

let mainWindow = null;
let popoutWindow = null;

let lastUpdateTime = 0;
const throttleTime = 1;  // milliseconds

function createWindow() {
    mainWindow = new BrowserWindow({
      width: 940,
      height: 600,
      minWidth: 940, // minimum width
      minHeight: 640,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
  
    mainWindow.loadFile('index.html');
  
    popoutWindow = new BrowserWindow({
      width: 800,
      height: 540,
      minWidth: 800, // minimum width
      minHeight: 540,
      parent: mainWindow,
      movable: false
    });
  
    popoutWindow.loadURL('https://www.twitch.tv/');

  mainWindow.on('move', () => {
    updatePopoutWindow();
  });

  mainWindow.on('resize', () => {
    updatePopoutWindow();
  });
}

function updatePopoutWindow() {
    const currentTime = Date.now();
    if (currentTime - lastUpdateTime < throttleTime) {
      return;
    }
  
    lastUpdateTime = currentTime;
  
    const [width, height] = mainWindow.getSize();
  
    // Use a different height ratio if the main window is fullscreen
    const popoutHeightRatio = mainWindow.isFullScreen() ? 0.88 : 0.88;  // Change these ratios as needed
  
    const newPopoutHeight = Math.floor(height * popoutHeightRatio);
    const padding = 20;
  
    popoutWindow.setSize(width - 100, newPopoutHeight);
    
    const [x, y] = mainWindow.getPosition();
    
    // If you don't want to move the popout window vertically, keep its y-coordinate fixed
    popoutWindow.setPosition(x + 80, y + height - newPopoutHeight - padding);
  }
  
  

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('load-url', (event, url) => {
    popoutWindow.loadURL(url);
  });

