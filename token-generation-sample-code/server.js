// This is a simple nodejs code to run a server on https and accept get and post request
var express = require("express");
var https = require("https");
var fs = require("fs");
const bodyParser = require("body-parser");
var app = express();

app.use(express.static('./'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/redirect.html", function(req, res){
res.render(__dirname + '/redirect.html',{code:req.body.code,state:req.body.state,id_token:req.body.id_token});
});

var options = {
key: fs.readFileSync("mockserver.key"),
cert: fs.readFileSync("mockserver.crt")
}

var server = https.createServer(options, app);
console.log("Listen to 3000");
server.listen(3000);