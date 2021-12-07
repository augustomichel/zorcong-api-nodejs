export interface BaseProduct {
  id: string;
  Nome: string;
  Valor: number;
}

export interface Product extends BaseProduct {
  id: string;
}
