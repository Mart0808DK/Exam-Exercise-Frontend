import {BrowserRouter, Route, Routes} from "react-router-dom";
import Products from "../containers/Products.tsx";
import Deliveries from "../containers/Deliveries.tsx";
import Navbar from "./NavBar";
import {Vans} from "../containers/Vans.tsx";


function PageRouter() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={"*"} element={<Products/>} />
                <Route path={"/products"} element={<Products/>} />
                <Route path={"/deliveries"} element={<Deliveries/>} />
                <Route path={"/vans"} element={<Vans/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;