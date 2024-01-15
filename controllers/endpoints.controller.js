const { fetchEndpoints } = require("../models/endpoints.model");

exports.getEndpoints = (req, res, next) => {
	fetchEndpoints().then((endpoints) => {
		res.send({ endpoints });
	});
};
