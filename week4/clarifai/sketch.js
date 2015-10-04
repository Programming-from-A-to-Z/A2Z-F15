// Daniel Shiffman
// Programming from A to Z, Fall 2014
// https://github.com/shiffman/Programming-from-A-to-Z-F14

// Thank you to: https://github.com/dariusk/metaphor-a-minute/blob/master/metaphor.js

// Sign up for Wordnik here: https://www.wordnik.com/
// Developer documentation: http://developer.wordnik.com/

function setup() {
  noCanvas();

  $.ajax({
    url: 'https://api.clarifai.com/v1/tag/',
    type: 'GET',
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer nhnzljvXwHtZOmavbsgnXBlv5fgyVi');
    },
    data: {
       url: 'http://www.clarifai.com/img/metro-north.jpg'
    },
    success: function (response) { 
      console.log(response);
    },
    error: function (err) { 
      console.log(err);
    },
  });
}
