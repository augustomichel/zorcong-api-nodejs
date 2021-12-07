import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const productRouter = Router();
const productsController = new ProductsController();

productRouter.get('/products', productsController.findAll);
productRouter.get('/product', productsController.find);
productRouter.post('/product/add', productsController.add);
productRouter.delete('/product/del', productsController.delete);

export default productRouter;
