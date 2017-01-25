var L = require('leaflet');

// since leaflet is bundled into the browserify
// package they won't be able to detect where the images are
// solution is to point it to where you host the the leaflet images yourself
L.Icon.Default.imagePath = 'img/';

require('./controller/AppController');
