var express = require("express");
var JobSeeker = require("../models/chainUser");
var router = express.Router();
var utils = require('./utils');
// Normal registration takes three parameters: name, emailId, password
router.post("/register", async (req, res) => {
	var newUser = new JobSeeker();
	newUser.username = req.body.username;
	newUser.name = req.body.name;
	newUser.password = req.body.password;
	var a = await utils.generate();
	console.log(a);
	newUser.mnemoninc = a.mnemoninc;
	newUser.pubKey = a.publicKey;
	newUser.privKey = a.masterPrivateKey;
	newUser.datesaved = (new Date()).getTime();
	// res.send({"messagge": a});
	console.log(newUser);
	newUser.save(function (err, user) {
		if (err) {
			console.log(err);
			if (err.toString().slice(12, 18) == "E11000") {
				res.send({ message: "User already registered", username: req.body.username });
				return;
			}
			res.send({ message: "error while registration" });
			return;
		} else {
			res.status(201).send({ message: "User created", userId: req.body.username });
		}
	});
});

// Login for username(emailId) password
router.post('/login', (req, res) => {
	console.log(req.body);
	JobSeeker.findOne({ username: req.body.username }, function (err, user) {
		if (err) {
			res.json({ message: "User not found" });
			return;
		}
		else if (!user) {
			res.json({ message: "User not found" });
			return;
		}
		user.comparePassword(req.body.password, function (err, isMatch) {
			if (err) {
				res.status(405).send({
					authenticated: false,
					message: "Internal server error"
				});
				return;
			}
			if (isMatch)
				res.status(200).send({ authenticated: isMatch, message: "Logged in successfully" });
			else
				res.status(401).send({ authenticated: isMatch, message: "Username or password is incorrect" });
		});
	});
});

// get a user by id
router.get('/user/:usernmae', (req, res) => {
	JobSeeker.findOne({ username: req.params.username }, function (err, user) {
		if (err) {
			res.json({ message: "User not found" });
			return;
		}
		res.status(200).send({ message: "User found", data: user });

	});
});


router.get('/dashboarddata', (req, res) => {
	let data = {}
	JobSeeker.find().sort({ datesaved: 1 }).limit(50).then((users) => {
		console.log("first users: ", users);
		data.users = users;
		
		
		JobSeeker.count().then((count) => {
			console.log("second: ", count);
			data.count = count;
			JobSeeker.find({
				"datesaved":
				{
					$gte: (new Date()).getTime() + 86400000,
					$lt: (new Date()).getTime()
				}
			}).then((list) => {
				console.log("third list: ", list.length);
				data.lastDay = list.length
			})
		});
		res.send(data);
		return;
	});
	res.send("You are wrong");

})


module.exports = router;
