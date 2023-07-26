import fs from 'fs'
import cors from 'cors'
import https from 'https'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import usersRouter from '../routes/users.js'
import productsRouter from '../routes/product.js'

import { errorHandler, notFound } from '../middlewares/errorHandler.js'
import { corsOptions } from '../constants/cors.js'
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
// cors
app.use(cors(corsOptions))
// routes
app.use('/', usersRouter)
app.use('/', productsRouter)

app.use(notFound)
app.use(errorHandler)

const httpsOptions = {
  key: fs.readFileSync('./key/private_key.pem'),
  cert: fs.readFileSync('./key/certificate.pem'),
}
const server = https.createServer(httpsOptions, app)
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
