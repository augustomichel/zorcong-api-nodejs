import { BaseProduct, Product } from '../../model/product.interface';

import database from '../../db';
import { ref, child, get, push, set, remove } from 'firebase/database';

const dbRef = ref(database, 'produtos');

export const findAll = async (): Promise<Product[]> =>
  get(child(dbRef, `1`)).then(snapshot => {
    return snapshot.val();
  });

export const find = async (id: string): Promise<Product> =>
  get(child(dbRef, `1/${id}`)).then(snapshot => {
    return snapshot.val();
  });

export const create = async (newProduct: BaseProduct): Promise<Product> => {
  const id = push(dbRef).key;

  set(ref(database, 'produtos/' + '1/' + id), {
    id: id,
    Nome: newProduct.Nome,
    Valor: newProduct.Valor,
  });

  return newProduct;
};

export const remover = async (id: string): Promise<boolean> => {
  const product = await find(id);

  if (!product) {
    return false;
  }

  remove(ref(database, 'produtos/' + '1/' + id));

  return true;
};
