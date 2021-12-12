import database from '../../db';
import { ref, child, get, push, set, remove,orderByChild, query, orderByValue  } from 'firebase/database';
import { BaseOrder, Order } from '../../model/order.interface';
import { EMP } from '../../dbFirestore';

const dbRef = ref(database, 'orders');

export const findAll = async (): Promise<Order[]> => {
  const orderArray: Order[] = [];
  const mostViewedPosts = query(dbRef, orderByChild('cliente'));

  (await get(mostViewedPosts)).forEach(snapshot => {
    orderArray.push(snapshot.val());
  });
  return orderArray;
}

export const find = async (id: string): Promise<Order> =>
  get(child(dbRef, `${EMP}/${id}`), ).then(snapshot => {
    return snapshot.val();
  });

export const create = async (newOrder: BaseOrder): Promise<Order> => {
  const id = push(dbRef).key;

  set(ref(database, 'orders/' + EMP + '/' + id), {
    id: id,
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
  const Order = await find(id);

  if (!Order) {
    return false;
  }

  remove(ref(database, 'orders/' + '1/' + id));

  return true;
};
