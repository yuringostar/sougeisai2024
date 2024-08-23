import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsQR from 'jsqr';

export const QRCodePage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.setAttribute('playsinline', 'true');
                    videoRef.current.play();
                    requestAnimationFrame(scan);
                }
            } catch (error) {
                console.error('Camera access error:', error);
            }
        };

        const scan = () => {
            if (videoRef.current && canvasRef.current) {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                
                if (context) {
                    canvas.height = video.videoHeight;
                    canvas.width = video.videoWidth;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, canvas.width, canvas.height, {
                        inversionAttempts: 'dontInvert',
                    });

                    if (code) {
                        const [x, y] = code.data.split(',').map(Number);
                        if (!isNaN(x) && !isNaN(y)) {
                            navigate(`/map?x=${x}&y=${y}`);
                        }
                    } else {
                        requestAnimationFrame(scan);
                    }
                }
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [navigate]);

    return (
        <div>
            <h1>QRコードスキャン</h1>
            <video ref={videoRef} style={{ width: '100%' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};
