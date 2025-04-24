import React from "react";
import Index from "../Index";

function Receive() {
  const navigate = Index.useNavigate();
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

      <div className="send-form">
        <div className="input-group pr-receive-input">
          <div className="input-wrapper send-input-box">
            <input type="text" placeholder="Enter Wallet Address" />
            <button className="paste-btn" style={{ color: "#E38CFF" }}>
              Confirm
            </button>
          </div>
        </div>
      </div>

      <div className="qr-section">
        <div className="qr-code">
          <img src={Index.qrCode} alt="QR Code" />
        </div>
      </div>

      <div className="action-buttons">
        <button className="circle-btn">
          <span className="icon">
            <img src={Index.copyBtn} alt="Copy" />
          </span>
          <span>Copy</span>
        </button>
        <button className="circle-btn">
          <span className="icon">
            <img src={Index.downloadImg} alt="Download" />
          </span>
          <span>Download</span>
        </button>
      </div>

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
