import React from "react";
import Index from "../../Index";

function Individual() {
  const navigate = Index.useNavigate();
  return (
    <>
      <div className="action-buttons">
        <button
          className="action-btn send-btn"
          id="sendBtn"
          onClick={() => navigate("/deposit")}
        >
          <span className="btn-icon">
            <img src={Index.receiveMoney} alt="Send Money" />
          </span>
          Deposit
        </button>
        <button
          className="action-btn send-btn"
          id="sendBtn"
          onClick={() => navigate("/send")}
        >
          <span className="btn-icon">
            <img src={Index.sendMoney} alt="Send Money" />
          </span>
          Send
        </button>
        {/* <button
          className="action-btn receive-btn"
          id="receive-merchant"
          onClick={() => navigate("/receive-merchant")}
        >
          <span className="btn-icon">
            <img src={Index.receiveMoney} alt="Receive Money" />
          </span>
          Receive
        </button> */}
        <button
          className="action-btn receive-btn"
          id="withdraw"
          onClick={() => navigate("/withdraw")}
        >
          <span className="btn-icon">
            <img src={Index.sendMoney} alt="Receive Money" />
          </span>
          Withdraw
        </button>
      </div>
      {/* <button className="address-book-btn">Address Book</button> */}
    </>
  );
}

export default Individual;
