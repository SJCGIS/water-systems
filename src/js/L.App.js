var L = require('leaflet');

require('esri-leaflet');
require('drmonty-leaflet-awesome-markers');

// since leaflet and leaflet-awesome-markers are bundled into the browserify
// package they won't be able to detect where the images are
// solution is to point it to where you host the the leaflet images yourself
L.Icon.Default.imagePath = 'img';

require('./controller/AppController');
