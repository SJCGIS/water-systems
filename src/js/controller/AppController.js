require('../mapview/MapView');
require('esri-leaflet-geocoder');
require('sidebar-v2/js/leaflet-sidebar');

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

    this.searchControl = new L.esri.Geocoding.Controls.Geosearch({
      providers: [
        new L.esri.Geocoding.Controls.Geosearch.Providers.FeatureLayer({
          label: 'Water System',
          url: 'http://sjcgis.org/arcgis/rest/services/HCS/Water_Systems/MapServer/0',
          searchFields: ['Sys_Name', 'Sys_ID'],
          proxy: 'http://sjcgis.org/proxy/proxy.ashx',
          bufferRadius: 200,
          formatSuggestion: function(feature) {
            return feature.properties.Sys_Name;
          }
        }),
        new L.esri.Geocoding.Controls.Geosearch.Providers.MapService({
          url: 'http://sjcgis.org/arcgis/rest/services/Polaris/LocationSearch/MapServer',
          bufferRadius: 200,
          label: 'Address',
          layers: [0,2],
          searchFields: ['FULLADDR', 'PIN'],
          proxy: 'http://sjcgis.org/proxy/proxy.ashx',
          formatSuggestion: function(feature) {
            var suggestion;
            switch (feature.layerId) {
            case 0:
              suggestion = feature.properties['Full Address'];
              break;
            case 2:
              suggestion = feature.properties.PIN;
              break;
            }
            return suggestion;
          }
        })
      ],
      useArcgisWorldGeocoder: false,
      position: 'topright'
    }).addTo(this.mapView._map);

    this.sidebar = new L.control.sidebar('sidebar').addTo(this.mapView._map);

    this.sidebar.open('home');

    this.setupConnections();
  },

  setupConnections: function() {
    console.log('app.controller.AppController::setupConnections', arguments);

  }

});
