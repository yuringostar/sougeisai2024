'use client'
import jsQR from 'jsqr'

import { useRef, useState, useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom';
import frame from '../assets/images/tmp/scanFrame.png'

type Props = {}
const QrCodeScanner: FC<Props> = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [result, _setResult] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 300 },
        height: { ideal: 300 },
      },
    }

    // デバイスのカメラにアクセスする
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // デバイスのカメラにアクセスすることに成功したら、video要素にストリームをセットする
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
          scanQrCode()
        }
      })
      .catch((err) => console.error('Error accessing media devices:', err))

    const currentVideoRef = videoRef.current

    // コンポーネントがアンマウントされたら、カメラのストリームを停止する
    return () => {
      if (currentVideoRef && currentVideoRef.srcObject) {
        const stream = currentVideoRef.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const scanQrCode = () => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (canvas && video) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // カメラの映像をcanvasに描画する
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        // QRコードをスキャンする
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height)
        if (qrCode) {
          const qrData = qrCode.data; // 例: "x:100,y:200,floor:1"
  
          // QRコードのデータが座標とフロア情報を含んでいると仮定 (例えば "x:100,y:200,floor:1")
          const coordinates = qrData.match(/x:(\d+),y:(\d+),floor:(\d+)/);
          if (coordinates) {
            const x = coordinates[1];
            const y = coordinates[2];
            const floor = coordinates[3];
            console.log(`x: ${x}, y: ${y}, floor: ${floor}`);
            // 座標とフロア情報をURLに渡して/mapへ遷移
            navigate(`/map?x=${x}&y=${y}&floor=${floor}`);
          } else {
            setError('QRコードに座標またはフロアデータが含まれていません');
          }
        } else {
          setTimeout(scanQrCode, 100); // 100ミリ秒ごとに再スキャン
        }
      }
    }
  }

  return (
    <div>
      {!result && (
        <div className='flex justify-center'>
          <div className='relative mt-20'>
            <img className='w-full h-auto' src={frame} alt="" />
            <video ref={videoRef} autoPlay playsInline className='absolute w-3/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-50 aspect-square' />
            <canvas ref={canvasRef} width='300' height='300' className='absolute w-3/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square' />
          </div>
        </div>
      )}
      {result}
      {error && <p className='text-center text-xs text-red-500'>{error}</p>}
    </div>
  )
}

export default QrCodeScanner