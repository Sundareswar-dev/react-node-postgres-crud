const pool = require('../config/db');
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");


const User = {
  createUserCredentials:async(name, email, password)=>{
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await pool.query('SELECT * FROM userlist');
    return result.rows;
  },
  
  getById: async (id) => {
    const result = await pool.query('SELECT * FROM userlist WHERE id = $1', [id]);
    return result.rows[0];
  },
  create: async (name, email, role, address, profile) => {
    const result = await pool.query(
      'INSERT INTO userlist (name, email, role, address, profile) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, role, address, profile]
    );
    return result.rows[0];
  },
  update: async (id, name, email,role, profile, address) => {
    const result = await pool.query(
      'UPDATE userlist SET name = $1, email = $2, role = $3, address = $4, profile = $5 WHERE id = $6 RETURNING *',
      [name, email, role, address, profile, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    await pool.query('DELETE FROM userlist WHERE id = $1', [id]);
  },
};

module.exports = User;
