// models/product.js
import { DataTypes } from 'sequelize'
import sequelize from '../database/db.js'

const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: false,
  },
  status: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: false,
  },
  type_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
  },
  branch: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  category: {
    type: DataTypes.JSON,
  },
})

export default Products
