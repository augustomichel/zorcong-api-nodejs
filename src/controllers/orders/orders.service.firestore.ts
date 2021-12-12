import database, { EMP } from '../../dbFirestore';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore/lite';
import { BaseOrder, Order } from '../../model/order.interface';

const dbRef = collection(database, 'orders_' + EMP);

export const findAll = async (): Promise<Order[]> => {
  const orderArray: Order[] = [];

  //const q = query(dbRef, where("date", ">=", 0));
  const q = query(dbRef);
  const orders = await getDocs(q);
  orders.forEach(doc => {
    const order: Order = {
      id: doc.data().id,
      valor: doc.data().valor,
      tipo: doc.data().tipo,
      date: doc.data().date,
      status: doc.data().status,
      cliente: doc.data().cliente,
      pago: doc.data().pago
    };
    orderArray.push(order);
  });
  return orderArray;
};

export const find = async (id: string): Promise<Order> => {
  const docRef = doc(database, 'orders_' + EMP, id);
  const order = (await getDoc(docRef)).data();

  const orderResult: Order = {
    id: order ? id : '',
    valor: order ? order.Valor : null,
    tipo: order ? order.tipo : null,
    date: order ? order.date : null,
    status: order ? order.status : null,
    cliente: order ? order.cliente : null,
    pago: order ? order.pago : null
  };
  return orderResult;
};

export const create = async (newOrder: BaseOrder): Promise<Order> => {
  addDoc(dbRef, {
    Valor: newOrder.valor,
    tipo: newOrder.tipo,
    date: newOrder.date,
    status: newOrder.status,
    cliente: newOrder.cliente,
    pago: newOrder.pago,
  });

  return newOrder;
};

export const remover = async (id: string): Promise<boolean> => {
  const order = await find(id);

  if (!order.id) {
    return false;
  }

  const docRef = doc(database, 'orders_' + EMP, id);
  deleteDoc(docRef);
  return true;
};
