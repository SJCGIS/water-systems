var L = require('leaflet')
var EsriLeaflet = require('esri-leaflet')
require('leaflet.markercluster')
var ClusteredFeatureLayer = require('esri-leaflet-cluster')

L.App = L.App || {}

L.App.MapView = L.Class.extend({
  statics: {},

  options: {},

  initialize: function (options) {
    console.log('app.mapview.MapView::initialize', arguments)

    L.setOptions(this, options)

    this._map = null
    this._waterSystemsLocations = null
    this._waterSystemsPoly = null

    this._setupMap()
  },

  _setupMap: function () {
    console.log('app.mapview.MapView::_setupMap', arguments)

    this._map = L.map('map', {
      zoomControl: false,
      minZoom: 9,
      maptiks_id: 'map'
    }).setView([48.6, -123.0], 11)

    this._createBasemapLayers()
    this._createOperationalLayers()
    this._setupConnections()
  },

  _setupConnections: function () {
    console.log('app.mapview.MapView::_setupConnections', arguments)

    var waterSystemsPoly = this._waterSystemsPoly
    var waterSystemsLocations = this._waterSystemsLocations
    var oldId

    // Highlight the clicked polygon
    waterSystemsPoly.on('click', function (e) {
      waterSystemsPoly.resetStyle(oldId)
      oldId = e.layer.feature.id
      e.layer.bringToFront()
      waterSystemsPoly.setFeatureStyle(e.layer.feature.id, {
        color: '#9D78D2',
        weight: 3,
        opacity: 1
      })
    })

    // Turn off waterSystemLocations at large scales and turn on again at smaller scales
    this._map.on('zoomend', function (e) {
      var map = e.target
      var zoom = map.getZoom()
      if (zoom >= 15 && map.hasLayer(waterSystemsLocations)) {
        map.removeLayer(waterSystemsLocations)
      } else if (zoom < 15 && map.hasLayer(waterSystemsLocations) === false) {
        map.addLayer(waterSystemsLocations)
      }
    })
  },

  _createBasemapLayers: function () {
    console.log('app.mapview.MapView::_createBasemapLayers', arguments)

    this._baseLayers = null

    var aerialBasemap = EsriLeaflet.tiledMapLayer({
      url:
        'https://sjcgis.org/arcgis/rest/services/Basemaps/Aerials_2013_WM/MapServer',
      attribution: 'Pictometry International',
      maptiks_id: 'aerialBasemap'
    })

    var generalBasemap = EsriLeaflet.tiledMapLayer({
      url:
        'https://sjcgis.org/arcgis/rest/services/Basemaps/General_Basemap_WM/MapServer',
      attribution: 'San Juan County GIS',
      maptiks_id: 'generalBasemap'
    })

    this._baseLayers = {
      Streets: generalBasemap
    }

    this._map.addLayer(generalBasemap)
  },

  _createOperationalLayers: function () {
    console.log('app.mapview.MapView::_createOperationalLayers', arguments)

    this._opLayers = null

    var popupTemplate =
      '<p>{Sys_Name}<br/>State ID#: {Sys_ID}<br/>Group: {Sys_Grp}</p>'
    popupTemplate +=
      '<a target="_blank" href="https://fortress.wa.gov/doh/eh/portal/odw/si/singlesystemviews/geninfosinglesys.aspx?orgnum=&xid={X_ID}">Additional Info</a>'

    this._waterSystemsLocations = ClusteredFeatureLayer.featureLayer({
      url:
        'https://sjcgis.org/arcgis/rest/services/HCS/Water_Systems/MapServer/0',
      //proxy: 'http://sjcgis.org/proxy/proxy.ashx',
      disableClusteringAtZoom: 15,
      singleMarkerMode: true,
      maptiks_id: 'waterSystemsLocations'
    })

    this._waterSystemsLocations.bindPopup(function (evt) {
      return L.Util.template(popupTemplate, evt.feature.properties)
    })

    this._waterSystemsPoly = EsriLeaflet.featureLayer({
      url:
        'https://sjcgis.org/arcgis/rest/services/HCS/Water_Systems/MapServer/1',
      simplifyFactor: 0.2,
      precision: 5,
      //proxy: 'http://sjcgis.org/proxy/proxy.ashx',
      minZoom: 15,
      style: function (feature) {
        switch (feature.properties.Sys_Grp) {
          case 'A':
            return { color: '#abd9e9', fillOpacity: 0.5 }
          case 'A-TNC':
            return { color: '#2c7bb6', fillOpacity: 0.5 }
          case 'B':
            return { color: '#fdae61', fillOpacity: 0.5 }
          case '2-PTY':
            return { color: '#d7191c', fillOpacity: 0.5 }
          default:
            return { color: 'white', fillOpacity: 0.5 }
        }
      },
      maptiks_id: 'waterSystemsPoly'
    })

    this._waterSystemsPoly.bindPopup(function (evt) {
      return L.Util.template(popupTemplate, evt.feature.properties)
    })

    this._map.addLayer(this._waterSystemsLocations)
    this._map.addLayer(this._waterSystemsPoly)
  }
})
