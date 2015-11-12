var exec = require('child_process').exec;

var cmd = 'processing-java --sketch=`pwd`/image_test/ --run';

exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
