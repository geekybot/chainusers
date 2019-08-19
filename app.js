var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = 8081;
mongoose.connect("mongodb://localhost:27017/chain", {
    useNewUrlParser: true,
    useCreateIndex: true
});



app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// mongoose.connect(db);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

const  chainUsers= require("./routes/chainUsers.js");
app.use("/chainusers", chainUsers);


app.get("/", function (req, res) {
    console.log("app starting on port: " + port);
    res.send("tes express nodejs mongodb");
});

app.listen(port, function () {
    console.log("app listening on port: " + port);
});
