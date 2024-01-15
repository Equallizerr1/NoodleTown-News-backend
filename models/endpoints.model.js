const fs = require("fs/promises");

exports.fetchEndpoints = (callback) => {
	fs.readFile("./endpoints.json", "utf-8", (err, fileContents) => {
		if (err) callback(err);
		else {
            const endpointList = JSON.parse(fileContents);
            callback
		}
		//console.log({ endpointList });
	});
};
