import React from "react";
import copyBtn from "../../assets/images/Copy-Btn.png";
import qrCode from "../../assets/images/QR-Code-Receive.png";
import downloadImg from "../../assets/images/Download-Btn.png";
import share from "../../assets/images/Share.png";
import pocketPi from "../../assets/images/pocketPi.png";
import back from "../../assets/images/Back.png";
import { useNavigate } from "react-router-dom";

function Receive() {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <header className="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={back} alt="Back" />
        </button>
        <div className="app-icon" style={{ marginLeft: "-26px" }}>
          <img src={pocketPi} alt="PocketPi" />
        </div>
        <div className="header-right"></div>
      </header>

      <div className="send-form">
        <div className="input-group">
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
          <img src={qrCode} alt="QR Code" />
        </div>
      </div>

      <div className="action-buttons">
        <button className="circle-btn">
          <span className="icon">
            <img src={copyBtn} alt="Copy" />
          </span>
          <span>Copy</span>
        </button>
        <button className="circle-btn">
          <span className="icon">
            <img src={downloadImg} alt="Download" />
          </span>
          <span>Download</span>
        </button>
      </div>

      <button className="secondary-btn share-btn">
        <span className="icon">
          <img src={share} alt="Share" />
        </span>
        Share
      </button>
    </div>
  );
}

export default Receive;
