import type {IDeliveries} from "../types/deliveries.types.ts";
import {useEffect, useState} from "react";
import {handleHttpErrors, makeOptions} from "../utils/fetch.ts";

export function UseDeliveries() {
    const [deliveries, setDeliveries] = useState<IDeliveries[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const url = import.meta.env.VITE_API_URL + "/deliveries";

    async function getDeliveries() {
        try {
            const response = await fetch(url).then(handleHttpErrors);
            if (response.status === 200) {
                return;
            }
            setDeliveries(response);
        } catch (e: unknown) {
            console.log(e);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getDeliveries().then(() => setIsLoading(false));
    }, []);

    async function add(delivery: {
        van: { id: number };
        fromWareHouse: string;
        destination: string;
        deliveryDate: string;
        productOrders: { id: number }[]
    }) {
        const options = makeOptions("POST", delivery);
        try {
            const newDelivery = await fetch(url, options).then(
                handleHttpErrors
            );
            setDeliveries(prevDeliveries => [...prevDeliveries, newDelivery]);
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    }

    return ({deliveries, isLoading, add, error});

}