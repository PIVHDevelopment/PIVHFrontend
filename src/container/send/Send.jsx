import React, { useState } from "react";
import pocketPi from "../../assets/images/PocketPi.png";
import back from "../../assets/images/Back.png";
import { TabContainer, TabContent, TabPane } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Send() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  return (
    <div className="app-container">
      <header class="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={back} alt="Back" />
        </button>
        <div class="app-icon" style={{ marginLeft: -"26px" }}>
          <img src={pocketPi} alt="PocketPi" />
        </div>
        <div class="header-right"></div>
      </header>

      <TabContainer
        id="left-tabs-example"
        defaultActiveKey="individual"
        activeKey={tab}
      >
        <div className="wallet-tabs" style={{ width: "100%" }}>
          <button
            className={`tab-btn${tab === 1 ? " active" : ""}`}
            data-tab="individual"
            onClick={() => setTab(1)}
          >
            Waller Address
          </button>
          <button
            className={`tab-btn${tab === 2 ? " active" : ""}`}
            data-tab="business"
            onClick={() => setTab(2)}
          >
            Scan QR
          </button>
        </div>
        <TabContent>
          <TabPane eventKey={1}></TabPane>
          <TabPane eventKey={2}></TabPane>
        </TabContent>
      </TabContainer>

      <div class="send-form">
        <div class="input-group">
          <div class="input-wrapper send-input-box">
            <input type="text" placeholder="Enter Wallet Address" />
            <button class="paste-btn">Paste</button>
          </div>
          <button class="address-book-link">Select from Address Book</button>
        </div>

        <div class="input-group">
          <input
            type="text"
            placeholder="Enter Notes (optional)"
            class="notes-input"
          />
        </div>

        <div class="amount-section">
          <label>Enter Pi Amount</label>
          <div class="amount-display">31.415 Pi</div>
        </div>

        <button class="action-btn full-width send-pi-btn">Send Pi</button>
      </div>
    </div>
  );
}

export default Send;
