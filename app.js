var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require('cors');
var port = 8081;

mongoose.connect("mongodb://localhost:27017/chain", {
    useNewUrlParser: true,
    useCreateIndex: true
});

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

app.listen(port, '0.0.0.0', function () {
    console.log("app listening on port: " + port);
});