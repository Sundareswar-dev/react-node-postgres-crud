const { Pool } = require('pg');
require("dotenv").config();


const pool = new Pool({
  user: process.env.DB_USER || 'postgres',    
  host: process.env.DB_HOST || 'localhost',  
  database: process.env.DB_NAME || 'CRUD',
  password: process.env.DB_PASS || '12345678',
  port: process.env.DB_PORT || 5432, 
});

async function testConnection() {
  try {
    const client = await pool.connect(); 
    console.log("Database Connected Successfully!");
    client.release(); 
  } catch (err) {
    console.error(" Database Connection Failed!", err.message);
  }
}

testConnection();
module.exports = pool;
