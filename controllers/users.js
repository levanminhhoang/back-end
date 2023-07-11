import { STATUS_HTTPS } from '../utils/statusHTTPS.js'
import User from '../models/user.js'
import asyncHandler from 'express-async-handler'
import _ from 'lodash'
import generateToken from '../config/jwtToken.js'

const Login = asyncHandler(async (req, res) => {
  const email = _.get(req, 'body.email')
  const password = _.get(req, 'body.password')
  const findUser = await User.findOne({ email })
  const isPassword = await findUser.isPasswordMatched(password)

  if (findUser && isPassword) {
    res.json({
      status: true,
      message: 'Login Successfully',
      token: generateToken(findUser?.id),
    })
  } else {
    throw new Error('Invalid User')
  }
})

const Register = asyncHandler(async (req, res) => {
  const email = _.get(req, 'body.email')
  const isOldUser = await User.findOne({ email })
  if (isOldUser) {
    throw new Error('User Already Exits')
  } else {
    //  new User
    const newUser = await User.create(req.body)
    res.status(STATUS_HTTPS.OK).json(newUser)
  }

  res.send('Register successfully')
})

export { Login, Register }
