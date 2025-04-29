// import React, { useEffect, useRef } from 'react';
// import { Html5Qrcode } from 'html5-qrcode';

// const QrScanner = ({ scannerResult,setScannerResult,setOpen }) => {
//   const qrRef = useRef(null);
//   const scannerRef = useRef(null);

//   useEffect(() => {
//     const config = { fps: 10, qrbox: { width: 250, height: 250 } };

//     const startScanner = async () => {
//       scannerRef.current = new Html5Qrcode("qr-reader");
//       try {
//         await scannerRef.current.start(
//           { facingMode: "environment" },
//           config,
//           (decodedText, decodedResult) => {
//             setScannerResult(decodedText);
//             setOpen(false)
//             stopScanner(); // Stop scanning after success
//           },
//           (errorMessage) => {
//             // Avoid logging NotFoundException spam
//             if (!errorMessage.includes("NotFoundException")) {
//               console.warn("QR Scan Error:", errorMessage);
//             }
//           }
//         );
//       } catch (err) {
//         console.error("Failed to start QR scanner:", err);
//       }
//     };

//     startScanner();

//     return () => {
//       stopScanner();
//     };
//   }, []);

//   const stopScanner = async () => {
//     if (scannerRef.current) {
//       try {
//         await scannerRef.current.stop();
//         await scannerRef.current.clear();
//         setOpen(false)
//         scannerRef.current = null;
//       } catch (err) {
//         console.error("Failed to stop or clear QR scanner:", err);
//       }
//     }
//   };

//   return <div id="qr-reader" style={{ width: "340px",padding:"20px", borderRadius:"12px" }} ref={qrRef} />;
// };

// export default QrScanner;

// import QrScanner from './QrScanner';
 
// const App = () => {
//   const [result, setResult] = useState('');
 
//   const handleScanSuccess = (text) => {
//     console.log('Scanned:', text);
//     setResult(text);
//   };
 
//   return (
//     <div style={{ padding: 20 }}>
//       <h2>📷 QR Code Scanner</h2>
//       <QrScanner onScanSuccess={handleScanSuccess} />
//       {result && (
//         <div style={{ marginTop: 20 }}>
//           <strong>Scanned Result:</strong>
//           <p>{result}</p>
//         </div>
//       )}
//     </div>
//   );
// };
 
// QrScanner.jsx



import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom'; 
import Index from '../Index';

const QrScanner = () => {
    const location = Index.useLocation();
   const typeTxn =  location?.state?.typeTxn;
    const [scannerResult, setScannerResult] = useState("");
    const navigate = useNavigate(); 
    console.log({navigate});
    

    useEffect(() => {
        if (scannerResult !== "") {
            navigate("/send", { state: { scannerResult,typeTxn } }); 
            setScannerResult("");  
        }
    }, [scannerResult]); 


    useEffect(() => {
        const scanner = new Html5QrcodeScanner('qr-reader', {
            fps: 10,
            qrbox: { width: 250, height: 250 },
        });

        const startScanner = () => {
            scanner.render(
                (decodedText, decodedResult) => {
                    setScannerResult(decodedText);
                },
                (errorMessage) => {
                    console.warn('QR Scan Error:', errorMessage);
                }
            );
        };

        startScanner();

        return () => {
            setScannerResult("")
            scanner.clear().catch((error) => {
                console.error('Failed to clear scanner:', error);
            });
        };
    }, [scannerResult]); 

    return (
        <>
         <div className="app-container">
                    <header className="receive-center">
                            <button className="back-btn" >
                              <img src={Index.back} alt="Back" onClick={() => navigate(-1)}/>
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
    </>
)
};

export default QrScanner;
 
 