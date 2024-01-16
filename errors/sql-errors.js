exports.sqlErrorHandler = (err, req, res, next) => {
	if (err.code === "23502" || err.code === "22P02") {
		res.status(400).send({ msg: "Bad request" });
	}
};
