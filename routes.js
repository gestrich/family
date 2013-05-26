// default routes
exports.register = function register(app){

  //requires
  var home       = require('./handlers/home')(app)

  //home routes
  app.get('/', home.show);
  app.get('/comments', home.addComment); 
  app.get('/robert_g_gestrich', home.robert_g_gestrich); 

}


