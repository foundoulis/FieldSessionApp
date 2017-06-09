
//requires for electron


const {app, BrowserWindow, ipcMain, session} = require('electron');

const path = require('path');
const url = require('url');

// global window variable
let win;
//username variable, set in login.html used in mainscreen.html
global.username = {name: null};
global.password = {pass: null};
global.cook = null;
global.config = null;
global.sess = session;

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

    loadLogInScreen();
    loadCookies(); // Called at the end of storeCookie.
    loadConfig();
    storeCookie("Please work");
    // storeCookie("Please work, jesus.");
}

function loadConfig() {
    var exec = require('child_process').exec, child;
    child = exec("wget -O ./config.json https://s3.amazonaws.com/di-transform/config.json",
    (error, stdout, stderr) => {
        // Directs standard out and standard error.
        // console.log('stdout: ' + stdout);
        // console.log('stderr: ' + stderr);
        // Prints error if it doesn't work.
        if(error !== null){
            console.log('exec error: ' + error);
        } else {
            global.config1 = require('../config.json');
            console.log(global.config);
        }
    });
}

function loadCookies() {
    session.defaultSession.cookies.get({name: "TL"}, (error, cookies) => {
        // console.log("The cookies are here in the callback: \n" + JSON.stringify(cookies));
        global.cook = cookies;
        // console.log("The cookies are here in the global variable: \n" + JSON.stringify(global.cook));
    });
}

<<<<<<< Updated upstream
function storeCookie(data) {
    //Setting the date
    var daysToExpiry = 15;
    var expirDate = new Date();
    expirDate.setDate(expirDate.getDate() + daysToExpiry);
    console.log(expirDate.getDate().toString());

    // Building and storing the cookie
    session.defaultSession.cookies.set(
        {
            url: "https://info.drillinginfo.com/",
            name: "TL",
            value: data,
            secure: true,
            expirationDate: expirDate.getTime(),
        },
    (error) => {
        if (error === null) {
        // Show me the cookies
        console.log(JSON.stringify(loadCookies()))
    } else {
        console.log(error);
    }
    });

}

=======
>>>>>>> Stashed changes
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
