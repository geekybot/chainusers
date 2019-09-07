var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require('cors');
var port = 8081;
const http = require('http');
const https = require('https');
const fs = require('fs');

mongoose.connect("mongodb://localhost:27017/chain", {
    useNewUrlParser: true,
    useCreateIndex: true
});


const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.buildonchain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.buildonchain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/api.buildonchain.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


// mongoose.connect(db);
// app.options('*', cors());
app.options('*', cors());
app.use(cors());

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: false
}));

const  chainUsers= require("./routes/chainUsers.js");
app.use("/chainusers", chainUsers);

app.get("/", function (req, res) {
    console.log("app starting on port: " + port);
    res.send("tes express nodejs mongodb");
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});