// export interface IOption {
//   id: number;
//   name: string;
//   price: number;
// }

export interface ICard {
  id: number;
  name: string;
  price: number;
  options: ICard[];
}

export interface IOrder {
  _id: number;
  refNumber: number;
  date: number;
  card: ICard[];
}
