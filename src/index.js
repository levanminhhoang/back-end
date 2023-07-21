import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
// import connectDatabase from '../database/database.js'
import getConnection from '../database/mysql.js'
import usersRouter from '../routes/users.js'
import { errorHandler, notFound } from '../middlewares/errorHandler.js'
// dotEnv
dotenv.config()
// init app
const app = express()
// connect DB

// convert json
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// port
const port = process.env.PORT
// routes
app.use('/', usersRouter)

app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
