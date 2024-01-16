# Northcoders News API
A Reddit like API that integrates with postgresql

## Build and run instructions
Create .env.test & .env.development and add the following code.
`PGDATABASE=$database_name_here$`

## Dev
Once you've installed dependencies with npm install, setup and seed the database.

`npm run setup-dbs`

`npm run seed`

## Testing
To run the test suite and seed the db with test data.

`npm run test`
