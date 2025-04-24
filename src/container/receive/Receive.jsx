import React, { useState } from "react";
import Index from "../Index";
import { QRCodeCanvas } from "qrcode.react";
function Receive() {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  let typeTxn = location?.state?.typeTxn;
  
    const [copied, setCopied] = useState(false);
  console.log({location});
  console.log({userData});


  const handleCopy = () => {
    navigator.clipboard.writeText(typeTxn == "business" ? userData?.businessUserName : userData?.userName);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

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

          <div className="wallet-id">
              <span id="walletAddress">
                {typeTxn == "business" ?  userData?.businessUserName : userData?.userName }
              </span>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? <span>✓</span> : <img src={Index.copy} alt="Copy" />}
              </button>
              </div>
          
      <div className="qr-section">
        <div className="qr-code">
          {/* <img src={Index.qrCode} alt="QR Code" /> */}
          <QRCodeCanvas value={typeTxn == "business" ? userData?.businessUserName : userData?.userName} size={200} />
        </div>
      </div>

      {/* <div className="action-buttons">
        <button className="circle-btn">
          <span className="icon">
            <img src={Index.copyBtn} alt="Copy" />
          </span>
          <span>Copy</span>
        </button>
        <button className="circle-btn" >
          <span className="icon">
            <img src={Index.downloadImg} alt="Download" />
          </span>
          <span>Download</span>
        </button>
      </div> */}

      <div className="receive-btn-share">
        <button className="secondary-btn share-btn">
          <span className="icon">
            <img src={Index.share} alt="Share" />
          </span>
          Share
        </button>
      </div>
    </div>
  );
}

export default Receive;
