import React from "react";
import Index from "../Index";
import { useLocation } from "react-router-dom";

const SuccessMessage = () => {
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();
  const location = useLocation();
  const isBusiness = location?.state?.isBusiness;

  return (
    <div className="app-container signin-main">
      <div className="p-26">
        <div className="pin-success-message-div">
          <div className="logo-box">
            <img src={Index.successIcon} alt="Success" />
          </div>
          <div className="success-message">
            <p>
              {t(
                "Your account is setup successfully, you can now perform transactions securely"
              )}
            </p>
          </div>
          <div className="button-box">
            <button
              onClick={() =>
                navigate("/home", {
                  state: { isBusiness: isBusiness },
                })
              }
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
