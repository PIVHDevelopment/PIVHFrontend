import React, { useState } from "react";
import Individual from "./individual/Individual";
import Business from "./business/Business";
import Index from "../Index";

const transactions = [
  {
    title: "Bills and groceries",
    time: "05:26 am",
    date: "21 Sep, 2024",
    amount: -31.415,
    type: "expense",
  },
  {
    title: "Savings",
    time: "05:26 am",
    date: "21 Sep, 2024",
    amount: -31.415,
    type: "expense",
  },
  {
    title: "Money received",
    time: "05:26 am",
    date: "21 Sep, 2024",
    amount: -3.1415,
    type: "income",
  },
  {
    title: "Money sent to Lorem",
    time: "05:26 am",
    date: "21 Sep, 2024",
    amount: -31.415,
    type: "expense",
  },
  {
    title: "Money received",
    time: "05:26 am",
    date: "21 Sep, 2024",
    amount: 31.4159,
    type: "income",
  },
];
function Home() {
  const [tab, setTab] = useState(1);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("hs7229dhsdhsj2987475");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(JSON.parse(sessionStorage.getItem("pi_user_data")));
  return (
    <>
      <div className="app-container p-20-0">
        <div className="p-20">
          <header>
            <div className="profile-section" style={{ flex: "0 0 33.3%" }}>
              <div className="profile-pic">
                <img src={Index.profile} alt="Profile" />
              </div>
              {tab === 2 && <span className="upgrade-text">Upgrade Plan</span>}
            </div>
            <div
              className="app-icon"
              style={{ textAlign: "center", flex: "0 0 33.3%" }}
            >
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-icons" style={{ flex: "1 1 33.3%" }}>
              <button className="icon-btn" id="syncBtn">
                <img src={Index.scan} alt="Scan" />
              </button>
              <button
                className="icon-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalMerchant"
                onClick={handleOpen}
              >
                <img src={Index.setting} alt="Setting" />
              </button>
            </div>
          </header>
          <Index.TabContainer
            id="left-tabs-example"
            defaultActiveKey="individual"
            activeKey={tab}
          >
            <div className="wallet-tabs">
              <button
                className={`tab-btn${tab === 1 ? " active" : ""}`}
                data-tab="individual"
                onClick={() => setTab(1)}
              >
                Individual
              </button>
              <button
                className={`tab-btn${tab === 2 ? " active" : ""}`}
                data-tab="business"
                onClick={() => setTab(2)}
              >
                Business
              </button>
            </div>
            <div className="wallet-id">
              <span id="walletAddress">hs7229dhsdhsj2987475</span>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? <span>✓</span> : <img src={Index.copy} alt="Copy" />}
              </button>
            </div>
            <div className="balance-section">
              <p className="balance-label">Current Balance</p>
              <h1 className="balance-amount">31.4159 Pi</h1>
            </div>
            <Index.TabContent>
              <Index.TabPane eventKey={1}>
                <Individual />
              </Index.TabPane>
              <Index.TabPane eventKey={2}>
                <Business />
              </Index.TabPane>
            </Index.TabContent>
          </Index.TabContainer>
        </div>

        <div
          className={`transaction-section${
            tab === 2 ? " transaction-section-top" : ""
          }`}
        >
          <h2>Transaction History</h2>
          <div className="transaction-list">
            {transactions?.map((transaction) => {
              const isPositive = transaction.type === "income";
              const amountPrefix = isPositive ? "+" : "-";
              return (
                <div className="transaction-main-box">
                  <div className="transaction-details">
                    <img
                      src={isPositive ? Index.income : Index.expense}
                      alt="expense"
                      className="transaction-icon"
                    />
                    <div className="transaction-info">
                      <span className="transaction-title">
                        {transaction.title}
                      </span>
                      <span className="transaction-time">
                        {transaction.time}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`transaction-amount ${
                      isPositive ? "positive" : "negative"
                    }`}
                  >
                    <span>
                      {amountPrefix}
                      {Math.abs(transaction.amount)} Pi
                    </span>
                    <span className="transaction-date">{transaction.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Index.Modal
        className="user-setting-modal"
        show={open}
        onHide={handleClose}
      >
        <Index.Modal.Header>
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Settings
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Index.Modal.Header>
        <Index.Modal.Body>
          <div class="setting-cont-box">
            <div class="setting-icon-box">
              <img src={Index.suitcase} alt="" />
            </div>
            <h6 class="setting-cont-title">Add Business Address</h6>
          </div>
          <div class="setting-cont-box">
            <div class="setting-icon-box">
              <img src={Index.employee} alt="" />
            </div>
            <h6 class="setting-cont-title">Add Employee Address</h6>
          </div>
          <div class="setting-cont-box">
            <div class="setting-icon-box">
              <img src={Index.autopay} alt="" />
            </div>
            <h6 class="setting-cont-title">Set Autopay</h6>
          </div>
          <div class="setting-cont-box">
            <div class="setting-icon-box">
              <img src={Index.configure} alt="" />
            </div>
            <h6 class="setting-cont-title">Configure Salary Disbursement</h6>
          </div>
        </Index.Modal.Body>
      </Index.Modal>
    </>
  );
}

export default Home;
