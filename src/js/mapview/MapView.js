require('leaflet.markercluster');
var ClusteredFeatureLayer = require('esri-leaflet-clustered-feature-layer');

L.App = L.App || {};

L.App.MapView = L.Class.extend({

  statics: {},

  options: {},

  initialize: function(options) {
    console.log('app.mapview.MapView::initialize', arguments);

    L.setOptions(this, options);

    this._map = null;
    this._waterSystemsLocations = null;
    this._waterSystemsPoly = null;

    this._setupMap();
  },

  _setupMap: function() {
    console.log('app.mapview.MapView::_setupMap', arguments);

    this._map = L.map('map', {
      zoomControl: false,
      minZoom: 9
    }).setView([48.6, -123.0], 11);

    this._createBasemapLayers();
    this._createOperationalLayers();
    this._setupConnections();

  },

  _setupConnections: function() {
    console.log('app.mapview.MapView::_setupConnections', arguments);

    var waterSystemsPoly = this._waterSystemsPoly;
    var waterSystemsLocations = this._waterSystemsLocations;
    var oldId;

    waterSystemsPoly.on('click', function(e) {
      waterSystemsPoly.resetStyle(oldId);
      oldId = e.layer.feature.id;
      e.layer.bringToFront();
      waterSystemsPoly.setFeatureStyle(e.layer.feature.id, {
        color: '#9D78D2',
        weight: 3,
        opacity: 1
      });
    });

  },

  _createBasemapLayers: function() {
    console.log('app.mapview.MapView::_createBasemapLayers', arguments);

    this._baseLayers = null;

    var aerialBasemap = L.esri.tiledMapLayer('http://sjcgis.org/arcgis/rest/services/Basemaps/Aerials_2013_WM/MapServer', {
      attribution: 'Pictometry International'
    });


    this._baseLayers = {
      'Imagery': aerialBasemap
    };

    this._map.addLayer(aerialBasemap);

  },

  _createOperationalLayers: function() {
    console.log('app.mapview.MapView::_createOperationalLayers', arguments);

    this._opLayers = null;

    var referenceOverlay = L.esri.tiledMapLayer('http://sjcgis.org/arcgis/rest/services/Basemaps/Reference_Overlay_WM/MapServer');

    this._waterSystemsLocations = new ClusteredFeatureLayer('http://sjcgis.org/arcgis/rest/services/HCS/Water_Systems/MapServer/0', {
      proxy: 'http://sjcgis.org/proxy/proxy.ashx',
      disableClusteringAtZoom: 15
    });

    this._waterSystemsLocations.bindPopup(function(feature){
      return L.Util.template('<p>{Sys_Name}<br/>ID: {Sys_ID}<br/>Type: {SysGrp}</p>', feature.properties);
    });

    this._waterSystemsPoly = L.esri.featureLayer('http://sjcgis.org/arcgis/rest/services/HCS/Water_Systems/MapServer/1', {
      simplifyFactor: 0.2,
      precision: 5,
      proxy: 'http://sjcgis.org/proxy/proxy.ashx',
      minZoom: 15,
      style: function(feature) {
        switch(feature.properties.SysGrp) {
          case 'A':
          return {color: '#ffb5a0'};
          case 'A-TNC':
          return {color: '#fcd5c4'};
          case 'B':
          return {color: '#9e1906'};
          case '2-PTY':
          return {color: '#370c03'};
        default:
          return {color: 'white'};
        }
      }
    });

    this._waterSystemsPoly.bindPopup(function(feature) {
      return L.Util.template('<p>{Sys_Name}<br/>ID: {Sys_ID}<br/>Type: {SysGrp}</p>', feature.properties);
    });

    this._map.addLayer(referenceOverlay);
    this._map.addLayer(this._waterSystemsLocations);
    this._map.addLayer(this._waterSystemsPoly);

  }
});
