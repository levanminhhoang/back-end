import { STATUS_HTTPS } from '../utils/statusHTTPS.js'

const notFound = (req, res, next) => {
  const error = new Error(`not found: ${req.originalUrl}`)
  res.status(STATUS_HTTPS.ERROR)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode == 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err?.message,
    stack: err?.stack,
  })
}

export { notFound, errorHandler }
