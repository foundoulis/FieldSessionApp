
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

//changes the window's current .html file that it uses to render.
function loadURL(name) {
  win.loadURL(url.format({
    pathname: path.join(__dirname, name),
    protocol: 'file:',
    slashes: true
  }));
}

function loadLogInScreen() {
  loadURL('login.html');
}

function loadMainScreen() {
  // Load index.html
  loadURL('index.html');
}

function createWindow() {
  // Create browser window
  win = new BrowserWindow({
    width:800,
    height:600,
    icon: path.join(__dirname, 'icons/icon.jpeg')
  });

  loadMainScreen();

  // Opens devtools
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

// Run create window function
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
})
