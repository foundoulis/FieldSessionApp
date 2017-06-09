//requires for electron
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const {ipcMain} = require('electron');
// global window variable
let win;
//username variable, set in login.html used in mainscreen.html
global.username = {name: null};
//changes the window's current .html file on display.
function loadURL(name) {
  win.loadURL(url.format({
    pathname: path.join(__dirname, name),
    protocol: 'file:',
    slashes: true,
    resizeable: false
  }));
}
// loads the log in screen, takes no parameters, returns a screen
function loadLogInScreen() {
  loadURL('login.html');
}
//function which loads jar files to be used by the program, takes no parameters
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
// creates a new BrowserWindow and calls load loginPage
function createWindow() {
  // Create browser window
  win = new BrowserWindow({
    width:800,
    height:675,
    resizeable: false,
    icon: path.join(__dirname, '..','icons/icon.jpeg')
  });
  win.on('closed', () => {
    win = null;
  });
//load login screen (first screen displayed to the user)
loadLogInScreen();
}

// Run create window function
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// Create a window on activation
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
})
