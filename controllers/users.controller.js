const { selectUsers, selectUserUsername } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
	selectUsers()
		.then((users) => {
			res.send({ users: users });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getUserUsername = (req, res, next) => {
	selectUserUsername()
		.then((user) => {
			res.send(user);
		})
		.catch((err) => {
			next(err);
		});
};
