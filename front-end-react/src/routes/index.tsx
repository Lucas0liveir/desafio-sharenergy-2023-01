import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Cats } from "../pages/Cats";
import { Customers } from "../pages/Customers";
import { Dogs } from "../pages/Dogs";
import { Home } from "../pages/Home";
import { LoginAndRegister } from "../pages/LoginAndRegister";
import { AuthenticatedRoutes } from "./authenticatedRoutes";

const PageRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginAndRegister />} />
                <Route element={<AuthenticatedRoutes />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/cats" element={<Cats />} />
                    <Route path="/dogs" element={<Dogs />} />
                    <Route path="/customers" element={<Customers />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;