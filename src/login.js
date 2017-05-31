
// Change this to actually verify through server
var user;
function check(form) {
  if (form.username.value == "x4m-mines1" && form.password.value == "mines1") {
    window.open("mainscreen.html");
   user = form.username.value;
  } else {
    alert("Error Password or Username");
  }
  //console.log(document.getElementById("loginForm").username.value);

}
module.exports.getUsername = function getUsername(){
  return user;
}
