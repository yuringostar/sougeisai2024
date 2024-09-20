import { FC } from "react";

import QrCodeScanner from "../components/QrCodeScanner";

const Scan : FC = () => {
    return (
        <div>        
            <QrCodeScanner />
        </div>
    );
};

export default Scan;