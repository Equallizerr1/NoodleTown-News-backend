const { selectUsers } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
	selectUsers()
        .then((users) => {
			res.send({ users: users });
		})
		.catch((err) => {
			next(err);
		});
};
