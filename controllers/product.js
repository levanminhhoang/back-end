import asyncHandler from 'express-async-handler'

const CreateProduct = asyncHandler(async (req, res) => {
  console.log('req?.body', req?.body)
  const { name, sku, price } = req?.body || {}
  if (!name || !sku || !price) {
    res.status(200).send({
      status: false,
      message: 'field is required',
    })
  }
  res.send('CreateProduct')
})

const UpdateProduct = asyncHandler(async (req, res) => {
  res.send('UpdateProduct')
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
