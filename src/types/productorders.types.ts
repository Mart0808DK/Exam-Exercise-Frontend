import type {IProduct} from "./products.types.ts";

export interface IProductOrders {
    id: number;
    quantity: number;
    orderDate: Date;
    product: IProduct[]
}