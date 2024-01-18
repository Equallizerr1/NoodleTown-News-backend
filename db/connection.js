const { Pool } = require("pg");
// const ENV = process.env.NODE_ENV || 'development';

// require('dotenv').config({
//   path: `${__dirname}/../.env.${ENV}`,
// });

// if (!process.env.PGDATABASE) {
//   throw new Error('PGDATABASE not set');
// }

// module.exports = new Pool();
const ENV = process.env.NODE_ENV || "production";

const config = {};

if (ENV === "production") {
	config.connectionString = process.env.DATABASE_URL;
	config.max = 2;
}

module.exports = new Pool(config);
