async function createUser(username, email, password, connection) {
  return await connection.execute('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [
    username,
    email,
    password,
  ])
}

async function getUserByEmail(email, connection) {
  return await connection.execute('SELECT * FROM user WHERE email = ?', [email])
}

// async function checkUserInvalid(email, password, connection) {
//   return await connection.execute('SELECT * FROM user WHERE email = ? AND password = ?', [email, password])
// }

export { createUser, getUserByEmail }
