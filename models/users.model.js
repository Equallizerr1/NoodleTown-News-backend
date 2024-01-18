const db = require("../db/connection");

exports.selectUsers = () => {
	return db.query("SELECT * FROM users").then(({ rows }) => {
		return rows;
	});
};

exports.selectUserUsername = (username) => {
	return db
		.query("SELECT * FROM users WHERE username = $1;", [username])
		.then(({ rows }) => {
			return rows;
		});
};
