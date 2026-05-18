const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: { rejectUnauthorized: false }
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

module.exports = pool;