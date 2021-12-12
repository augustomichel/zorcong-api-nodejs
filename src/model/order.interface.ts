export interface BaseOrder {
  id: string,
  tipo: string,
  valor: number,
  date: Date,
  status: string,
  cliente: string,
  pago: string,
}

export interface Order extends BaseOrder {
  id: string;
}
