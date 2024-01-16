const { selectTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
	selectTopics()
        .then((topics) => {
			res.send({ topics });
		})
		.catch((err) => {
			// remove later
			console.log(err);
			next(err);
		});
};
