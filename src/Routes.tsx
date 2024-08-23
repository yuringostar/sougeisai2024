// src/Routes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./Home"
import Form from "./components/Form"
import View from "./components/View"
import { MapPage } from "./components/MapPage";
import QrCodeScanner from "./components/QrCodeScanner";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/view" element={<View />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/qr" element={<QrCodeScanner />} />
        </Routes>
    )
}
