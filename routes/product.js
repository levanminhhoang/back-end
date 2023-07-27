import express from 'express'
import { CreateProduct, DeleteProduct, GetAllProducts, GetProductById, UpdateProduct } from '../controllers/product.js'
import verifyToken from '../middlewares/authMiddlewares.js'

const productsRouter = express.Router()

productsRouter.post('/create-product', verifyToken, CreateProduct)
productsRouter.get('/products', GetAllProducts)
productsRouter.get('/product/:id', GetProductById)
productsRouter.put('/product/:id', verifyToken, UpdateProduct)
productsRouter.delete('/product/:id', verifyToken, DeleteProduct)

export default productsRouter
