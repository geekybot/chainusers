var express = require("express");
var JobSeeker = require("../models/chainUser");
var router = express.Router();
var utils = require('./utils');
// Normal registration takes three parameters: name, emailId, password
router.post("/register", async (req, res) => {
  var newUser = new JobSeeker();
  newUser.name = req.body.name;
  newUser.password = req.body.password;
  var a = await utils.generate();
  console.log(a);
  newUser.mnemoninc = a.mnemoninc;
  newUser.pubKey = a.publicKey;
  newUser.privKey = a.masterPrivateKey;
  // res.send({"messagge": a});
  console.log(newUser);
  newUser.save(function (err, user) {
    if (err) {
      console.log(err);
      if (err.toString().slice(12, 18) == "E11000") {
        res.send({ message: "User already registered", emailId: req.body.emailId });
        return;
      }
      res.send({ message: "error while registration" });
      return;
    } else {
      res.status(201).send({ message: "User created", emailId: req.body.emailId });
    }
  });
});

// Login for username(emailId) password
router.post('/login', (req, res) => {
  console.log(req.body);
  JobSeeker.findOne({ _id: req.body.id }, function (err, user) {
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
router.get('/user/:id', (req, res) => {
  JobSeeker.findOne({ username: req.params.emailId }, function (err, user) {
    if (err) {
      res.json({ message: "User not found" });
      return;
    }
    res.status(200).send({ message: "User found", data: user });

  });
});


// add personal details to the user
router.put("/updatepersonaldetails/:emailId", (req, res) => {
  console.log(req.body);

  JobSeeker.findOneAndUpdate({
    emailId: req.params.emailId
  }, {
      $set: {
        profilePicture: req.body.profilePicture,
        DOB: req.body.DOB,
        nationality: req.body.nationality,
        currentLocation: req.body.currentLocation,
        phoneNo: req.body.phoneNo,
        gender: "F",
        coverLetter: req.body.coverLetter,
        videoCv: req.body.videoCv,
        resume: req.body.resume
      }
    }, {
      upsert: true
    }, function (err, ) {
      if (err) {
        res.send('error updating registration details');
        return;
      }
      res.status(201).send({message: "Personal Details updated successfully", data: req.body });
    });
});


router.put("/addexperience/:emailId", (req, res) => {
  JobSeeker.findOneAndUpdate({
    emailId: req.params.emailId
  }, {
      $push: {
        workExperiences: req.body.experienceList
      }
    }, {
      upsert: true
    }, function (err, ) {
      if (err) {
        res.send('error updating registration details');
        return;
      }
      res.status(201).send({
        message: "Experiencce details updated",
        data: req.body.experienceList
      });
    });
});
//

// router.put("/addexperience/:emailId", (req, res) => {
//   JobSeeker.findOneAndUpdate({
//     emailId: req.params.emailId
//   }, {
//       $push: {
//         workExperiences: req.body.experienceList
//       }
//     }, {
//       upsert: true
//     }, function (err, ) {
//       if (err) {
//         res.send('error updating registration details');
//         return;
//       }
//       res.status(201).send({
//         message: "Experiencce details updated",
//         data: req.body.experienceList
//       });
//     });
// });


module.exports = router;
