import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pocketPi from "../../assets/images/pocketPi.png";
import profile from "../../assets/images/Profile.png";
import scan from "../../assets/images/Scan.png";
import setting from "../../assets/images/Setting.png";
import copy from "../../assets/images/Copy.png";
import income from "../../assets/images/income.png";
import expense from "../../assets/images/expense.png";
import suitcase from "../../assets/images/Suitcase.png";
import employee from "../../assets/images/Employee.png";
import autopay from "../../assets/images/Autopay.png";
import configure from "../../assets/images/Configure.png";
import Individual from "./individual/Individual";
import Business from "./business/Business";
import { Modal, TabContainer, TabContent, TabPane } from "react-bootstrap";

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
  return (
    <>
      <div className="app-container p-20-0">
        <div className="p-20">
          <header>
            <div className="profile-section" style={{ flex: "0 0 33.3%" }}>
              <div className="profile-pic">
                <img src={profile} alt="Profile" />
              </div>
              {tab === 2 && <span className="upgrade-text">Upgrade Plan</span>}
            </div>
            <div
              className="app-icon"
              style={{ textAlign: "center", flex: "0 0 33.3%" }}
            >
              <img src={pocketPi} alt="PocketPi" />
            </div>
            <div className="header-icons" style={{ flex: "1 1 33.3%" }}>
              <button className="icon-btn" id="syncBtn">
                <img src={scan} alt="Scan" />
              </button>
              <button
                className="icon-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalMerchant"
                onClick={handleOpen}
              >
                <img src={setting} alt="Setting" />
              </button>
            </div>
          </header>
          <TabContainer
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
                {copied ? <span>✓</span> : <img src={copy} alt="Copy" />}
              </button>
            </div>
            <div className="balance-section">
              <p className="balance-label">Current Balance</p>
              <h1 className="balance-amount">31.4159 Pi</h1>
            </div>
            <TabContent>
              <TabPane eventKey={1}>
                <Individual />
              </TabPane>
              <TabPane eventKey={2}>
                <Business />
              </TabPane>
            </TabContent>
          </TabContainer>
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
                      src={isPositive ? income : expense}
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
      <Modal className="user-setting-modal" show={open} onHide={handleClose}>
        <Modal.Header>
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
        </Modal.Header>
        <Modal.Body>
          <div class="setting-cont-box">
            <div class="setting-icon-box">
              <img src={suitcase} alt="" />
            </div>
            <h6 class="setting-cont-title">Add Business Address</h6>
          </div>
          <div class="setting-cont-box">
            <div class="setting-icon-box">
              <img src={employee} alt="" />
            </div>
            <h6 class="setting-cont-title">Add Employee Address</h6>
          </div>
          <div class="setting-cont-box">
            <div class="setting-icon-box">
              <img src={autopay} alt="" />
            </div>
            <h6 class="setting-cont-title">Set Autopay</h6>
          </div>
          <div class="setting-cont-box">
            <div class="setting-icon-box">
              <img src={configure} alt="" />
            </div>
            <h6 class="setting-cont-title">Configure Salary Disbursement</h6>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Home;
