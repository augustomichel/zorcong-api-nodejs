import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import OrdersController from '../controllers/orders/orders.controller';

const orderRouter = Router();
const ordersController = new OrdersController();

const FindValidation = celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
});

const AddValidation = celebrate({
  body: Joi.object().keys({
    valor: Joi.number().precision(2).required(),
    tipo: Joi.string().required(),
    date: Joi.date().required(),
    status: Joi.string().required(),
    cliente: Joi.string().required(),
    pago: Joi.string().required(),
  }),
});

orderRouter.get('/orders', ordersController.findAll);

orderRouter.post('/order', FindValidation, ordersController.find);

orderRouter.post('/order/add', AddValidation, ordersController.add);

orderRouter.delete('/order/del', FindValidation, ordersController.delete);

orderRouter.post('/order/addfs', AddValidation, ordersController.addfs);
orderRouter.get('/ordersfs', ordersController.findAllfs);
orderRouter.post('/orderfs', FindValidation, ordersController.findfs);
orderRouter.delete('/order/delfs', FindValidation, ordersController.deletefs);

export default orderRouter;
