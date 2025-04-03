import React from "react";
import { useNavigate } from "react-router-dom";

function TermsAndConditions() {
  const navigate = useNavigate();
  return (
    <div className="app-container settings-page">
      <header>
        <button className="back-btn" onClick={() => navigate("/privacy-policy")}>
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
