import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import Index from '../Index';

const QrScanner = () => {
  const location = Index.useLocation();
  const typeTxn = location?.state?.typeTxn;
  const [scannerResult, setScannerResult] = useState("");
  const navigate = useNavigate();

  // Navigate once scanner result is available
  useEffect(() => {
    if (scannerResult !== "") {
      navigate("/send", { state: { scannerResult, typeTxn } });
      setScannerResult("");
    }
  }, [scannerResult, navigate, typeTxn]);

  // Initialize QR scanner
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText, decodedResult) => {
        setScannerResult(decodedText);
        scanner.clear().catch((err) => {
          console.error('Failed to stop scanner after scan:', err);
        });
      },
      (errorMessage) => {
        // scanner.clear()
        console.warn('QR Scan Error:', errorMessage);
      }
    );

    return () => {
      scanner.clear().catch((error) => {
        console.error('Failed to clear scanner on unmount:', error);
      });
    };
  }, []);

  return (
    <div className="app-container">
      <header className="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Index.back} alt="Back" />
        </button>
        <div className="app-icon" style={{ marginLeft: "-26px" }}>
          <img src={Index.pocketPi} alt="PocketPi" />
        </div>
        <div className="header-right"></div>
      </header>

      <div className='qr-scanner-main-div'>
        <div id="qr-reader" style={{ width: '300px' }} />
      </div>
    </div>
  );
};

export default QrScanner;
