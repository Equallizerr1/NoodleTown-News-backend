const { selectUsers } = require("../models/users.model");

exports.getUsers = () => {
	selectUsers();
};
