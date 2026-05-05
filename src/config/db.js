const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce_db',
  password: '877758#Raghuveer_P001P',
  port: 5432,
});

module.exports = pool;