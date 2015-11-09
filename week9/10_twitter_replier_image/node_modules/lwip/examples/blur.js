/**
 * Example for using LWIP to blur an image.
 */

var path = require('path'),
    lwip = require('../');

lwip.open('lena.jpg', function(err, image) {
    if (err) return console.log(err);
    image.batch()
        .blur(10)
        .writeFile('lena_blur.jpg', function(err) {
            if (err) return console.log(err);
            console.log('done');
        });
});
