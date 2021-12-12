import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const productRouter = Router();
const productsController = new ProductsController();

const FindValidation = celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const AddValidation = celebrate({
  body: Joi.object().keys({
    Nome: Joi.string().required(),
    Valor: Joi.number().precision(2).required(),
  }),
});

productRouter.get('/products', productsController.findAll);

productRouter.post('/product', FindValidation, productsController.find);

productRouter.post('/product/add', AddValidation, productsController.add);

productRouter.delete('/product/del', FindValidation, productsController.delete);

productRouter.post('/product/addfs', AddValidation, productsController.addfs);
productRouter.get('/productsfs', productsController.findAllfs);
productRouter.post('/productfs', FindValidation, productsController.findfs);
productRouter.delete(
  '/product/delfs',
  FindValidation,
  productsController.deletefs,
);

export default productRouter;
