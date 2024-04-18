import {useEffect, useState} from "react";
import type {IProductOrders} from "../types/productorders.types.ts";

export function UseProductOrders() {
    const [productOrders, setProductOrders] = useState<IProductOrders[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const url = import.meta.env.VITE_API_URL + "/productorders";

    async function getProductOrders() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setProductOrders(data);
        } catch (e: unknown) {
            console.log(e);
        }
    }

    useEffect(() => {
        setLoading(true);
        getProductOrders().then(() => setLoading(false));
    }, []);

    return { productOrders, loading, };
}