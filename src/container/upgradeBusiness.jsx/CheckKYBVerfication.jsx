import React from "react";
import Index from "../Index";

function CheckKYBVerfication() {
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();
  return (
    <div className="app-container">
      <header className="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Index.back} alt="Back" />
        </button>
        <div className="app-icon" style={{ marginLeft: "-26px" }}>
          <img src={Index.pocketPi} alt={t("PocketPi")} />
        </div>
        <div className="header-right"></div>
      </header>
      <div className="send-form">
        <button disabled={true} className="action-btn full-width send-pi-btn">
          {t("KYB Verification")}
        </button>
        <button
          onClick={() => navigate("/upgrade-business")}
          className="action-btn full-width send-pi-btn"
        >
          {t("Skip for now")}
        </button>
      </div>
    </div>
  );
}

export default CheckKYBVerfication;
