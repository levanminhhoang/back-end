import { STATUS_HTTPS } from '../utils/statusHTTPS.js'
// import User from '../models/user.js'
import asyncHandler from 'express-async-handler'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import generateToken from '../config/jwtToken.js'
import getConnection from '../database/mysql.js'
import { createUser, getUserByEmail } from '../models/user-modal.js'

const Login = asyncHandler(async (req, res) => {
  const email = _.get(req, 'body.email')
  const password = _.get(req, 'body.password')

  const connection = await getConnection()
  const [userData, field] = await getUserByEmail(email, connection)
  const firstUser = userData?.length > 0 ? userData[0] : {}

  if (!_.isEmpty(firstUser)) {
    const isPasswordValid = await bcrypt.compare(password, firstUser?.password)
    if (isPasswordValid) {
      res.json({
        status: true,
        message: 'Login Successfully',
        token: generateToken(firstUser?.id),
      })
    } else {
      throw new Error('Invalid password')
    }
  } else {
    res.status(STATUS_HTTPS.ERROR).json({ message: 'email invalid' })
  }
})

const Register = asyncHandler(async (req, res) => {
  const { username, email, password } = req?.body || {}

  try {
    const connection = await getConnection()
    const userData = await getUserByEmail(email, connection)

    const [existingUser, fieldsUser] = userData || []

    if (existingUser && existingUser.length > 0) {
      return res.status(STATUS_HTTPS.ERROR).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const [results] = await createUser(username, email, hashedPassword, connection)
    if (!_.isEmpty(results)) {
      res.status(STATUS_HTTPS.OK).json({ message: 'Sign Up Success' })
    }
  } catch (error) {
    console.log('error', error)
    res.status(STATUS_HTTPS.SEVER).json({ message: 'registration failed' })
  }
})

export { Login, Register }
