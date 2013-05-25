var express = require("express");
var hbs = require("hbs");
var app = express();
var pg = require('pg').native;
var routes   = require('./routes');
var engines = require('consolidate');

app.configure( function() {

      app.set('views', __dirname + '/views');
      app.set('view engine', 'handlebars');
      app.set("view options", { layout: false }); 
      app.engine('.html', engines.handlebars);
});

app.use(express.logger());
app.use(express.static(__dirname + '/public'));

  console.log(app.settings);
  app.engine('html', hbs.__express);

// register routes
  routes.register(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
