import { DataTypes } from 'sequelize'
import sequelize from '../database/db.js'

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
    unique: true,
  },
  refresh_token: {
    type: DataTypes.STRING,
    unique: true,
  },
})

export default Users
