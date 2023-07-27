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

  try {
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
  } catch (error) {
    res.status(STATUS_HTTPS.ERROR).json({ message: error, status: false })
  }
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
    res.status(STATUS_HTTPS.ERROR).json({ message: error, status: false })
  }
})

const GetAllProducts = asyncHandler(async (req, res) => {
  const { currentPage, pageSize } = req?.query || {}

  if (!currentPage || !pageSize) {
    return res.status(STATUS_HTTPS.ERROR).json({ message: 'error', status: false })
  }
  const offset = (Number(currentPage) - 1) * Number(pageSize)
  const allProducts = await Products.findAll({ offset, limit: Number(pageSize) })

  const params = {
    message: 'Product updated successfully',
    status: true,
    products: allProducts,
  }

  res.status(200).send(params)
})

const GetProductById = asyncHandler(async (req, res) => {
  const { id } = req?.params || {}

  try {
    if (!id) {
      return res.status(STATUS_HTTPS.ERROR).json({ message: 'Product id does not exist', status: false })
    }
    const productItem = await Products.findOne({ where: { id } })

    if (!productItem) {
      return res.status(STATUS_HTTPS.ERROR).json({ message: 'Product does not exist', status: false })
    }
    const params = {
      status: true,
      message: 'Get product successfully',
      product: productItem,
    }
    res.status(200).json(params)
  } catch (error) {
    res.status(STATUS_HTTPS.ERROR).json({ message: error, status: false })
  }
})

const DeleteProduct = asyncHandler(async (req, res) => {
  const { id } = req?.params || {}

  try {
    if (!id) {
      return res.status(STATUS_HTTPS.ERROR).json({ message: 'Product id isRequired', status: false })
    }

    const productItem = await Products.findOne({ where: { id } })

    if (!productItem) {
      return res.status(STATUS_HTTPS.ERROR).json({ message: 'Product does not exist', status: false })
    }

    await Products.destroy({
      where: {
        id,
      },
    })

    const params = {
      status: true,
      message: 'Delete product successfully',
    }
    res.status(200).json(params)
  } catch (error) {
    res.status(STATUS_HTTPS.ERROR).json({ message: error, status: false })
  }
})

export { CreateProduct, UpdateProduct, GetAllProducts, GetProductById, DeleteProduct }
