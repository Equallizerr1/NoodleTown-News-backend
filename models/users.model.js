exports.selectUsers = () => {
	return db.query("SELECT * FROM users").then(({ rows }) => {
		return rows;
	});
};
