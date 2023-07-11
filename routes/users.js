import express from 'express'
const usersRouter = express.Router()
import { body } from 'express-validator'
import { Login, Register } from '../controllers/users.js'

usersRouter.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({
    min: 5,
  }),
  Login
)

usersRouter.post(
  '/register',
  body('email').isEmail(),
  body('firstName'),
  body('lastName'),
  body('address'),
  body('password').isLength({
    min: 5,
  }),
  Register
)

export default usersRouter
