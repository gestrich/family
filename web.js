var express = require("express");
var hbs = require("hbs");
var app = express();
app.use(express.logger());
app.use(express.static(__dirname + '/public'));

console.log(app.settings);
//app.set('views', __dirname + '/views');
app.engine('html', hbs.__express);

app.get('/', function(request, response) {
	response.render('index.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
