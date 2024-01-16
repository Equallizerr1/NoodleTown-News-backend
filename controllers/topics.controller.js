const { selectTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
	selectTopics()
        .then((topics) => {
			res.send({ topics });
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
};
