import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QrScanner = ({ scannerResult,setScannerResult,setOpen }) => {
  const qrRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    const startScanner = async () => {
      scannerRef.current = new Html5Qrcode("qr-reader");
      try {
        await scannerRef.current.start(
          { facingMode: "environment" },
          config,
          (decodedText, decodedResult) => {
            setScannerResult(decodedText);
            setOpen(false)
            stopScanner(); // Stop scanning after success
          },
          (errorMessage) => {
            // Avoid logging NotFoundException spam
            if (!errorMessage.includes("NotFoundException")) {
              console.warn("QR Scan Error:", errorMessage);
            }
          }
        );
      } catch (err) {
        console.error("Failed to start QR scanner:", err);
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
        setOpen(false)
        scannerRef.current = null;
      } catch (err) {
        console.error("Failed to stop or clear QR scanner:", err);
      }
    }
  };

  return <div id="qr-reader" style={{ width: "340px",padding:"20px", borderRadius:"12px" }} ref={qrRef} />;
};

export default QrScanner;
