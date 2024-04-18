export interface IProduct {
    id: number;
    name: string;
    price: number;
    weightInGrams: number;
}

export interface IOrder {
    id: number;
    quantity: number;
    orderDate: string;
    product: IProduct;
}

export interface INewProduct {
    name: string;
    price: number;
    weightInGrams: number;
}

export interface IUpdateProduct {
    id?: number;
    name: string;
    price: number;
    weightInGrams: number;
}