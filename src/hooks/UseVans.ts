import {useEffect, useState} from "react";
import {handleHttpErrors} from "../utils/fetch.ts";
import type {IVan} from "../types/van.types.ts";

export function UseVans () {
    const [vans, setVans] = useState<IVan[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const url = import.meta.env.VITE_API_URL + '/vans'

    async function getVans () {
        try {
        const response = await fetch(url).then(handleHttpErrors)

        if (response.status === 200) {
            return
        }

        setVans(response)
        } catch (e: unknown) {
        console.log(e)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        getVans().then(() => setIsLoading(false))
    }, [])



    return { vans, isLoading }
}