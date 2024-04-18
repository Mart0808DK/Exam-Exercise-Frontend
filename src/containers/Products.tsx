import { UseProducts } from '../hooks/UseProducts.ts';
import {useEffect, useState} from "react";
import type {IProduct, IUpdateProduct} from "../types/products.types.ts";
import {SearchBar} from "../components/SearchBar.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import Modal from "../components/Modal.tsx";
import {ProductsForm} from "../components/ProductsForm.tsx";
import {toast, Toaster} from "react-hot-toast";

function Products() {
    const { products, isLoading, add, update, deleteProduct } = UseProducts();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [editProduct, setEditProduct] = useState<IUpdateProduct | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen w-screen"><LoadingSpinner/></div>;
    }

    const setSearchTerm = (term: string) => {
        setSearch(term);
        if (term) {
            const filtered = products.filter(product => product.name.toLowerCase().includes(term.toLowerCase()));
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }



    async function handleDelete(id: number) {
        try {
            await deleteProduct(id);
            toast("Product deleted", {icon: '🗑️'})
        } catch (e: unknown) {
            console.log(e);
        }
    }

    function openModal(product?: IProduct) {
        if (product) {
            setEditProduct(product);
        } else {
            setEditProduct({
                name: "",
                price: 0,
                weightInGrams: 0
            });
        }
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }




    return (
        <>
            <Toaster position={"top-center"}/>
        <div className="flex flex-col items-center justify-center py-2">
            <h1 className="text-2xl font-bold mb-5">Products</h1>
            <div className="flex flex-col items-center justify-center py-2">
                <SearchBar searchTerm={search} setSearchTerm={setSearchTerm}/>
            </div>
            <table className="w-50 text-md bg-white shadow-md rounded mb-4 border-2">
                <thead>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Id</th>
                    <th className="text-left p-3 px-5">Name</th>
                    <th className="text-left p-3 px-5">Price</th>
                    <th className="text-left p-3 px-5">Weight (in grams)</th>
                    <th className="text-left p-3 px-5">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map(product => (
                    <tr key={product.id} className="border-b hover:bg-blue-100 bg-gray-100">
                        <td className="p-3 px-5">{product.id}</td>
                        <td className="p-3 px-5">{product.name}</td>
                        <td className="p-3 px-5">{product.price} kr</td>
                        <td className="p-3 px-5">{product.weightInGrams} g</td>
                        <td className="p-3 px-5">
                            <button onClick={() => openModal(product)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Edit
                            </button>
                            <button className="text-red-500 hover:text-red-700 underline"
                                    onClick={() => handleDelete(product.id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => openModal()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Product
            </button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}><ProductsForm closeModal={closeModal} add={add} editProduct={editProduct} update={update} /> </Modal>
        </div>
        </>
    );
}

export default Products;