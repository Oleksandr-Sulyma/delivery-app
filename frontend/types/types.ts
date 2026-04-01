export interface IProduct {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  shop: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IShop {
  _id: string;
  name: string;
  address: string;
  rating: number;
}