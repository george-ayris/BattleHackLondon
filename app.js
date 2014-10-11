var connect = require('connect')
  , serveStatic = require('serve-static');

var indexLocation = '.';
console.log(indexLocation);

var app = connect();
app.use(serveStatic(indexLocation));
var server = app.listen(3000);