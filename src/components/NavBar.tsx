import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="p-6 text-2xl bg-gray-800 text-white">
            <ul className="flex justify-around">
                <li className="px-3 py-2 rounded hover:bg-gray-700">
                    <Link to="/products" className="text-white hover:text-blue-300">Products</Link>
                </li>
                <li className="px-3 py-2 rounded hover:bg-gray-700">
                    <Link to="/deliveries" className="text-white hover:text-blue-300">Deliveries</Link>
                </li>
                <li className="px-3 py-2 rounded hover:bg-gray-700">
                    <Link to="/vans" className="text-white hover:text-blue-300">Vans</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;