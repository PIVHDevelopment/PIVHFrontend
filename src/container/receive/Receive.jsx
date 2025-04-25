import React, { useRef, useState } from "react";
import Index from "../Index";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
function Receive() {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  let typeTxn = location?.state?.typeTxn;
  const shareRef = useRef();
  
    const [copied, setCopied] = useState(false);
  console.log({location});
  console.log({userData});


  const handleCopy = () => {
    navigator.clipboard.writeText(typeTxn == "business" ? userData?.businessUserName : userData?.userName);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };


    const handleShare = async () => {
    const element = shareRef.current;
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await (await fetch(dataUrl)).blob();

    if (navigator.canShare && navigator.canShare({ files: [new File([blob], "qrcode.png", { type: blob.type })] })) {
      const file = new File([blob], "qrcode.png", { type: blob.type });
      navigator.share({
        files: [file],
        title: "My Wallet QR",
        text: "Scan my wallet QR to receive payment",
      });
    } else {
      // fallback: download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qrcode.png";
      link.click();
    }
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

      <div ref={shareRef} style={{ position: "absolute", top: "-10000px", left: "-10000px" }}>
  <div style={{
    padding: "20px",
    background: "#fff",
    textAlign: "center",
    borderRadius: "12px",
    width: "340px",
    height:"440px",
  }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",marginTop:"5px" }}>
      <img src={Index.pocketPi} alt="PocketPi" style={{ width: "60px",marginBottom:"35px" }} />
      <QRCodeCanvas value={typeTxn == "business" ? userData?.businessUserName : userData?.userName} size={200} />
      <p style={{ color: "#000", fontSize: "14px", margin: 0 }}>
        Username: {typeTxn == "business" ? userData?.businessUserName : userData?.userName}
      </p>
    </div>
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
        <button className="secondary-btn share-btn" onClick={handleShare}>
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