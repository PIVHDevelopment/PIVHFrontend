import React from "react";
import Index from "../../Index";

function Business({ balance }) {
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
            <img src={Index.send} alt="Send Money" />
          </span>
          Send
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
            <img src={Index.downarrow} alt="Send Money" />
          </span>
          Receive
        </button>
      </div>
      <div className="action-buttons action-send-main-contain">
        <button
          className="action-btn send-btn receive-btn"
          id="sendBtn"
          disabled={balance <= 0}
          onClick={() =>
            navigate("/withdraw", {
              state: { typeTxn: "business" },
            })
          }
        >
          <span className="btn-icon">
            <img src={Index.withdraw} alt="Receive Money" />
          </span>
          Withdraw
        </button>

        <button
          className="action-btn send-btn receive-btn"
          id="paymentrequest"
          style={{maxWidth: "184px"}}
          onClick={() =>
            navigate("/payment-request", {
              state: { isBusiness: true },
            })
          }
        >
          <span className="btn-icon pay-request-icon">
            <img src={Index.withdraw} alt="Receive Money" />
          </span>
          Payment Request
        </button>

      </div>
    </>
  );
}

export default Business;
