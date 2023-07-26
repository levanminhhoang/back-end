import mysql from 'mysql2'

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

function getConnection() {
  return pool.promise()
}

export default getConnection
