import React, { useEffect, useState } from "react";
import Index from "../Index";
import moment from "moment";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
const _window = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({
  baseURL: `${backendURL}`,
  timeout: 20000,
  withCredentials: true,
});

function Notification() {
  const { t, i18n } = Index.useTranslation();
  const location = useLocation();
  // const isBusiness = location;
  const isBusiness = location?.state?.isBusiness;
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [tab, setTab] = useState(location?.state?.activeTab ?? "All");

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

  useEffect(() => {
    if (location?.state?.activeTab) {
      setTab(+location?.state?.activeTab ?? 1);
    }
  }, [location]);

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
  }, [languageCh]);

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
    navigate("/signin");
  };
  const handleGetNotifications = async () => {
    try {
      const res = await Index.DataService.get(
        `${Index.Api.GET_NOTIFICATION}?id=${userData?._id}`
      );
      setTransactionList(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      handleGetNotifications();
    }
  }, [userData?._id]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="app-container">
        <header>
          <div className="outline-tabs-main">
            <button
              className="outline-tabs"
              id="sendBtn"
              onClick={() =>
                navigate("/deposit", {
                  state: { balance: balance, typeTxn: "individual" },
                })
              }
            >
              <img
                src={Index.deposit}
                alt="Send Money"
                className="outline-tabs-icon"
              />
              {t("Deposit")}
            </button>
          </div>
          <div className="app-icon">
            {/* <img src={Index.pocketPi} alt={t("PocketPi")} /> */}
            <img src={Index.logo} alt={t("PocketPi")} className="logo-header" />
          </div>
          <div className="header-icons">
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
          {transactionList?.length ? (
            <div
              className={`transaction-section ${
                isExpanded ? "collapsed" : "expanded"
              }`}
            >
              {/* Toggle Arrow */}
              <div className="arrow">
                <button className="back" onClick={() => navigate("/home", {})}>
                  <img src={Index.Back1} alt="Back" />
                </button>
              </div>

              {/* Dropdown Filter (instead of tabs) */}
              <div className="post-filter-dropdown">
                <select
                  value={tab}
                  onChange={(e) => setTab(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">{t("All")}</option>
                  <option value="Invoices">{t("Invoices")}</option>
                  <option value="Requests">{t("Requests")}</option>
                  <option value="Tickets">{t("Tickets")}</option>
                  <option value="Chats">{t("Chats")}</option>
                  <option value="Jobs">{t("Jobs")}</option>
                  <option value="Contracts">{t("Contracts")}</option>
                </select>
              </div>

              {/* Title */}
              <h2 className="transaction-section-title">
                {t(
                  tab === "All" ? "All Notifications" : `${tab} Notifications`
                )}
              </h2>

              {/* Filtered List */}
              <div className="transaction-list">
                {transactionList
                  ?.filter((item) => {
                    if (tab === "All") return true;
                    const normalizedTab = tab.toLowerCase().replace(/s$/, "");
                    return item.type?.toLowerCase() === normalizedTab;
                  })
                  ?.map((transaction, index) => (
                    <div className="transaction-main-box" key={index}>
                      <div className="transaction-details">
                        <div className="transaction-info">
                          <p className="transaction-title">
                            <strong>Type:</strong> {transaction.type}
                          </p>
                          <p className="transaction-title">
                            <strong>Title:</strong> {transaction.title}
                          </p>
                          <p className="transaction-title">
                            <strong>Description:</strong>{" "}
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="transaction-date-info">
                        <p className="transaction-time">
                          {moment(transaction.createdAt).format("hh:mm A")}
                        </p>
                        <p className="transaction-date">
                          {moment(transaction.createdAt).format("DD MMM, YYYY")}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="no-data-text">{t("No posts available")}</p>
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
                // state: { isBusiness: tab === 2 && true },
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
          <div
            className="setting-cont-box"
            onClick={() =>
              navigate("/withdraw", {
                state: { typeTxn: tab == 1 ? "individual" : "business" },
              })
            }
          >
            <div className="setting-icon-box">
              <img src={Index.withdraw} alt="" />
            </div>
            <h6 className="setting-cont-title">{t("Withdraw")}</h6>
          </div>
          {tab == 1 && (
            <div
              className="setting-cont-box"
              onClick={() =>
                navigate("/deposit", {
                  state: { balance: balance, typeTxn: "individual" },
                })
              }
            >
              <div className="setting-icon-box">
                <img src={Index.deposit} alt="" />
              </div>
              <h6 className="setting-cont-title">{t("Deposit")}</h6>
            </div>
          )}
          {tab == 2 && (
            <div
              className="setting-cont-box"
              onClick={() =>
                navigate("/invoice", {
                  state: { isBusiness: true },
                })
              }
            >
              <div className="setting-icon-box">
                <img src={Index.Invoice} alt="" />
              </div>
              <h6 className="setting-cont-title">{t("InvoiceRequest")}</h6>
            </div>
          )}
          {tab == 1 && (
            <div
              className="setting-cont-box"
              onClick={() =>
                navigate("/invoice-list", {
                  state: { isBusiness: true },
                })
              }
            >
              <div className="setting-icon-box">
                <img src={Index.Invoice} alt="" />
              </div>
              <h6 className="setting-cont-title">{t("Invoice")}</h6>
            </div>
          )}
          {tab == 1 && (
            <div
              className="setting-cont-box"
              onClick={() => navigate("/nominee", {})}
            >
              <div className="setting-icon-box">
                <img src={Index.Nominee} alt="" />
              </div>
              <h6 className="setting-cont-title">{t("Nominee")}</h6>
            </div>
          )}
          <div
            className="setting-cont-box"
            onClick={() =>
              navigate("/chat", {
                state: { typeTxn: tab == 1 ? "individual" : "business" },
              })
            }
          >
            <div className="setting-icon-box">
              <img src={Index.Phone} alt="" />
            </div>
            <h6 className="setting-cont-title">{t("Chat")}</h6>
          </div>
          <div
            className="setting-cont-box"
            onClick={() =>
              navigate("/privacy-policy", {
                state: { typeTxn: tab == 1 ? "individual" : "business" },
              })
            }
          >
            <div className="setting-icon-box">
              <img src={Index.Privacy} alt="" />
            </div>
            <h6 className="setting-cont-title">{t("Privacy Policy")}</h6>
          </div>
          <div
            className="setting-cont-box"
            onClick={() =>
              navigate("/term-conditions", {
                state: { typeTxn: tab == 1 ? "individual" : "business" },
              })
            }
          >
            <div className="setting-icon-box">
              <img src={Index.Terms} alt="" />
            </div>
            <h6 className="setting-cont-title">{t("Terms & Conditions")}</h6>
          </div>
        </Index.Modal.Body>
      </Index.Modal>
    </>
  );
}

export default Notification;
