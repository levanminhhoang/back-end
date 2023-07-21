import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.js'
import { STATUS_HTTPS } from '../utils/statusHTTPS.js'

dotenv.config()

const authMiddleWares = async (req, res, next) => {
  const auth = req?.headers?.authorization

  if (auth) {
    const [_, token] = auth.split(' ')
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '1d' })

        if (decoded && decoded.id) {
          const filter = { _id: decoded.id }
          const user = await User.findOne(filter)
          if (!!user) {
            next()
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
      message: 'not header',
    })
  }
}

export default authMiddleWares
