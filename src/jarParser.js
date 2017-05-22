
var exec = require('child_process').exec;

var token;

//callback is a functiont that is run when the command is complete.
function execCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
        console.log('exec error: ' + error);
    }
    callback(stdout);
  });
}

function parser(commandOutput) {
  token = JSON.parse(commandOutput);
  printJSON(token);
}

function printJSON(jsonObj) {
  //console.log(JSON.stringify(jsonObj));
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

var curlCommand = "curl -X POST https://di-api.dev.drillinginfo.com/v1/x4m/tokens -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded' -H 'x-api-key: 1d77ee834f92ece6b2ddd38b5ccc6b13' -d 'grant_type=password&client_id=transform-api&username=x4m-mines1&password=mines1'";

execCommand(curlCommand, parser);
