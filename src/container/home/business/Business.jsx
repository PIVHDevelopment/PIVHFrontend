import React from "react";
import { useNavigate } from "react-router-dom";
import Index from "../../Index";

function Business() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="action-btn receive-btn full-width"
        id="merchantReceiveBtn"
        style={{ backgroundColor: "#fff", color: "#000" }}
        onClick={() => navigate("/receive")}
      >
        <span className="btn-icon">
          <img src={Index.receiveMoney} alt="Receive Money" />
        </span>
        Receive
      </button>

      <button className="address-book-btn">Salary Disbursement</button>

      <div className="stats-section">
        <div className="stats-header">
          <div className="stats-dropdown">
            Stats for: last 7 days
            <span>
              <img src={Index.downArrow} alt="Down Arrow" />
            </span>
          </div>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Sales Overview</div>
            <div className="stat-value">31415.9 Pi</div>
            <div className="stat-change">+31%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Repeated Customers</div>
            <div className="stat-value">314</div>
            <div className="stat-change">+31%</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Business;
