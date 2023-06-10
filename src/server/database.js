const { Pool } = require('pg');
const process = require('process');
const dotenv = require('dotenv');

//this method adds dotenv variables to our process
dotenv.config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = pool;
