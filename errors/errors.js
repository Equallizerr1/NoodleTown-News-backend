exports.customErrorHandler = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else next(err);
};

exports.sqlErrorHandler = (err, req, res, next) => {
	if (err.code === "23502" || err.code === "22P02") {
		res.status(400).send({ msg: "Bad request" });
	}
};

exports.internalServerError = (err, req, res, next) => {
	console.log(err);
	res.status(500).send({ msg: "Invalid URL: Internal server error" });
};
