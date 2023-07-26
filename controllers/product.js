import asyncHandler from 'express-async-handler'
import { STATUS_HTTPS } from '../utils/statusHTTPS.js'
import Products from '../models/products.js'
import _ from 'lodash'
import { COLUMN_PRODUCTS } from '../constants/products.js'
const CreateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    price,
    quantity,
    status,
    type_id,
    weight,
    branch,
    images = [],
    category,
  } = req?.body?.product || {}
  if (!name || !sku || !price) {
    return res.status(STATUS_HTTPS.ERROR).send({
      status: false,
      message: 'field is required',
    })
  }
  const existingProduct = await Products.findOne({ where: { sku } })
  if (existingProduct) {
    return res.status(STATUS_HTTPS.ERROR).json({ message: 'Product name already exists', status: false })
  }

  await Products.sync()
  const newProduct = await Products.create({
    name,
    sku,
    price,
    quantity,
    status,
    type_id,
    weight,
    branch,
    images,
    category,
  })

  res.status(STATUS_HTTPS.OK).send({ message: 'Product created successfully', product: newProduct, status: true })
})

const UpdateProduct = asyncHandler(async (req, res) => {
  const productSku = req?.params?.id
  try {
    if (!productSku) {
      return res.status(STATUS_HTTPS.ERROR).json({ message: 'Product id already exists', status: false })
    }
    const product = await Products.findOne({ where: { sku: productSku } })
    if (!product) {
      return req.status(STATUS_HTTPS.ERROR).json({
        message: 'Product not found',
        status: false,
      })
    }

    if (!_.isEmpty(req?.body?.product)) {
      Object.entries(req?.body?.product).forEach((e) => {
        const [key, value] = e || []
        if (COLUMN_PRODUCTS.includes(key)) {
          product[key] = value
        }
      })
    }
    await product.save()
    res.status(200).json({ message: 'Product updated successfully', product, status: true })
  } catch (error) {
    res.status(STATUS_HTTPS.ERROR).json({ message: 'Product id already exists', status: false })
  }
})

const GetAllProducts = asyncHandler(async (req, res) => {
  res.send('GetAllProducts')
})

const GetProductById = asyncHandler(async (req, res) => {
  res.send('GetProductById')
})

const DeleteProduct = asyncHandler(async (req, res) => {
  console.log('req', req.params)
  res.send('DeleteProduct')
})

export { CreateProduct, UpdateProduct, GetAllProducts, GetProductById, DeleteProduct }
