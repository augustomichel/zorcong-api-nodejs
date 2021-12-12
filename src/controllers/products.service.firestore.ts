import { BaseProduct, Product } from '../model/product.interface';

import database, { EMP } from '../dbFirestore';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
} from 'firebase/firestore/lite';

const dbRef = collection(database, 'produtos_' + EMP);

export const findAll = async (): Promise<Product[]> => {
  const prodArray: Product[] = [];
  const produtos = await getDocs(dbRef);
  produtos.forEach(doc => {
    const product: Product = {
      id: doc.id,
      Nome: doc.data().Nome,
      Valor: doc.data().Valor,
    };
    prodArray.push(product);
  });
  return prodArray;
};

export const find = async (id: string): Promise<Product> => {
  const docRef = doc(database, 'produtos_' + EMP, id);
  const produto = (await getDoc(docRef)).data();

  const product: Product = {
    id: produto ? id : '',
    Nome: produto ? produto.Nome : null,
    Valor: produto ? produto.Valor : null,
  };
  return product;
};

export const create = async (newProduct: BaseProduct): Promise<Product> => {
  //const id = push(dbRef).key;
  addDoc(dbRef, {
    Nome: newProduct.Nome,
    Valor: newProduct.Valor,
  });

  return newProduct;
};

export const remover = async (id: string): Promise<boolean> => {
  const product = await find(id);

  if (!product.id) {
    return false;
  }

  const docRef = doc(database, 'produtos_' + EMP, id);
  deleteDoc(docRef);
  return true;
};
