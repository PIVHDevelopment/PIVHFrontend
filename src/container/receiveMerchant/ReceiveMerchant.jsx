import React from "react";
import Index from "../Index";

function ReceiveMerchant() {
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  return (
    <div className="app-container">
      <header className="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Index.back} alt={t("Back")} />
        </button>
        <div className="app-icon">
          <img src={Index.pocketPi} alt={t("PocketPi")} />
        </div>
        <div className="header-right"></div>
      </header>

      <div className="input-box">
        <div className="user-form-group">
            <input
              type="text"
              placeholder=""
              className="user-form-control"
            />
            <button className="paste-btn" style={{ color: "#ffffff" }}>
              {t("Mainnet")}
            </button>
            <div className="left-icon">
            <img src={Index.piLeft} alt="" />
          </div>
        </div>
      </div>

      <div className="qr-section">
        <div className="qr-code">
          <img src={Index.qrCode} alt={t("QRCode")} />
        </div>
      </div>

      <div className="action-buttons">
        <button className="circle-btn">
          <span className="icon">
            <img src={Index.copyBtn} alt={t("Copy")} />
          </span>
          <span>{t("Copy")}</span>
        </button>
        <button className="circle-btn">
          <span className="icon">
            <img src={Index.downloadImg} alt={t("Download")} />
          </span>
          <span>{t("Download")}</span>
        </button>
      </div>

      <button className="secondary-btn share-btn">
        <span className="icon">
          <img src={Index.share} alt={t("Share")} />
        </span>
        {t("Share")}
      </button>
    </div>
  );
}

export default ReceiveMerchant;
