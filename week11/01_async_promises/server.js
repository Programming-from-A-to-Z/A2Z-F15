// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// The 'fs' (file system) module allows us to read and write files
// http://nodejs.org/api/fs.html
var fs = require('fs');


// Option #1
// Load all the files, and count in the callbacks
// var files = ['data.json', 'data.json', 'data.json', 'data.json'];

// for (var i = 0; i < files.length; i++) {
//   fs.readFile(files[i], processFile); 
// }

// var count = 0;
// function processFile(data) {
//   count++;
//   if (count == files.length) {
//     console.log('finished reading');
//     // This is callback hell
//   }
// }

var files = ['data.json', 'data.json', 'data.json', 'data.json'];

// for (var i = 0; i < files.length; i++) {
//   fs.readFile(files[i], processFile); 
// }

// var count = 0;
// function processFile(err, data) {
//   var json = JSON.parse(data);
//   console.log(json);
//   count++;
//   if (count == files.length) {
//     console.log('finished reading');
//     // This is callback hell
//   }
// }

// var index = 0;
// fs.readFile(files[index], processFile); 

// function processFile(err, data) {
//   var json = JSON.parse(data);
//   console.log(json);
//   index++;
//   if (index < files.length) {
//     fs.readFile(files[index], processFile);
//   }
// }


var fs = require("fs");
var Promise = require("promise");

// Wrap the io functions with ones that return promises.
// var readFile_promise = Promise.convertNodeAsyncFunction( fs.readFile );
function readJSON(filename) {
  return new Promise(handlePromise);

  function handlePromise(fulfill, reject) {
    fs.readFile(filename, 'utf-8', fileread);
    function fileread(err, data){
      if (err) reject(err);
      else fulfill(JSON.parse(data));
    }
  }

}


// Create an array of promises
// var promises = [];

// for ( var i = 0; i < files.length; i++ ) {
//   promises.push(readJSON(files[i]));
// }

// Promise.all(promises).then(finished, error);

// function finished(results) {
//   for ( i = 0; i < results.length; i++ ) {
//     console.log(results[i]);
//   }
//   console.log("Done reading files");
// }

// function error(err) {
//   console.log("Error reading files");
// }


var seq = new Promise.PromiseSequence();
var index = 0;

seq.add(files);
seq.loop(next, body);

// The "next" function of the loop takes the result of the readdir and
// reads the file. It is executed when the loop is entered, and again after
// each time the body is executed.
function next(files) {
  if (index == files.length ) {
    seq.exitLoop(totalBytes);
    return;
  } else {
    console.log("Reading file " + files[index]);
    return readJSON(files[index++]);
  }
}

// The "body" function of the loop is called with the result of the "next" function.
// It simply sums the length of the file.
function body(data) {
  console.log(data);
}

seq.run().then(finished, error);

function finished(total) {
  console.log("Done reading file. Total bytes: " + total);
}

function error(err) {
    console.log("Error reading files: ", error);
}




// fs.readFile('data.json', 'utf8', fileread);

// function fileread(err, data) {
//   var json = JSON.parse(data);
//   console.log(json);
// }

// var Promise = require('promise');


// function readJSON(filename) {
//   // Make a promise out of a function that asynchronously loads the file
//   return new Promise(handlePromise);

//   function handlePromise(fulfill, reject) {
//     fs.readFile(filename, 'utf-8', fileread);
//     function fileread(err, res){
//       if (err) reject(err);
//       else fulfill(res);
//     }
//   }
// }

// var promise = readFile('data.json');
// promise.then

// promise.then(console.log, console.error)
