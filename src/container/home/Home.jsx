import React, { useEffect, useState } from "react";
import Individual from "./individual/Individual";
import Business from "./business/Business";
import Index from "../Index";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";

const _window = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({
  baseURL: `${backendURL}`,
  timeout: 20000,
  withCredentials: true,
});

function Home() {
  const location = useLocation();
  const isBusiness = location?.state?.isBusiness;
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [tab, setTab] = useState(isBusiness ? 2 : 1);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = Index.useNavigate();
  const [transactionList, setTransactionList] = useState([]);
  const [balance, setBalance] = useState("0");
  const [businessBalance, setBusinessBalance] = useState("0");
  let typeTxn = tab == 1 ? "individual" : "business";
  console.log({isBusiness});
  
  
  const handleCopy = () => {
    navigator.clipboard.writeText(userData?.userName);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signOutUser = () => {
    return axiosClient.post(Index.Api.SIGN_OUT);
  };
  const handleLogout = async () => {
    await signOutUser();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  const handleGetTransactions = () => {
    Index.DataService.get(
      `${Index.Api.GET_TRANSACTIONS}/${userData?.uid}?typeTxn=${typeTxn}`
    ).then((res) => {
      console.log({ res });
      
      setTransactionList(res?.data?.data?.updatedList);
      setBalance(res?.data?.data?.balance);
      setBusinessBalance(res?.data?.data?.businessBalance);
    });
  };

  // const handleGetBalance = () => {
  //   axios
  //     .get(`https://api.testnet.minepi.com/accounts/${userData?.walletAddress}`)
  //     .then((res) => {
  //       setBalance(res?.data?.balances[0]?.balance);
  //     });
  // };

  useEffect(() => {
    handleGetTransactions();
    // if (userData?.walletAddress) {
    //   handleGetBalance();
    // }
  }, [typeTxn]);

  return (
    <>
      <div className="app-container p-20-0">
        <div className="p-20">
          <header>
            <div className="profile-section" style={{ flex: "0 0 33.3%" }}>
              {/* <div className="profile-pic">
                <img src={Index.profile} alt="Profile" />
              </div>
              {tab === 2 && <span className="upgrade-text">Upgrade Plan</span>} */}
            </div>
            <div
              className="app-icon"
              style={{ textAlign: "center", flex: "0 0 33.3%" }}
            >
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-icons" style={{ flex: "1 1 33.3%" }}>
              {/* <button className="icon-btn" id="syncBtn">
                <img src={Index.scan} alt="Scan" />
              </button> */}
              <button
                className="icon-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalMerchant"
                onClick={handleOpen}
                // onClick={() => navigate("/add-wallet")}
              >
                <img src={Index.setting} alt="Setting" />
              </button>
              <button className="icon-btn" id="syncBtn" onClick={handleLogout}>
                <img src={Index.logout} alt="logout" />
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
              <span id="walletAddress">{userData?.userName}</span>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? <span>✓</span> : <img src={Index.copy} alt="Copy" />}
              </button>
            </div>
            <div className="balance-section">
              <p className="balance-label">Current Balance</p>
              <h1 className="balance-amount">
                {parseFloat(tab == 2 ? businessBalance : balance).toFixed(2)} Pi
              </h1>
            </div>
            <Index.TabContent>
              <Index.TabPane eventKey={1}>
                <Individual balance={balance} />
              </Index.TabPane>
              <Index.TabPane eventKey={2}>
                <Business balance={businessBalance}/>
              </Index.TabPane>
            </Index.TabContent>
          </Index.TabContainer>
        </div>

        {transactionList?.length ? (
          <div
            // className={`transaction-section${
            //   tab === 2 ? " transaction-section-top" : ""
            // }`}
            className="transaction-section"
          >
            <h2>Transaction History</h2>
            <div className="transaction-list">
              {transactionList?.map((transaction,index) => {
                const isPositive = transaction.paymentType === "received";
                const amountPrefix = isPositive ? "+" : "-";
                return (
                  <div className="transaction-main-box" key={index}>
                    <div className="transaction-details">
                      <img
                        src={isPositive ? Index.income : Index.expense}
                        alt="expense"
                        className="transaction-icon"
                      />
                      <div className="transaction-info">
                        <span className="transaction-title">
                          {transaction?.memo || transaction?.type}
                        </span>
                        <span className="transaction-time">
                          {Index.moment(transaction.createdAt).format(
                            "hh:mm A"
                          )}
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
                      <span className="transaction-date">
                        {Index.moment(transaction.createdAt).format(
                          "DD MMM, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Index.Modal
        className="user-setting-modal"
        show={open}
        onHide={handleClose}
      >
        <Index.Modal.Header>
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Settings
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Index.Modal.Header>
        <Index.Modal.Body>
          <NavLink className="setting-cont-box" to={"/add-wallet"}>
            <div className="setting-icon-box">
              <img src={Index.suitcase} alt="" />
            </div>
            <h6 className="setting-cont-title">Add Wallet Address</h6>
          </NavLink>
          <div className="setting-cont-box">
            <div className="setting-icon-box">
              <img src={Index.suitcase} alt="" />
            </div>
            <h6 className="setting-cont-title">Add Business Address</h6>
          </div>
          <div className="setting-cont-box">
            <div className="setting-icon-box">
              <img src={Index.employee} alt="" />
            </div>
            <h6 className="setting-cont-title">Add Employee Address</h6>
          </div>
          <div className="setting-cont-box">
            <div className="setting-icon-box">
              <img src={Index.autopay} alt="" />
            </div>
            <h6 className="setting-cont-title">Set Autopay</h6>
          </div>
          <div className="setting-cont-box">
            <div className="setting-icon-box">
              <img src={Index.configure} alt="" />
            </div>
            <h6 className="setting-cont-title">
              Configure Salary Disbursement
            </h6>
          </div>
          <NavLink className="setting-cont-box" to={"/check-kyb-verification"}>
            <div className="setting-icon-box">
              <img src={Index.configure} alt="" />
            </div>
            <h6 className="setting-cont-title">Upgrade to business version</h6>
          </NavLink>
        </Index.Modal.Body>
      </Index.Modal>
    </>
  );
}

export default Home;
