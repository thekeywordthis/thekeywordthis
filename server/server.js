var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var http = require('http');
var fs = require('fs');
// var request = require('request');
var beautify = require('js-beautify').js_beautify;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', function(req, res, next) {
  console.log(req.method+req.url)
  next();
})
app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/assets/index.html'))
})

app.post('/usercode', function(req, res) {
  fs.writeFileSync('./client/testCodeBlock.js', beautify(req.body.code, { indent_size: 2 }));
  res.send(JSON.stringify(req.body.code));
})

app.listen(3000);

module.exports = app;
