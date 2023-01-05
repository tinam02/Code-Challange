export interface IOption {
  id: number;
  name: string;
  price: number;
}

export interface ICard {
  id: number;
  name: string;
  price: number;
  options: IOption[];
}

export interface IOrder {
  refNumber: number;
  date: number;
  card: ICard[];
}
