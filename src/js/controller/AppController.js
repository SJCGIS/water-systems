var L = require('leaflet');
var EsriGeocoder = require('esri-leaflet-geocoder');
var humane = require('humane-js');
require('leaflet-sidebar-v2');
require('../mapview/MapView');

L.App = L.App || {};

L.App.AppController = L.Class.extend({

  statics: {},

  options: {},

  initialize: function(options) {
    console.log('app.controller.AppController::initialize', arguments);
    L.setOptions(this, options);

    this.mapView = new L.App.MapView();

    this.zoomControl = new L.control.zoom({
      position: 'topright'
    }).addTo(this.mapView._map);

    this.searchControl = new EsriGeocoder.Geosearch({
      providers: [
        new EsriGeocoder.FeatureLayerProvider({
          label: 'Water System',
          url: 'http://sjcgis.org/arcgis/rest/services/HCS/Water_Systems/MapServer/0',
          searchFields: ['Sys_Name', 'Sys_ID'],
          //proxy: 'http://sjcgis.org/proxy/proxy.ashx',
          bufferRadius: 200,
          formatSuggestion: function(feature) {
            return feature.properties.Sys_Name;
          }
        }),
        new EsriGeocoder.GeocodeServiceProvider({
          url: 'http://sjcgis.org/arcgis/rest/services/Tools/Polaris_Geolocator/GeocodeServer',
          label: 'Polaris Geocoder',
          //proxy: 'http://sjcgis.org/proxy/proxy.ashx'
        })
      ],
      useArcgisWorldGeocoder: false,
      position: 'topright',
      useMapBounds: false
    }).addTo(this.mapView._map);

    this.sidebar = L.control.sidebar('sidebar').addTo(this.mapView._map);

    this.sidebar.open('home');

    this.results = new L.FeatureGroup().addTo(this.mapView._map);

    this.setupConnections();
  },

  setupConnections: function(options) {
    console.log('app.controller.AppController::setupConnections', arguments);

    var that = this;

    this.searchControl.on('results', function(data) {
      that.results.clearLayers();
      if(data.results.length === 0){
        humane.log('No results from search');
      } else {
        for(var i = data.results.length - 1; i >= 0; i--) {
          var marker = L.marker(data.results[i].latlng, {
            title: data.results[i].text,
            clickable: true
          });
          that.results.addLayer(marker);
          marker.bindPopup(data.results[i].text).openPopup();
        }
      }
    });


    this.results.on('contextmenu', function(evt) {
      that.results.clearLayers();
    });
  }
});
