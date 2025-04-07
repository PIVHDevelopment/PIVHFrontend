import React, { useState } from "react";
import Index from "../Index";

function Send() {
  const navigate = Index.useNavigate();
  const [tab, setTab] = useState(1);
  const [text, setText] = useState("");
  return (
    <div className="app-container">
      <header class="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Index.back} alt="Back" />
        </button>
        <div class="app-icon" style={{ marginLeft: -"26px" }}>
          <img src={Index.pocketPi} alt="PocketPi" />
        </div>
        <div class="header-right"></div>
      </header>

      <Index.TabContainer
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
        <Index.TabContent>
          <Index.TabPane eventKey={1}></Index.TabPane>
          <Index.TabPane eventKey={2}></Index.TabPane>
        </Index.TabContent>
      </Index.TabContainer>

      <div class="send-form">
        <div class="input-group">
          <div class="input-wrapper send-input-box">
            <input
              type="text"
              placeholder="Enter Wallet Address"
              value={text}
            />
            <button
              class="paste-btn"
              onClick={async () => {
                const res = await navigator.clipboard.readText();
                setText(res);
              }}
            >
              Paste
            </button>
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
