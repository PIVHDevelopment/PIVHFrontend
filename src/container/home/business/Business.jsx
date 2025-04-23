import React from "react";
import Index from "../../Index";

function Business({balance}) {
  const navigate = Index.useNavigate();
  return (
    <>
     <div className="action-buttons">
        <button
          className="action-btn send-btn"
          id="sendBtn"
          onClick={() =>
            navigate("/deposit", {
              state: { balance: balance,typeTxn : "business" },
            })
          }
        >
          <span className="btn-icon">
            <img src={Index.receiveMoney} alt="Send Money" />
          </span>
          Deposit
        </button>
        <button
          className="action-btn send-btn"
          id="sendBtn"
          disabled={balance <= 0}
          onClick={() =>
            navigate("/send", {
              state: { balance: balance, typeTxn : "business" },
            })
          }
        >
          <span className="btn-icon">
            <img src={Index.sendMoney} alt="Send Money" />
          </span>
          Send
        </button>
        <button
          className="action-btn receive-btn"
          id="withdraw"
          disabled={balance <= 0}
          onClick={() => navigate("/withdraw" , {
            state: { typeTxn : "business" },
          })}
        >
          <span className="btn-icon">
            <img src={Index.sendMoney} alt="Receive Money" />
          </span>
          Withdraw
        </button>
      </div>
    </>
  );
}

export default Business;
