import { motion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../MapPage.css';
import mapImage from '../assets/images/__back.png';

export const MapPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const x = parseFloat(searchParams.get('x') || '0');
        const y = parseFloat(searchParams.get('y') || '0');
        if (!isNaN(x) && !isNaN(y)) {
            setPosition({ x, y });
        }
    }, [searchParams]);

    return (
        <div>
            <motion.div ref={containerRef} className="container">
                <motion.div 
                    className="paper" 
                    drag 
                    dragPropagation 
                    dragConstraints={containerRef}
                    animate={position}
                >

                    <div>
                        <img src={mapImage} alt="map" className='map' />
                    </div>
                    {/*<div className="panel panel1" id='panel1'>
                        <div className="text">Panel 1</div>
                    </div>
                    <div className="panel panel2" id='panel2'>
                        <div className="text">Panel 2</div>
                    </div>
                    <div className="panel panel3">
                        <div className="text">Panel 3</div>
                    </div>
                    <div className="panel panel4">
                        <div className="text">Panel 4</div>
                    </div>*/}
                </motion.div>
            </motion.div>
        </div>
    );
};
