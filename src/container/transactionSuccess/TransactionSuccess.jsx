import React from "react";
import Index from "../Index";

export default function TransactionSuccess() {
  const { t } = Index.useTranslation();
  const location = Index.useLocation();
  const navigate = Index.useNavigate();
  return (
    <>
      <div className="app-container">
        <div className="success-main">
          <img src={Index.piCoiImg} class="character coin" />
          <img src={Index.piWallettImg} class="character wallet" />

          <div className="success-icon">
            <img
              src={Index.successfullIcon}
              alt="Success"
              className="success-icon"
            />
          </div>
          <div className="success-message-box">
            <p className="success-message">
              {t("YourTransactionWasSuccessful")}
            </p>
            <button
              className="action-btn  success-btn"
              onClick={() => navigate("/home", { state: location?.state })}
            >
              {t("GoToHome")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
