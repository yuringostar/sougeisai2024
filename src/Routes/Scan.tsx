import { FC } from "react";

import QrCodeScanner from "../components/QrCodeScanner";

const Scan : FC = () => {
    return (
        <div>
            <h1>Scan</h1>
            <QrCodeScanner />
        </div>
    );
};

export default Scan;