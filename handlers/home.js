
var pg = require('pg').native;

module.exports = function(app) {
    return {
          show: function(req, res, next){
              res.render('index.html');
            
          },

          addComment: function(req, res, next){
            name = req.query.name;
            commentText = req.query.text;
console.log( "name: " + name);
console.log( "Text: " + commentText);


            pg.connect('postgres://lwfowkysseplan:OtoK8Fk-laklr6cdb-MgIhI_FO@ec2-54-227-255-156.compute-1.amazonaws.com:5432/d2smc7eu29u4b6', function(err, client) {

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
             //   res.render('comments.html', {comments: result.rows});
              fetchData();
              });
            }
            if(name != 'undefined' && commentText != 'undefined'){ 
              insertComment();
            }else{
              fetchData();
            }
            
            });
          }
    }
}