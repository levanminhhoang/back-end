import asyncHandler from 'express-async-handler'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import Users from '../models/user.js'
import { STATUS_HTTPS } from '../utils/statusHTTPS.js'
import { generateToken, refreshToken } from '../config/jwtToken.js'

const Login = asyncHandler(async (req, res) => {
  const email = _.get(req, 'body.email')
  const password = _.get(req, 'body.password')
  if (!email || !password) {
    return res.json({
      status: false,
      message: 'Field is required',
    })
  }
  const existingUser = await Users.findOne({ where: { email } })
  if (!existingUser) {
    return res.json({
      status: false,
      message: 'Invalid email',
    })
  }
  const isPasswordValid = await bcrypt.compare(password, existingUser.password)

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' })
  }
  const accessToken = generateToken(existingUser.id)
  const refreshTokenData = refreshToken(existingUser.id)

  await existingUser.update({
    token: accessToken,
    refresh_token: refreshTokenData,
  })

  res.json({
    status: true,
    message: 'Login Successfully',
    token: accessToken,
    // refreshToken: refreshTokenData,
  })
})

const Register = asyncHandler(async (req, res) => {
  const { first_name, last_name, address, email, phone_number, password } = req?.body || {}

  if (!email || !password) {
    res.status(STATUS_HTTPS.SEVER).json({ message: 'field is required' })
  }
  try {
    const existingEmail = await Users.findOne({ where: { email } })

    if (existingEmail) {
      return res.status(STATUS_HTTPS.ERROR).json({ message: 'Email already exists', status: false })
    }

    await Users.sync()
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await Users.create({
      first_name,
      last_name,
      address,
      email,
      password: hashedPassword,
      phone_number,
    })

    if (!_.isEmpty(newUser)) {
      res.status(STATUS_HTTPS.OK).json({ message: 'Sign Up Success' })
    }
  } catch (error) {
    console.log('error', error)
    res.status(STATUS_HTTPS.SEVER).json({ message: 'registration failed' })
  }
})

export { Login, Register }
