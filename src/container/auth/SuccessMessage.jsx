import React from "react";
import Index from "../Index";
import { useLocation } from "react-router-dom";

const SuccessMessage = () => {
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();
  const location = useLocation();
  const isBusiness = location?.state?.isBusiness;

  return (
    <div className="app-container">
      <div className="success-message-page">
        <div className="success-message-center">
          <img src={Index.successIcon} alt="Success" className="success-icon" />
          <p className="success-para">
            {t(
              "Your account is setup successfully, you can now perform transactions securely"
            )}
          </p>
          <div className="common-btn-space-main">
            <button
              onClick={() =>
                navigate("/home", {
                  state: { isBusiness: isBusiness },
                })
              }
              className="common-btn"
            >
              {t("Go to home page")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
