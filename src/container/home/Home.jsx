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
  const { t, i18n } = Index.useTranslation();
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
  const [businessUserName, setBusinessUserName] = useState("");
  let typeTxn = tab == 1 ? "individual" : "business";
  const selectedLanguage = localStorage.getItem("language") || "En";
  const [languageCh, setLanguageCh] = useState(selectedLanguage);

  const handleLanguageChange = (eventOrValue) => {
    const lang =
      typeof eventOrValue === "string"
        ? eventOrValue
        : eventOrValue.target.value;

    if (lang == "Ar") {
      document.body.classList.add("direction-rtl");
    } else {
      document.body.classList.remove("direction-rtl");
    }
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    setLanguageCh(lang);
    updateLanugage(lang);
  };

  useEffect(() => {
    if (languageCh == "Ar") {
      document.body.classList.add("direction-rtl");
    } else {
      document.body.classList.remove("direction-rtl");
    }
    i18n.changeLanguage(languageCh);
  }, [languageCh])

  const updateLanugage = (lang) => {
    Index.DataService.post(Index.Api.UPDATE_LANGUAGE, {
      id: userData._id,
      language: lang,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      tab == 2 ? businessUserName : userData?.userName
    );
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
      setBusinessUserName(res?.data?.data?.businessUserName);
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

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="app-container">

        <header>
          {/* <div className="profile-pic">
                <img src={Index.profile} alt="Profile" />
              </div>
              {tab === 2 && <span className="upgrade-text">Upgrade Plan</span>} */}

          <div className="lang-dropdown-main">
            <Index.FormControl>
              <Index.Select
                value={languageCh}
                onChange={handleLanguageChange}
              >
                <Index.MenuItem value={"En"}>En</Index.MenuItem>
                <Index.MenuItem value={"Hi"}>Hi</Index.MenuItem>
                <Index.MenuItem value={"Ar"}>Ar</Index.MenuItem>
              </Index.Select>
            </Index.FormControl>
            <img src={Index.languageImg} className="lang-change-icon" />
            <img
              src={Index.downblackAarrow}
              className="search-down-arrow"
              alt="Dropdown"
            />
          </div>
          <div
            className="app-icon"
          >
            <img src={Index.pocketPi} alt={t("PocketPi")} />
          </div>
          <div className="header-icons">
            {/* <button className="icon-btn" id="syncBtn">
                <img src={Index.scan} alt="Scan" />
              </button> */}

            {/* {(tab === 2 && !userData?.isBusinessSubscription) ||
              (tab === 1 && !userData?.isIndividualSubscription) ? (
                ""
              ) : (
                <button
                  className="icon-btn subscrip-icon"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalMerchant"
                  // onClick={handleOpen}
                  // onClick={() => navigate("/add-wallet")}
                >
                  <img src={Index.subscribedIcon} alt="Setting" />
                </button>
              )} */}

            <button
              className="icon-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalMerchant"
              onClick={handleOpen}
            // onClick={() => navigate("/add-wallet")}
            >
              <img src={Index.setting} alt={t("Setting")} />
            </button>
            <button className="icon-btn" id="syncBtn" onClick={handleLogout}>
              <img src={Index.logout} alt="logout" />
            </button>
          </div>
        </header>
        <div className="home-page-main">
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
                {t("Individual")}
              </button>
              {userData?.businessTxn?.isPin &&
                userData?.businessTxn?.isQuestion && (
                  <button
                    className={`tab-btn${tab === 2 ? " active" : ""}`}
                    data-tab="business"
                    onClick={() => setTab(2)}
                  >
                    {t("Business")}
                  </button>
                )}
            </div>
            <div className="wallet-id">
              <div className="tick-mark-icons">
                <span id="walletAddress">
                  {tab == 1 ? userData?.userName : userData?.businessUserName}
                </span>
                {/* <div>
                  <img
                    src={Index.verify}
                    className="verify-icons"
                    alt="verify"
                  />
                </div> */}
                {(tab === 2 && !userData?.isBusinessSubscription) ||
                (tab === 1 && !userData?.isIndividualSubscription) ? (
                  ""
                ) : (
                  <div>
                    <img
                      src={Index.verify}
                      className="verify-icons"
                      alt={t("verify")}
                    />
                  </div>
                )}
              </div>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? (
                  <span>✓</span>
                ) : (
                  <img src={Index.copy} alt={t("Copy")} />
                )}
              </button>
            </div>
            <div className="balance-section">
              {/* <button className="add-btn" onClick={() => navigate("/transaction-success")}>Demo</button> */}
              <p className="balance-label">{t("CurrentBalance")}</p>
              <h1 className="balance-amount">
                {/* {parseFloat(tab == 2 ? businessBalance : balance)?.toFixed(5)} Pi */}
                {parseFloat(tab == 2 ? businessBalance : balance) > 0
                  ? parseFloat(tab == 2 ? businessBalance : balance).toFixed(5)
                  : 0}{" "}
                Pi
              </h1>
            </div>
            <Index.TabContent>
              <Index.TabPane eventKey={1}>
                <Individual balance={balance} />
              </Index.TabPane>
              <Index.TabPane eventKey={2}>
                <Business balance={businessBalance} />
              </Index.TabPane>
            </Index.TabContent>
          </Index.TabContainer>


          {transactionList?.length ? (
            <div
              className={`transaction-section ${isExpanded ? "expanded" : "collapsed"
                }`}
            >
              <div className="toggle-arrow" onClick={toggleSection}>
                {isExpanded ? (
                  <span className="arrow-icon">↓</span>
                ) : (
                  <span className="arrow-icon">↑</span>
                )}
              </div>
              <h2 className="transaction-section-title">{t("TransactionHistory")}</h2>
              <div className="transaction-list">
                {transactionList?.map((transaction, index) => {
                  const isPositive = transaction.paymentType === "received";
                  const amountPrefix = isPositive ? "+" : "-";
                  return (
                    <div className="transaction-main-box" key={index}>
                      <div className="transaction-details">
                        <img
                          src={isPositive ? Index.income : Index.expense}
                          alt={t("expense")}
                          className="transaction-icon"
                        />
                        <div className="transaction-info">
                          <p className="transaction-title">
                            {transaction?.memo || transaction?.type}{" "}
                            {transaction?.receiver_name &&
                              `(${transaction?.paymentType === "sent"
                                ? transaction?.receiver_name
                                : transaction?.user_name
                              })`}
                          </p>
                          <p className="transaction-time">
                            {Index.moment(transaction.createdAt).format(
                              "hh:mm A"
                            )}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`transaction-amount ${isPositive ? "positive" : "negative"
                          }`}
                      >
                        <p className="transaction-amount">
                          {amountPrefix}
                          {Math.abs(transaction.amount)?.toFixed(5)} Pi
                        </p>
                        <p className="transaction-date">
                          {Index.moment(transaction.createdAt).format(
                            "DD MMM, YYYY"
                          )}
                        </p>
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
      </div>
      <Index.Modal
        className="user-setting-modal"
        show={open}
        onHide={handleClose}
      >
        <Index.Modal.Header>
          <h1 className="modal-title" id="exampleModalLabel">
            {t("Settings")}
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
          <div
            className="setting-cont-box"
            onClick={() =>
              navigate("/address-book", {
                state: { isBusiness: tab === 2 && true },
              })
            }
          >
            <div className="setting-icon-box">
              <img src={Index.addressbook} alt="" />
            </div>
            <h6 className="setting-cont-title">{t("AddressBook")}</h6>
          </div>
          {(tab === 2 && userData?.isBusinessSubscription) ||
          (tab === 1 && userData?.isIndividualSubscription) ? (
            ""
          ) : (
            <div
              className="setting-cont-box"
              onClick={() =>
                navigate("/subscription", {
                  state: { isBusiness: tab === 2 && true },
                })
              }
            >
              <div className="setting-icon-box">
                <img src={Index.subscriberIcon} alt="" />
              </div>
              <h6 className="setting-cont-title">{t("Subscription")}</h6>
            </div>
          )}

          {(!userData?.businessTxn?.isPin ||
            !userData?.businessTxn?.isQuestion) && (
            <NavLink
              className="setting-cont-box"
              to={"/check-kyb-verification"}
            >
              <div className="setting-icon-box">
                <img src={Index.businessversion} alt="" />
              </div>
              <h6 className="setting-cont-title">
                {t("UpgradeToBusinessVersion")}
              </h6>
            </NavLink>
          )}

          <div
            className="setting-cont-box"
            onClick={() => {
              navigate("/payment-request", {
                state: { isBusiness: tab === 2 && true },
              });
            }}
          >
            <div className="setting-icon-box">
              <img src={Index.paymentRequestIcon} alt="" />
            </div>
            <h6 className="setting-cont-title">{t("PaymentRequest")}</h6>
          </div>

          <div
            className="setting-cont-box"
            onClick={() => {
              navigate("/wallet-address-book", {
                state: { isBusiness: tab === 2 && true },
              });
            }}
          >
            <div className="setting-icon-box">
              <img src={Index.walletAddressBook} alt="" />
            </div>
            <h6 className="setting-cont-title">{t("WalletAddressBook")}</h6>
          </div>
          <div
            className="setting-cont-box"
            onClick={() => {
              navigate("/verify-answer", {
                state: { isBusiness: tab === 2 && true },
              });
            }}
          >
            <div className="setting-icon-box">
              <img src={Index.recover} alt="" />
            </div>
            <h6 className="setting-cont-title">{t("RecoverPin")}</h6>
          </div>

          <div
            className="setting-cont-box"
            onClick={() => {
              navigate("/feedback-comaplaint");
            }}
          >
            <div className="setting-icon-box">
              <img src={Index.complainIcon} alt="" />
            </div>
            <h6 className="setting-cont-title">{t("Tickets")}</h6>
          </div>
        </Index.Modal.Body>
      </Index.Modal>
    </>
  );
}

export default Home;
