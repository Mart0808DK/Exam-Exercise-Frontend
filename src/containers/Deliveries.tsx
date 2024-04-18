import {UseDeliveries} from "../hooks/UseDeliveries.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import Modal from "../components/Modal.tsx";
import {useState} from "react";
import DeliveriesForm from "../components/DeliveriesForm.tsx";

function Deliveries() {
    const { deliveries, isLoading, add } = UseDeliveries();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedVan, setSelectedVan] = useState<number | null>(null);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen w-screen"><LoadingSpinner size={80}/></div>;
    }

    const handleVanSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedVan(Number(e.target.value));
    }

    const filteredDeliveries = selectedVan ? deliveries.filter(delivery => delivery.van?.id === selectedVan) : deliveries;
    const vanIds = Array.from(new Set(deliveries.map(delivery => delivery.van?.id)));

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    return (
        <div className="flex flex-col items-center justify-center py-2">
            <h1 className="text-2xl font-bold mb-5">Deliveries</h1>
            <div>
                <label htmlFor="vanSelect" className="text-md">Select a van: </label>
                <select name="vanSelect" id="vanSelect" onChange={handleVanSelect}>
                    <option defaultChecked={true} value={""}>All</option>
                    {vanIds.sort((a, b) => a - b).map((vanId, index) => vanId && (
                        <option key={`${vanId}-${index}`} value={vanId}>
                            {vanId}
                        </option>
                    ))}
                </select>
            </div>
            <table className="w-50 text-md bg-white shadow-md rounded mb-4 border-2">
                <thead>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Id</th>
                    <th className="text-left p-3 px-5">DeliveryDate</th>
                    <th className="text-left p-3 px-5">Destination</th>
                    <th className="text-left p-3 px-5">FromWareHouse</th>
                    <th className="text-left p-3 px-5">ProductOrder</th>
                    <th className="text-left p-3 px-5">Van</th>
                    <th className="text-left p-3 px-5">Total Amount</th>
                </tr>
                </thead>
                <tbody>
                {filteredDeliveries.map(delivery => (
                    <tr key={delivery.id} className="border-b hover:bg-blue-100 bg-gray-100">
                        <td className="p-3 px-5">{delivery.id}</td>
                        <td className="p-3 px-5">{delivery.deliveryDate ? new Date(delivery.deliveryDate).toLocaleDateString() : 'No Date'}</td>
                        <td className="p-3 px-5">{delivery.destination}</td>
                        <td className="p-3 px-5">{delivery.fromWareHouse}</td>
                        <td className="p-3 px-5">
                            {delivery.productOrders.map(order => (
                                <div key={order.id}>
                                    <div key={order.product.id}>
                                        <div>Id: {order.product.id}</div>
                                        <div>Name: {order.product.name}</div>
                                        <div>Price: {order.product.price} kr</div>
                                        <div>Weight: {order.product.weightInGrams} g</div>
                                    </div>
                                    <div>Quantity: {order.quantity}</div>
                                    <div>Order Date: {order.orderDate.toString()}</div>
                                </div>
                            ))}
                        </td>
                        {delivery.van && (
                            <td className="p-3 px-5">
                                <div>Id: {delivery.van.id}</div>
                                <div>Brand: {delivery.van.brand}</div>
                                <div>Model: {delivery.van.model}</div>
                                <div>Capacity: {delivery.van.capacityInKg} kg</div>
                            </td>
                        )}
                        <td className="p-3 px-5">{delivery.totalAmount} kr</td>
                    </tr>
                ))}
                </tbody>
            </table>
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Delivery</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}><DeliveriesForm closeModal={closeModal} addDelivery={add}/></Modal>
        </div>
    );
}

export default Deliveries;