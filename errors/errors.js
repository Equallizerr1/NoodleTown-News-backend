exports.customErrorHandler = (err, req, res, next) => {
	console.log(err);
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else next(err);
};

exports.sqlErrorHandler = (err, req, res, next) => {
	if (err.code === "23503") {
		res.status(404).send({ msg: "user does not exist" });
	} else if (err.code === "23502" || err.code === "22P02") {
		res.status(400).send({ msg: "Bad request" });
	}
};

exports.internalServerError = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: "Invalid URL: Internal server error" });
};
