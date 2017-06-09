//NOT CURRENTLY IN USE
// Change this to actually verify through server
// var user = "user";
function check(form) {
  user = form.username.value;
// document.cookie = "username=HI";

  if (user == "x4m-mines1" && form.password.value == "mines1") {
    const {BrowserWindow} = require('electron').remote
    let win = new BrowserWindow({width: 800, height: 600})
    win.loadURL('mainscreen.html')
  } else {
    alert("Error Password or Username");
  }
  //console.log(document.getElementById("loginForm").username.value);

}
// module.exports.getUsername = function getUsername(){
//   return user;
// }
