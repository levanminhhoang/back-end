import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { STATUS_HTTPS } from '../utils/statusHTTPS.js'
import Users from '../models/user.js'

dotenv.config()

const verifyToken = async (req, res, next) => {
  const auth = req?.headers?.authorization

  if (auth) {
    const [_, token] = auth.split(' ')
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '1d' })
        if (decoded && decoded.id) {
          const userData = await Users.findOne({ where: { token } })
          console.log('userData', userData)
          console.log('token', token)
          if (userData?.token == token) {
            next()
          } else {
          }
        }
      }
    } catch (error) {
      res.status(STATUS_HTTPS.ERROR).json({
        status: false,
        message: 'Not Authorized token expired, Please login again',
      })
    }
  } else {
    res.status(STATUS_HTTPS.ERROR).json({
      status: false,
      message: 'Not Authorized',
    })
  }
}

export default verifyToken
