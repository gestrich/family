
var pg = require('pg');

module.exports = function(app) {
    return {
          show: function(req, res, next){
              res.render('index.html');
            
          },

          addComment: function(req, res, next){
            if(req.query != 'undefined'){
              name = req.query.name;
              commentText = req.query.text;
            }
console.log( "name: " + name);
console.log( "Text: " + commentText);
var connString = "postgres://lwfowkysseplan:OtoK8Fk-laklr6cdb-MgIhI_FO@ec2-54-227-255-156.compute-1.amazonaws.com:5432/d2smc7eu29u4b6";
//            pg.connect("postgres://lwfowkysseplan:OtoK8Fk-laklr6cdb-MgIhI_FO@ec2-54-227-255-156.compute-1.amazonaws.com:5432/d2smc7eu29u4b6", function(err, client) {
//            pg.connect(process.env.DATABASE_URL, function(err, client) {
//            pg.connect(postgres.env.DATABASE_URL, function(err, client) {
var client = new pg.Client( connString);
client.connect(function(err){
console.log("pg=" + JSON.stringify(pg));
//console.log("clent=" + JSON.stringify(client));
console.log("error: " + err);
            //add the new comment if provided
            //Once added, call function to
            var fetchData = function(){
              var query = client.query('SELECT * FROM COMMENTS ORDER BY comment_time desc');
              query.on('row', function(row, result) {
                result.addRow(row);
               });
              query.on('end', function(result) {
               console.log(result.rows.length + ' rows were received');
                res.render('comments.html', {comments: result.rows});
                return;
              });
            }

            var insertComment = function(){
              var timeStamp = new Date().getTime();
              var insertQuery = 'INSERT INTO COMMENTS VALUES('+ '\'' +  name + '\',\'' +  commentText + '\', \'now()\')';
              var query = client.query(insertQuery );
              query.on('row', function(row, result) {
                result.addRow(row);
               });
              query.on('end', function(result) {
               console.log(result.rows.length + ' rows were received');
              fetchData();
              });
            }

            var setEncoding = function(){
              var query = client.query("set client_encoding='utf-8'");
              query.on('row', function(row, result) {
                result.addRow(row);
               });
              query.on('end', function(result) {
               console.log(result.rows.length + ' rows were received');
              });
            }

            if(client==null) return;

            setEncoding();

            if(name != 'undefined' && commentText != 'undefined'){ 
              insertComment();
            }else{
              fetchData();
            }
            
            });
          }
    }
}
