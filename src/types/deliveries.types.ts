import type {IVan} from "./van.types.ts";
import type {IOrder} from "./products.types.ts";

export interface IDeliveries {
    id: number;
    deliveryDate: Date;
    fromWareHouse: string;
    destination: string;
    van: IVan;
    totalAmount: number;
    productOrders: IOrder[];
}