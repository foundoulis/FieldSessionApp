var exec = require('child_process').exec;
var token;
//export token to be used in mainscreen.html
module.exports.getToken = function getToken() {
  return token;
}
//callback is a function that is run when the command is complete.
function execCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    callback(stdout);
  });
}
//parse the json file
function parser(commandOutput) {
  token = JSON.parse(commandOutput);
}
//print json object (use for testing)
function printJSON(jsonObj) {
  console.log("access_token: " + jsonObj.access_token);
  console.log();
  console.log("expires_in: " + jsonObj.expires_in);
  console.log();
  console.log("refresh_expires_in: " + jsonObj.refresh_expires_in);
  console.log();
  console.log("refresh_token: " + jsonObj.refresh_token);
  console.log();
  console.log("token_type: " + jsonObj.token_type);
  console.log();
  console.log("id_token: " + jsonObj.id_token);
  console.log();
  console.log("session_state: " + jsonObj.session_state);
}
//passed in from mainscreen.html
var user;
var password;
//assembles curl command to one string for use in curl command
function curlCommandAssembler(strings, username, password) {
  return strings[0] + username + strings[1] + password + strings[2];
}
//export function to be used in mainscreen.html
module.exports.buildAndRunCommand = function buildAndRunCommand(user, password) {
  user = user;
  password = password;
  var curlCommand = curlCommandAssembler`curl -X POST https://di-api.dev.drillinginfo.com/v1/x4m/tokens -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded' -H 'x-api-key: 1d77ee834f92ece6b2ddd38b5ccc6b13' -d 'grant_type=password&client_id=transform-api&username=${user}&password=${password}'`;
  execCommand(curlCommand, parser); // will not execute
  // TODO: remove once testing is done
  console.log("We are in the jarParser. Username: " + user + " Password: " + password);
}
