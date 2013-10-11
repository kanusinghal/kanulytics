## An AngularJS based analytics application using NvD3 Graph Visualizations

## Overview

This application takes the developer through the process of building a web-application using
angular and d3 graph visualization library.


### Running the app during development
There is no backend (no server) for this application. Instead we fake the XHRs by fetching
static csv files.
1. run `./scripts/web-server.js`
2. navigate your browser to `http://localhost:8000/app/index.html` to see the app running in your
   browser.

## Application Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
        nv.d3.css       --> nv.d3 charts stylesheet
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> application
        csvtoarray.js   --> csv to json converter
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
        angularjs-nvd3-directives.js ---> nvd3 chart directives
      lib/              --> angular and 3rd party javascript libraries
        angular/
          angular.js        --> the latest angular js
          angular.min.js    --> the latest minified angular js
          angular-*.js      --> angular add-on modules
          version.txt       --> version number

    scripts/            --> handy shell/js/ruby scripts
      e2e-test.sh       --> runs end-to-end tests with Karma (*nix)
      e2e-test.bat      --> runs end-to-end tests with Karma (windows)
      test.bat          --> autotests unit tests with Karma (windows)
      test.sh           --> autotests unit tests with Karma (*nix)
      web-server.js     --> simple development webserver based on node.js

### Screenshots -
![With Line Chart selection](http://i.imgur.com/Ayfb3Dz.png)

![With Scatter Chart selection](http://i.imgur.com/d9MVDy0.png)

![With Scatter Chart Lasso selection](http://i.imgur.com/pYQgS68.png)
