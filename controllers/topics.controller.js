const { selectTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
	selectTopics()
		.then((topics) => {
			res.send({ topics: topics });
		})
		.catch((err) => {
			next(err);
		});
};
