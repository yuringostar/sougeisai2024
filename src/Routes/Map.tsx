import { FC } from "react";
import { useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Link } from "react-router-dom";
import Sketch from "react-p5";
import p5Types from "p5";
import map from "../assets/images/tmp/map1.png";
import map2 from "../assets/images/tmp/map2.png";
import map3 from "../assets/images/tmp/map3.png";
import map4 from "../assets/images/tmp/mapCoordinate.png";
import icon from "../assets/images/tmp/icon.png";

import upImg from "../assets/images/tmp/up.png";
import downImg from "../assets/images/tmp/down.png";
import { Vector2 } from "../lib/Map/Types";
import Icon from "../lib/Map/Icon";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Map: FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialX = parseInt(queryParams.get('x') || '0', 10);
    const initialY = parseInt(queryParams.get('y') || '0', 10);
    const [mapP5s, _setResultsetMapP5s] = useState<p5Types.Image[]>([]);
    const [icons, _setIcons] = useState<Icon[][]>([]);
    const [imageSize, _setImageSize] = useState<Vector2>({x: 0, y: 0});
    const [_imageRatio, setImageRatio] = useState<number>(0.0);
    const [origin, setOrigin] = useState<Vector2>({x: initialX, y: initialY});
    const [dragOffset, _setDragOffset] = useState<Vector2>({x: 0, y: 0});
    const [dragRatio, setDragRatio] = useState<number>(1);
    const [zoom, setZoom] = useState<number>(1);
    //const [floor, setFloor] = useState<number>(0);
    const [updown, _setUpdown] = useState<p5Types.Image[]>([]);
    const [updownSize, setUpdownSize] = useState<Vector2>({x: 0, y: 0});
    const [updownPos, setUpdownPos] = useState<Vector2>({x: 0, y: 0});


    const initialFloor = parseInt(queryParams.get('floor') || '0', 10);
  
    const [floor, setFloor] = useState<number>(initialFloor);

  
    console.log(`x: ${initialX}, y: ${initialY}, floor: ${floor}`);

    /*useEffect(() => {
        setOrigin({ x: initialX, y: initialY });
        setFloor(initialFloor);
        console.log(initialX);
    }, []);*/

    useEffect(() => {
        const handleTouchMove = (event: TouchEvent) => {
            event.preventDefault(); // デフォルトのスクロール動作を防ぐ
        };

        // タッチスクロール時にデフォルトの動作を防ぐ
        document.addEventListener('touchmove', handleTouchMove, { passive: false });

        // クリーンアップ
        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const handleMouseEnter = () => {
        disableBodyScroll(document.body);
    }
    const handleMouseLeave = () => {
        enableBodyScroll(document.body);
    }
    const preload = (p5: p5Types) => {
        mapP5s.push(p5.loadImage(map));
        mapP5s.push(p5.loadImage(map2));
        mapP5s.push(p5.loadImage(map3));
        mapP5s.push(p5.loadImage(map4));

        updown.push(p5.loadImage(upImg));
        updown.push(p5.loadImage(downImg));

        /*for(let i = 0; i < mapP5s.length; i++){
            icons.push([]);
            for(let j = 0; j < 10; j++){
                icons[i].push(new Icon(p5.loadImage(icon), {x: 0, y: 0}));
            }
        }*/
    }

    const setup = (p5: p5Types, canvasParentRef: Element) =>{
  
        //console.log(initialX);
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
        setImageRatio(mapP5s[0].height / mapP5s[0].width);
        

        if(initialX||initialY){
            setOrigin({ x: initialX, y: initialY });
            setZoom(2);
        }else{
            setOrigin({x: p5.windowWidth/2, y: p5.windowHeight/2});
            //setZoom(0.5);
        }

        if(initialFloor){
            setFloor(initialFloor);
        }

        for(let i = 0; i < icons.length; i++){
            for(let j = 0; j < icons[i].length; j++){
                const icon = icons[i][j];
                icon.pos.x = p5.random(0, p5.width);
                icon.pos.y = p5.random(0, p5.height);
            }
        }
        setUpdownSize({x: 50, y: 50});
        setUpdownPos({x: 0, y: p5.windowHeight-100});
    }


    const zoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.2, 5)); // 最大5倍
    }

    const zoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.2, 0.5)); // 最小0.5倍
    }





    const draw = (p5: p5Types) => {
        p5.background(255);
        p5.frameRate(30);
        
        p5.push();
        p5.imageMode(p5.CENTER);
        p5.translate(origin.x, origin.y);
        p5.scale(zoom);
        p5.translate(-origin.x, -origin.y);
        p5.translate(dragOffset.x, dragOffset.y);
        p5.image(mapP5s[floor], origin.x, origin.y, imageSize.x, imageSize.y);
        
        

        for(let i = 0; i < icons.length; i++){
            for(let j = 0; j < icons[i].length; j++){
                if(i === floor){
                    const icon = icons[i][j];
                    const width = icon.icon.width / zoom;
                    const height = icon.icon.height / zoom;
                    p5.image(icon.icon, icon.pos.x, icon.pos.y, width, height);
                }   
            }
        }
        p5.pop();

        p5.push();
        p5.imageMode(p5.CORNER);
        p5.tint(255, 255, 255, 255);
        if(floor === mapP5s.length - 1){
            p5.tint(255, 255, 255, 120);
        }
        p5.image(updown[0], updownPos.x, updownPos.y, updownSize.x, updownSize.y);
        p5.tint(255, 255, 255, 255);
        if(floor === 0){
            p5.tint(255, 255, 255, 120);
        }
        p5.image(updown[1], updownPos.x, updownPos.y + updownSize.y, updownSize.x, updownSize.y);
        p5.pop();
    }

    const mouseWheel = (p5: p5Types) => {
        const zoomSpeed = 0.5;  // ズームスピードを速くするために値を増加
        let newZoom = zoom;
        //@ts-ignore
        if (p5._mouseWheelDeltaY < 0) {
            newZoom += zoomSpeed;  // ズームイン
        } else {
            newZoom -= zoomSpeed;  // ズームアウト
        }
        console.log(`New Zoom: ${newZoom}`); // デバッグ用ログ
        setZoom(newZoom);
        setDragRatio(1 / newZoom);  // ズームに応じてドラッグ感度を調整
    }

    const mouseDragged = (p5: p5Types) => {
        dragOffset.x += (p5.mouseX - p5.pmouseX)/4*dragRatio;
        dragOffset.y += (p5.mouseY - p5.pmouseY)/4*dragRatio;
    }

    const mouseClicked = (p5: p5Types) => {
        if(p5.mouseX > updownPos.x && p5.mouseX < updownPos.x + updownSize.x){
            if(p5.mouseY > updownPos.y && p5.mouseY < updownPos.y + updownSize.y){
                handleUp();
            }
            else if(p5.mouseY > updownPos.y + updownSize.y && p5.mouseY < updownPos.y + updownSize.y*2){
                handleDown();
            }
            
        }
    }

    const handleUp = () => {
        setFloor(floor + 1 < mapP5s.length ? floor + 1 : mapP5s.length - 1);
    }
    const handleDown = () => {
        setFloor(floor - 1 >= 0 ? floor - 1 : 0);
    }

    return (
        <div className="container">
            <div className="fixed bottom-5 right-7 z-50 w-10">
                {/* <button onClick={handleUp} className={"mb-8 bg-orange-500" + (isMaxFloor?" opacity-50":"")} type="button">
                    <img src={upImg} alt="" />
                </button>
                <button onClick={handleDown} className={"bg-orange-500" + (isMinFloor?" opacity-50":"")} type="button">
                    <img src={downImg} alt="" />
                </button> */}
               
                <button onClick={zoomIn} className="mb-2 bg-blue-500 p-2">Zoom In</button>
                <button onClick={zoomOut} className="bg-blue-500 p-2">Zoom Out</button>
            
            </div>
            <div className="fixed bottom-5 right-20 z-50">
                <Link to="/scan">
                    <div className="w-20 h-20 bg-orange-500">QR</div>
                </Link>
            </div>
            <div id="map"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Sketch
                
                    preload={preload}
                    setup={setup}
                    draw={draw}
                    mouseWheel={mouseWheel}
                    mouseDragged={mouseDragged}
                    mouseClicked={mouseClicked}
                />
            </div>
        </div>
    );
}

export default Map;
