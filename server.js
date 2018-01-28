// server.js
// where your node app starts

// init project
var express = require('express');
//easily parse user-agent response
var userAgent = require('express-useragent');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

// instantiate body-parser, cors, useragent
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(userAgent.express());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', function(request, response){
  var ipAddress = request.ip;
  var language = request.acceptsLanguages();
  var software = request.useragent.browser + ', ' + request.useragent.os;
  
  response.json({'ipAddress': ipAddress, 'language': language[0], 'software': software});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
