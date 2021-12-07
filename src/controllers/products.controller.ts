import express, { Request, Response } from 'express';
import * as ProductService from './products.service';
import { BaseProduct, Product } from '../model/product.interface';

export const productsRouter = express.Router();

productsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await ProductService.findAll();

    res.status(200).send(products);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

productsRouter.get('/product', async (req: Request, res: Response) => {
  const id: string = req.body.id;

  try {
    const product: Product = await ProductService.find(id);

    if (product) {
      return res.status(200).send(product);
    }

    res.status(404).send('Produto não localizado');
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

productsRouter.post('/add', async (req: Request, res: Response) => {
  try {
    const item: BaseProduct = req.body;

    const newItem = await ProductService.create(item);

    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

productsRouter.delete('/del', async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;

    const erro = await ProductService.remover(id);

    if (erro) {
      res.status(404).send('Produto não localizado');
    } else {
      res.status(200).send('Produto deletado');
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
