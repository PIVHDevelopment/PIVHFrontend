import React from "react";
import Index from "../../Index";

function Individual({ balance }) {
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  return (
    <>
      <div className="action-buttons">
        <button
          className="action-btn send-btn"
          id="sendBtn"
          onClick={() =>
            navigate("/receive", {
              state: { balance: balance, typeTxn: "individual" },
            })
          }
        >
          <span className="btn-icon">
            <img src={Index.downarrow} alt="Send Money" />
          </span>
          {t("Receive")}
        </button>
        <button
          className="action-btn send-btn"
          id="sendBtn"
          disabled={balance <= 0}
          onClick={() =>
            navigate("/send", {
              state: { balance: balance, typeTxn: "individual" },
            })
          }
        >
          <span className="btn-icon">
            <img src={Index.send} alt="Send Money" />
          </span>
          {t("Send")}
        </button>
      </div>

      <div className="outline-tabs-main">
        <button
          className="outline-tabs"
          id="sendBtn"
          onClick={() =>
            navigate("/deposit", {
              state: { balance: balance, typeTxn: "individual" },
            })
          }
        >
            <img src={Index.deposit} alt="Send Money" className="outline-tabs-icon" />
          {t("Deposit")}
        </button>
        <button
          className="outline-tabs"
          id="withdraw"
          disabled={balance <= 0}
          onClick={() =>
            navigate("/withdraw", { state: { typeTxn: "individual" } })
          }
        >
            <img src={Index.withdraw} alt={`${t("Withdraw")} ${t("Money")}`} className="outline-tabs-icon"/>
          {t("Withdraw")}
        </button>

        {/* <div className="action-button-listing">
          <div className="btn-home-content">
            <button
              className="action-btn send-btn"
              id="sendBtn"
              disabled={balance <= 0}
              onClick={() =>
                navigate("/send", {
                  state: { balance: balance, typeTxn: "individual" },
                })
              }
            >
              <span className="btn-icon">
                <img src={Index.send} alt="Send Money" />
              </span>
            </button>
            <p className="btn-home-content">Send</p>
          </div>
        </div>
        <div className="action-button-listing">
          <div className="btn-home-content">
            <button
              className="action-btn send-btn"
              id="sendBtn"
              onClick={() =>
                navigate("/receive", {
                  state: { balance: balance, typeTxn: "individual" },
                })
              }
            >
              <span className="btn-icon">
                <img src={Index.downarrow} alt="Send Money" />
              </span>
            </button>
            <p className="btn-home-content">Receive</p>
          </div>
        </div>
        <div className="action-button-listing">
          <div className="btn-home-content">
            <button
              className="action-btn send-btn"
              id="sendBtn"
              onClick={() =>
                navigate("/deposit", {
                  state: { balance: balance, typeTxn: "individual" },
                })
              }
            >
              <span className="btn-icon">
                <img src={Index.deposit} alt="Send Money" />
              </span>
            </button>
            <p className="btn-home-content">Deposit</p>
          </div>
        </div>
        <div className="action-button-listing">
          <div className="btn-home-content">
            <button
              className="action-btn send-btn"
              id="sendBtn"
              disabled={balance <= 0}
              onClick={() =>
                navigate("/withdraw", { state: { typeTxn: "individual" } })
              }
            >
              <span className="btn-icon">
                <img src={Index.withdraw} alt="Send Money" />
              </span>
            </button>
            <p className="btn-home-content">Withdraw</p>

          </div>
        </div> */}
      </div>
    </>
  );
}

export default Individual;
