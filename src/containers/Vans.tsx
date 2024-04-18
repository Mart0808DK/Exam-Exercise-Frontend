import {UseVans} from "../hooks/UseVans.ts";

export function Vans () {
    const {vans, isLoading} = UseVans();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="flex flex-col items-center justify-center py-2">
            <h1 className="text-2xl font-bold mb-5">Vans</h1>
            <table className="w-50 text-md bg-white shadow-md rounded mb-4 border-2">
                <thead>
                <tr className="border-b">
                    <th className="text-left p-3 px-5">Id</th>
                    <th className="text-left p-3 px-5">Brand</th>
                    <th className="text-left p-3 px-5">Model</th>
                    <th className="text-left p-3 px-5">CapacityInKg</th>
                </tr>
                </thead>
                <tbody>
                {vans.map(van => (
                    <tr key={van.id} className="border-b hover:bg-blue-100 bg-gray-100">
                        <td className="p-3 px-5">{van.id}</td>
                        <td className="p-3 px-5">{van.brand}</td>
                        <td className="p-3 px-5">{van.model}</td>
                        <td className="p-3 px-5">{van.capacityInKg} kg</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}