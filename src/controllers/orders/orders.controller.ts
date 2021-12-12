import express, { Request, Response, NextFunction } from 'express';
import * as orderservice from './orders.service';
import { BaseOrder, Order } from '../../model/order.interface';
import AppError from '../../shared/errors/AppError';
import AppSuccess from '../../shared/errors/AppSuccess';
import * as orderserviceFs from './orders.service.firestore';

export default class OrdersController {
  public async findAll(req: Request, res: Response) {
    const orders: Order[] = await orderservice.findAll();

    res.send(new AppSuccess('Pedidos Localizados', orders).json);
  }

  public async find(req: Request, res: Response, next: NextFunction) {
    const id: string = req.body.id;

    const orders: Order = await orderservice.find(id);

    if (orders) {
      return res.send(new AppSuccess('Pedido Localizado', orders).json);
    }
    next(new AppError('Pedido não localizado'));
  }

  public async add(req: Request, res: Response) {
    const item: BaseOrder = req.body;

    const newItem = await orderservice.create(item);
    res.send(new AppSuccess('Pedido Adicionado', newItem).json);
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const id: string = req.body.id;

    const orders = await orderservice.remover(id);

    if (!orders) {
      next(new AppError('Pedido não localizado'));
    } else {
      res.send(new AppSuccess('Pedido deletado').json);
    }
  }

  //Firestore
  public async addfs(req: Request, res: Response) {
    const item: BaseOrder = req.body;

    const newItem = await orderserviceFs.create(item);
    res.send(new AppSuccess('Pedido Adicionado', newItem).json);
  }

  public async findAllfs(req: Request, res: Response) {
    const orders: any[] = await orderserviceFs.findAll();

    res.send(new AppSuccess('Pedidos Localizados', orders).json);
  }

  public async findfs(req: Request, res: Response, next: NextFunction) {
    const id: string = req.body.id;

    const Orders: any = await orderserviceFs.find(id);

    if (Orders.id) {
      return res.send(new AppSuccess('Pedido Localizado', Orders).json);
    }
    next(new AppError('Pedido não localizado'));
  }

  public async deletefs(req: Request, res: Response, next: NextFunction) {
    const id: string = req.body.id;

    const Orders = await orderserviceFs.remover(id);

    if (!Orders) {
      next(new AppError('Pedido não localizado'));
    } else {
      res.send(new AppSuccess('Pedido deletado').json);
    }
  }
}
