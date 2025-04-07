import React from "react";
import Index from "../Index";

function TermsAndConditions() {
  const navigate = Index.useNavigate();
  return (
    <div className="app-container settings-page">
      <header>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Terms and Conditions</h1>
        <div className="header-right"></div>
      </header>

      <div className="settings-content"></div>
    </div>
  );
}

export default TermsAndConditions;
