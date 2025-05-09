import React from "react";
import Index from "../../Index";

function Business({ balance }) {
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  return (
    <>
      <div className="action-buttons">
        <button
          className="action-btn send-btn"
          id="sendBtn"
          disabled={balance <= 0}
          onClick={() =>
            navigate("/send", {
              state: { balance: balance, typeTxn: "business" },
            })
          }
        >
          <span className="btn-icon">
            <img src={Index.send} alt={`${t("Send")} ${t("Money")}`} />
          </span>
          {t("Send")}
        </button>

        <button
          className="action-btn send-btn"
          id="sendBtn"
          onClick={() =>
            navigate("/receive", {
              state: { balance: balance, typeTxn: "business" },
            })
          }
        >
          <span className="btn-icon">
            <img src={Index.downarrow} alt={`${t("Receive")} ${t("Money")}`} />
          </span>
          {t("Receive")}
        </button>
      </div>
      <div className="outline-tabs-main">
        <button
          className="outline-tabs"
          id="sendBtn"
          disabled={balance <= 0}
          onClick={() =>
            navigate("/withdraw", {
              state: { typeTxn: "business" },
            })
          }
        >
          <img src={Index.withdraw} alt={`${t("Withdraw")} ${t("Money")}`} className="outline-tabs-icon" />
          {t("Withdraw")}
        </button>

        <button
          className=" outline-tabs"
          id="paymentrequest"
          style={{ maxWidth: "184px" }}
          onClick={() =>
            navigate("/payment-request", {
              state: { isBusiness: true },
            })
          }
        >
          <img src={Index.withdraw} alt={t("PaymentRequest")} className="outline-tabs-icon" />
          {t("PaymentRequest")}
        </button>
      </div>
    </>
  );
}

export default Business;
