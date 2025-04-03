import React from "react";
import sendMoney from "../../../assets/images/send-money.png";
import receiveMoney from "../../../assets/images/receive-money.png";
import { useNavigate } from "react-router-dom";

function Individual() {
  const navigate = useNavigate();
  return (
    <>
      <div className="action-buttons">
        <button
          className="action-btn send-btn"
          id="sendBtn"
          onClick={() => navigate("/send")}
        >
          <span className="btn-icon">
            <img src={sendMoney} alt="Send Money" />
          </span>
          Send
        </button>
        <button
          className="action-btn receive-btn"
          id="receive-merchant"
          onClick={() => navigate("/receive-merchant")}
        >
          <span className="btn-icon">
            <img src={receiveMoney} alt="Receive Money" />
          </span>
          Receive
        </button>
      </div>
      <button className="address-book-btn">Address Book</button>
    </>
  );
}

export default Individual;
