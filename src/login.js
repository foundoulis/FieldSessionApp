
// Change this to actually verify through server
// var user = "user";
function check(form) {
  user = form.username.value;
document.cookie = "username=HI";

  if (user == "x4m-mines1" && form.password.value == "mines1") {
    window.open("mainscreen.html");
  } else {
    alert("Error Password or Username");
  }
  //console.log(document.getElementById("loginForm").username.value);

}
// module.exports.getUsername = function getUsername(){
//   return user;
// }
