const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	bcrypt = require("bcrypt"),
	SALT_WORK_FACTOR = 10;

let chainSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	pubKey: { type: String, required: true },
	privKey: { type: String, required: true },
	mnemoninc: { type: String, required: true },
	datesaved: { type: Number, required: true }
});

chainSchema.pre("save", function (next) {
	var registration = this;
	if (!registration.isModified("password")) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(registration.password, salt, function (err, hash) {
			if (err) return next(err);
			registration.password = hash;
			next();
		});
	});
});

chainSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model("Chain", chainSchema);

// const mongoose = require("mongoose");

// const RegistrationSchema = mongoose.Schema({
//   emailId: String,
//   password: String
// });

// module.exports = mongoose.model("Registration", RegistrationSchema);
