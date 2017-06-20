

//requires for electron


const {app, BrowserWindow, ipcMain, session} = require('electron');

const path = require('path');
const url = require('url');
const request = require('request');

// global window variable
let win;

//username variable, set in login.html used in mainscreen.html
global.username = {name: null};
global.password = {pass: null};
global.cook = null;

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

//function which loads jar files to be used by the program
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
  });
}

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

  // gets rid of menuBar
  //  win.setMenu(null);

  loadLogInScreen();
  loadConfig(global.config);
}

function loadConfig() {
  request.get("https://s3.amazonaws.com/di-transform/config.json", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      global.config = body;
      // callback(null, "https://s3.amazonaws.com/di-transform/config.json");
    } else if (error) {
      console.log(error);
      // callback(error, null);
    } else {
      // callback(new Error("HTML statuscode: " + response.statuscode), null);
    }
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

// Create a window on activation
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});


// cookies stuff
ipcMain.on('set-cookie', (event, cookieInfo) => {
// Must pass keep, name and value to store a cookie
    if (cookieInfo.keep) {
        var daysToExpiry = 15;
        var expirDate = new Date();
        expirDate.setDate(expirDate.getDate() + daysToExpiry);
        session.defaultSession.cookies.set({
            url: "http://info.drillinginfo.com/",
            name: cookieInfo.name,
            value: cookieInfo.value,
            expirationDate: expirDate.getTime(),
        }, (error) => {
            if (error) {
                console.log(error);
            }
        });
    } else {
        session.defaultSession.cookies.set({
            url: "http://www.foundoulis.io/",
            name: cookieInfo.name,
            value: cookieInfo.value,
        }, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
});
ipcMain.on('get-cookie', (event, filterInfo) => {
    session.defaultSession.cookies.get(filterInfo, (error, cookies) => {
        if (error) {
            console.log(error);
        } else {
            event.sender.send('get-cookie-reply', cookies);
        }
    });
});
