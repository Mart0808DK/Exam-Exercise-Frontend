import {useEffect, useState} from "react";
import {handleHttpErrors, makeOptions} from "../utils/fetch.ts";
import type {INewProduct, IProduct, IUpdateProduct} from "../types/products.types.ts";


export function UseProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const url = import.meta.env.VITE_API_URL + "/products";


    async function getProducts() {
        try {
            const response = await fetch(url).then(handleHttpErrors);
            if (response.status === 200) {
                return;
            }
            setProducts(response);
        } catch (e: unknown) {
            console.log(e);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getProducts().then(() => setIsLoading(false));
    }, []);

    async function add(product: INewProduct) {
        const options = makeOptions("POST", product);
        try {
            const newProduct = await fetch(url, options).then(
                handleHttpErrors
            );
            setProducts(prevProducts => [...prevProducts, newProduct]);
        } catch (e: unknown) {
            console.log(e);
        }
    }

    async function update(product: IUpdateProduct) {
        const options = makeOptions("PUT", product);
        try {
            const updatedProduct = await fetch(`${url}/${product.id}`, options).then(
                handleHttpErrors
            );
            setProducts(prevProducts => prevProducts.map(p => p.id === product.id ? updatedProduct : p));
        } catch (e: unknown) {
            console.log(e);
        }
    }

    async function deleteProduct(id: number) {
        const options = makeOptions("DELETE", null);
        try {
            await fetch(`${url}/${id}`, options).then(
                handleHttpErrors
            );
            setProducts(prevProducts => prevProducts.filter((p: IProduct) => p.id !== id));
        } catch (e: unknown) {
            console.log(e);
        }
    }
    return ({products, isLoading, add, update, deleteProduct});
}