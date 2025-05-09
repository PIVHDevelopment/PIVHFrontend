import React from "react";
import Index from "../Index";

function CheckKYBVerfication() {
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
        <button disabled={true} className="common-btn">
          KYB Verification
        </button>
        <button
          onClick={() => navigate("/upgrade-business")}
          className="common-btn"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

export default CheckKYBVerfication;
