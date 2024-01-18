exports.customErrorHandler = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else next(err);
};
exports.internalServerError = (err, req, res, next) => {
	res.status(500).send({ msg: "Invalid URL: Internal server error" });
};
