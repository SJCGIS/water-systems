# San Juan County Water Systems

A web application showing water system boundaries in San Juan County. Water system boundaries are defined by the parcels included in the water system as set in the San Juan County Health Department database. Report mapping errors by sending an email to [sjcgis@sanjuanco.com](mailto:sjcgis@sanjuanco.com) or by [submitting an issue on GitHub](http://github.com/sjcgis/water-systems/issues/new).

## Features

- Uses [Esri-Leaflet](http://github.com/esri/esri-leaflet) with County ArcGIS Server map services
- Search by water system name, address, or parcel number.

## Contributions

Please read [How To Contribute](http://github.com/sjcgis/water-systems/blob/master/CONTRIBUTING.MD).

## How to build it yourself (Advanced)

1) Install [node.js](https://nodejs.org/).

2) Download the [Water-Systems.zip](https://github.com/SJCGIS/water-systems/archive/master.zip) file and extract it to a location.

3) Alternatively, install [Git](http://www.git-scm.com/) and clone the repository. [Learn to Use Git here](https://try.github.io/).

4) Open a terminal or command window (Start - Run - CMD on Windows).

5) Change the directory (```cd```) to the location of ```water-systems``` on your computer where you extracted the zip file (or cloned the git repository). Example: ```cd C:\water-systems```

6) Type ```npm install``` to install all the required dependencies (requires internet connection).

7) Type ```npm install -g grunt``` to install the Grunt build tools globally (may require administrator permissions).

8) Copy ```ga.secret.js``` to ```ga.js``` and enter your [Google Analytics](http://analytics.google.com) ID.

9) Type ```grunt``` to run the application locally in your browser.

10) Type ```grunt build:prod``` to compile the water-systems app into the ```dist``` folder.

11) Move the contents of the ```dist``` folder to a web-enabled directory (Example: ```c:\inetpub\wwwroot\water-systems```) or a web hosting service.

12) Report bugs or installation problems by [submitting an issue on GitHub](http://github.com/sjcgis/water-systems/issues/new).

## Change Log

Code changes are reported in the [Change Log](https://github.com/SJCGIS/water-systems/blob/master/CHANGELOG.MD). However, changes to maps may not be included.

## Licensing
Copyright 2017 San Juan County GIS

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](https://raw.github.com/sjcgis/water-systems/master/LICENSE.txt) file.
