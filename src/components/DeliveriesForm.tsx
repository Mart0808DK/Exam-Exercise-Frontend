import React, {useState} from "react";
import {UseVans} from "../hooks/UseVans.ts";
import {UseProductOrders} from "../hooks/UseProductOrders.ts";
import {toast, Toaster} from "react-hot-toast";

interface IDeliveriesFormProps {
    closeModal: () => void;
    addDelivery: (delivery: {
        deliveryDate: string;
        fromWareHouse: string;
        destination: string;
        van: { id: number };
        productOrders: { id: number }[]
    }) => void;
}

function DeliveriesForm({closeModal, addDelivery}: IDeliveriesFormProps){
    const {vans} = UseVans();
    const {productOrders} = UseProductOrders();
    const [deliveryDate, setDeliveryDate] = useState('');
    const [fromWareHouse, setFromWareHouse] = useState('');
    const [destination, setDestination] = useState('');
    const [vanId, setVanId] = useState("");
    const [selectedProductOrders, setSelectedProductOrders] = useState<string[]>([]);

    const handleCreate = async (delivery: {
        deliveryDate: string;
        fromWareHouse: string;
        destination: string;
        van: { id: number };
        productOrders: { id: number }[]
    }) => {
        try {
            addDelivery(delivery);
            closeModal();
        } catch (error) {
            toast.error('An error occurred!');
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newDelivery = {
            deliveryDate,
            fromWareHouse,
            destination,
            van: {id: Number(vanId)},
            productOrders: selectedProductOrders.map(id => ({id: Number(id)}))
        };
       await handleCreate(newDelivery);
       window.scroll(0, 0);
       toast("Delivery added", {icon: '🚀'})

    };

    return (
        <>
            <Toaster position={"top-center"} toastOptions={{
                duration: 3000,
                style: {
                    fontSize: '1.5rem'
                }
            }}/>
            <div className="flex p-6 ">
                <form onSubmit={handleSubmit} className="w-full">
                    <h2 className="text-xl font-bold mb-4">Add Delivery</h2>
                    <div className="mb-4">
                        <label htmlFor="deliveryDate" className="block text-gray-700 text-sm font-bold mb-2">Delivery
                            Date</label>
                        <input id="deliveryDate" type="date" value={deliveryDate}
                               onChange={e => setDeliveryDate(e.target.value)}
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fromWareHouse" className="block text-gray-700 text-sm font-bold mb-2">From
                            Warehouse</label>
                        <input id="fromWareHouse" type="text" value={fromWareHouse}
                               onChange={e => setFromWareHouse(e.target.value)}
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="destination"
                               className="block text-gray-700 text-sm font-bold mb-2">Destination</label>
                        <input id="destination" type="text" value={destination}
                               onChange={e => setDestination(e.target.value)}
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="vanId" className="block text-gray-700 text-sm font-bold mb-2">Van ID</label>
                        <select id="vanId" value={vanId} onChange={e => setVanId(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            {vans.map(van => <option key={van.id} value={van.id}>{van.id}</option>)}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productOrders" className="block text-gray-700 text-sm font-bold mb-2">Product
                            Orders</label>
                        <select id="productOrders" multiple value={selectedProductOrders}
                                onChange={e => setSelectedProductOrders(Array.from(e.target.selectedOptions, option => option.value))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            {productOrders.map(order => <option key={order.id} value={order.id}>{order.id}</option>)}
                        </select>
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

export default DeliveriesForm;