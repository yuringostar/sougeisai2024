import React, { useRef, useState, useEffect } from 'react';
import '../MapPage.css';
import mapImage from '../assets/images/map_test.png';
import { Stage, Layer, Rect, Image, Group } from 'react-konva';

export const MapPage: React.FC = () => {
    /*const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [searchParams] = useSearchParams();*/
    let img = new window.Image();
    img.src = mapImage;
  

    /*useEffect(() => {
        const x = parseFloat(searchParams.get('x') || '0');
        const y = parseFloat(searchParams.get('y') || '0');
        if (!isNaN(x) && !isNaN(y)) {
            setPosition({ x, y });
        }
    }, [searchParams]);*/

    return (
        <>
            
            <div>
                <Stage width={1200} height={1200} >
                    <Layer>
                        <Group>                      
                            <Image image={img} width={img.width} height={img.height} x={300} /> 
                        </Group>
                    </Layer>                
                </Stage>
            </div>
            
        
        
        </>

    );
};
