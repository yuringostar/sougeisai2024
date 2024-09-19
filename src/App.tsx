import { FC } from 'react';
import { useState } from 'react';

import About from './Routes/About';
import Scan from './Routes/Scan';
import Map from './Routes/Map';

import Layout from './components/common/Layout';
import NavLink from './components/common/NavLink';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <Layout>
            <BrowserRouter>
                <header className='fixed top-0 z-50 w-full flex items-center justify-between'>
                    <h1 className='py-[20px] flex align-center justify-center'>桑芸祭 2024 「編む」</h1>
                    {!isMenuOpen ? 
                    <div onClick={handleMenu} className="ham cursor-pointer relative z-50 mr-5 w-[35px] h-[20px]">
                        <div className="ham-line absolute top-0 w-full h-1 bg-black transition"></div>
                        <div className="ham-line absolute top-1/2 w-full h-1 bg-black transition"></div>
                        <div className="ham-line absolute top-full w-full h-1 bg-black transition"></div>
                    </div>
                    :
                    <div onClick={handleMenu} className="ham cursor-pointer relative z-50 mr-5 w-[35px] h-[20px]">
                        <div className="ham-line absolute top-1/2 w-full h-1 bg-black transform rotate-45 transition"></div>
                        <div className="ham-line absolute top-1/2 w-full h-1 bg-black opacity-0 transition"></div>
                        <div className="ham-line absolute top-1/2 w-full h-1 bg-black transform -rotate-45 transition"></div>
                    </div>
                    }
                    <div className={"fixed right-0 top-0 py-40 px-10 w-1/2 h-full bg-white z-40 transition " + (isMenuOpen ? "translate-x-0" : "translate-x-full")}>
                        <ul>
                            <NavLink onclick={handleMenu} href="/about" text="ABOUT" />
                            <NavLink onclick={handleMenu} href="/scan" text="SCAN" />
                            <NavLink onclick={handleMenu} href="/map" text="MAP" />
                        </ul>
                    </div>
                </header>
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/scan" element={<Scan />} />
                    <Route path="/map" element={<Map />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    )
}

export default App