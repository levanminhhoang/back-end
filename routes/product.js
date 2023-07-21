import express from 'express'
import { CreateProduct, DeleteProduct, GetAllProducts, GetProductById, UpdateProduct } from '../controllers/product.js'
import authMiddleWares from '../middlewares/authMiddlewares.js'

const productsRouter = express.Router()

productsRouter.post('/create-product', authMiddleWares, CreateProduct)
productsRouter.get('/products', GetAllProducts)
productsRouter.get('/product/:id', GetProductById)
productsRouter.put('/product/:id', UpdateProduct)
productsRouter.delete('/product/:id', DeleteProduct)

export default productsRouter
