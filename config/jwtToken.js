import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '10' })
}

const refreshToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' })
}
export { generateToken, refreshToken }
