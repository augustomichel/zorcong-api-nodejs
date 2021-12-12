import express, { Request, Response, NextFunction } from 'express';
import * as ProductService from './products.service';
import { BaseProduct, Product } from '../model/product.interface';
import AppError from '../shared/errors/AppError';
import AppSuccess from '../shared/errors/AppSuccess';
import * as ProductServiceFs from './products.service.firestore';

export default class ProductsController {
  public async findAll(req: Request, res: Response) {
    const products: Product[] = await ProductService.findAll();

    res.send(new AppSuccess('Produtos Localizados', products).json);
  }

  public async find(req: Request, res: Response, next: NextFunction) {
    const id: string = req.body.id;

    const product: Product = await ProductService.find(id);

    if (product) {
      return res.send(new AppSuccess('Produto Localizado', product).json);
    }
    next(new AppError('Produto não localizado'));
  }

  public async add(req: Request, res: Response) {
    const item: BaseProduct = req.body;

    const newItem = await ProductService.create(item);
    res.send(new AppSuccess('Produto Adicionado', newItem).json);
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const id: string = req.body.id;

    const product = await ProductService.remover(id);

    if (!product) {
      next(new AppError('Produto não localizado'));
    } else {
      res.send(new AppSuccess('Produto deletado').json);
    }
  }

  //Firestore
  public async addfs(req: Request, res: Response) {
    const item: BaseProduct = req.body;

    const newItem = await ProductServiceFs.create(item);
    res.send(new AppSuccess('Produto Adicionado', newItem).json);
  }

  public async findAllfs(req: Request, res: Response) {
    const products: any[] = await ProductServiceFs.findAll();

    res.send(new AppSuccess('Produtos Localizados', products).json);
  }

  public async findfs(req: Request, res: Response, next: NextFunction) {
    const id: string = req.body.id;

    const product: any = await ProductServiceFs.find(id);

    if (product.id) {
      return res.send(new AppSuccess('Produto Localizado', product).json);
    }
    next(new AppError('Produto não localizado'));
  }

  public async deletefs(req: Request, res: Response, next: NextFunction) {
    const id: string = req.body.id;

    const product = await ProductServiceFs.remover(id);

    if (!product) {
      next(new AppError('Produto não localizado'));
    } else {
      res.send(new AppSuccess('Produto deletado').json);
    }
  }
}
