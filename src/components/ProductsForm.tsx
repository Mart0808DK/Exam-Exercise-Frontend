import React, {useState} from "react";
import type {IUpdateProduct} from "../types/products.types.ts";
import { toast, Toaster } from 'react-hot-toast';

interface IProductsFormProps {
    closeModal: () => void;
    add: (product: { price: number; name: string; weightInGrams: number }) => void;
    update: (product: IUpdateProduct) => void;
    editProduct: IUpdateProduct | null;
}

export function ProductsForm ({closeModal, add, update, editProduct}: IProductsFormProps) {
    const [name, setName] = useState(editProduct ? editProduct.name : "");
    const [price, setPrice] = useState(editProduct ? editProduct.price : 0);
    const [weightInGrams, setWeightInGrams] = useState(editProduct ? editProduct.weightInGrams : 0);

    async function handleCreate(product: { price: number; name: string; weightInGrams: number }) {
        try {
            add(product);
            closeModal();
        } catch (error) {
            toast.error('An error occurred!');
        }
    }

    async function handleUpdate(product: IUpdateProduct) {
        try {
            update(product);
            closeModal();
        } catch (error) {
            console.log(error);
            toast.error('An error occurred!');
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editProduct === null) {
            return;
        }
        const productDetails = {
            id: editProduct.id,
            name: name,
            price: price,
            weightInGrams: weightInGrams
        };
        if (editProduct.id) {
            await handleUpdate(productDetails);
            window.scroll(0, 0)
            toast("Product updated", {icon: '🚀'})
        } else {
            await handleCreate(productDetails);
            window.scroll(0, 0)
            toast("Product added", {icon: '🚀'})
        }
    }

    return (
        <>
        <Toaster position={"top-center"} toastOptions={{
            duration: 2000,
            style: {
                fontSize: '1.5rem',
            }

        }}/>
        <div className="flex p-6 ">
            <form onSubmit={handleSubmit} className="w-full">
                <h2 className="text-xl font-bold mb-4">Add Product</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input id="name" type="text" value={name}
                           onChange={e => setName(e.target.value)}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input id="price" type="number" value={price}
                           onChange={e => setPrice(Number(e.target.value))}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="weightInGrams" className="block text-gray-700 text-sm font-bold mb-2">Weight in
                        grams</label>
                    <input id="weightInGrams" type="number" value={weightInGrams}
                           onChange={e => setWeightInGrams(Number(e.target.value))}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <button
                    className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    type="submit">Submit
                </button>
            </form>
        </div>
        </>
    );
}