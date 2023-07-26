import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const password = process.env.DB_PASSWORD
const dbUser = process.env.DB_USER
const dbDatabase = process.env.DB_DATABASE
const host = process.env.HOST

const sequelize = new Sequelize(dbDatabase, dbUser, password, {
  host: host,
  dialect: 'mysql',
})

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to the database has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

export default sequelize
