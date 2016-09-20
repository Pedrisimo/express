let db = require('mysql');

function getDBRecs(callback) {
let connection = db.createConnection({
  host     : 'localhost',
  user     : 'pedro',
  password : 'dbtest',
  database : 'local'
});
connection.connect();
connection.query('SELECT * from persons', function(err, callback) {
    if (err) {
  	callback(err);
  }
  else {
      for (let i = 0; i < rows.length; i++) {
  console.log('Rows are: ', + rows[i].id + ":" + rows[i].name + ":" + rows[i].email + ":" + rows[i].phone);
  console.log(JSON.stringify(rows[i]));
}
}
});
connection.end();
}