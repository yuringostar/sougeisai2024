import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// コンポーネントのインポート
import { Layout } from './components/Layout';
import { MapPage } from './components/MapPage';
import { QrCodeScanner} from './components/QrCodeScanner';

const container = document.getElementById('app');
const root = createRoot(container!); 

root.render(
    <React.StrictMode>

    <BrowserRouter>
        
        <Routes>
            
            <Route path="/" element={<Layout />}>
                <Route path="/map" element={<QrCodeScanner />} />
            </Route>
        </Routes>
        </BrowserRouter>
    </React.StrictMode>

);
