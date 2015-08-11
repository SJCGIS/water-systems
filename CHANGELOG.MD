# Change Log
Al notable changes to water-systems web application will be documented in this file. Corrections to the water system maps may not be reflected here. This project adheres to [Semantic Versioning](http://semver.org).

## 1.0.1 - 2015-08-11

### Fixed

- Esri Leaflet 1.0 requires url parameter for all layer constructors to be put in options.

## 1.0.0 - 2015-07-21

### Added

- Popup includes "More Info" link the points directly to water system information from WA Department of Health Sentry Database.

- Users receive a no results found notification when geosearch is unsuccessful.

- Add CONTRIBUTING.MD instructions for contributing to the project.


## 0.2.0 - 2015-07-09

### Added

- Map includes collapsible sidebar with information about web map.

- Geocoder search now adds red location markers to map. Can be removed by right-clicing on a marker.


### Changed

- Water System location markers turn off at large scales when boundaries are preferable. They turn on again when zooming to smaller scales when boundaries are turned off.

- Switched to general basemap for default so parcel boundaries are visible.

- Geocoder did not work as expected. It would do nothing when a user typed in a search and pressed enter. Instead the search would take several long seconds to search the Address and Parcel feature layers and add a selection menu that the user was supposed to use. Now the geocoder uses a custom Geocoding Service which is much faster and also works when Enter button is pressed. While water system names are suggested as they are typed in, the geocoder services needs to be on ArcGIS Server 10.3+ in order to make suggestions for addresses, parcels, etc.


## 0.1.0 - 2015-06-09

### Added

- Initial build
