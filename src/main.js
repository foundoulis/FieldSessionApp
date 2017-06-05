
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// global window variable
let win;
let login;

//changes the window's current .html file on display.
function loadURL(name) {
  win.loadURL(url.format({
    pathname: path.join(__dirname, name),
    protocol: 'file:',
    slashes: true,
    resizeable: false
  }));
}

function loadURLLogin(name) {
  login.loadURL(url.format({
    pathname: path.join(__dirname, name),
    protocol: 'file:',
    slashes: true,
    resizeable: false
  }));
}

function loadLogInScreen() {
  loadURLLogin('login.html');
}
function loadMainScreen() {
  // Load index.html
  loadURL('mainscreen.html');
}

function runJarFile() {
  var exec = require('child_process').exec, child;
  child = exec('java -jar ./jars/helloWorld.jar',
  (error, stdout, stderr) => {
    // Directs standard out and standard error.
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    // Prints error if it doesn't work.
    if(error !== null){
      console.log('exec error: ' + error);
    }
})};

function createWindow() {
  // Create browser window
  win = new BrowserWindow({
    width:800,
    height:675,
    resizeable: false,
    icon: path.join(__dirname, '..','icons/icon.jpeg')
  });
  login = new BrowserWindow({
    width:800,
    height:675,
    resizeable: false,
    icon: path.join(__dirname, '..','icons/icon.jpeg')
  });
  // Opens devtools
  //win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

loadMainScreen();
// win.hide();
loadLogInScreen();



}

// module.exports.win = win;

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
