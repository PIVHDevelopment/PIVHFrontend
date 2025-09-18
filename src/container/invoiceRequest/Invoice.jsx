import React, { useEffect, useState } from "react";
import Index from "../Index";
import axios from "axios";
import {
  Box,
  Typography,
  Modal,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";

const _window = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({
  baseURL: `${backendURL}`,
  timeout: 20000,
  withCredentials: true,
});

function Invoice() {
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
  const [buttonLoader, setButtonLoader] = useState(false);
  const isBusiness = location?.state?.isBusiness;
  let isRtl = language === "Ar" ? true : false;
  const [tab, setTab] = useState(1);
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [copiedArray, setCopiedArray] = useState("");
  const navigate = Index.useNavigate();
  const [invoiceList, setInvoiceList] = useState([]);

  const handleGetData = () => {
    Index.DataService.get(`${Index.Api.GET_USERS}`).then((res) => {
      let filter = res?.data?.data?.filter(
        (ele) => ele?._id == userData?._id
      )?.[0];
      //   sessionStorage.setItem("pi_user_data", JSON.stringify(filter));
    });
  };

  const handleGetInvoiceData = () => {
    Index.DataService.get(`${Index.Api.GET_INVOICE}`).then((res) => {
      let filter = res?.data?.data?.filter(
        (ele) =>
          ele?.sendReqUserId?._id === userData?._id ||
          ele?.receiveReqUserId?._id === userData?._id
      );
      // let sliceData = filter?.slice(0, 5);
      setInvoiceList(filter);
    });
  };

  useEffect(() => {
    handleGetInvoiceData();
    handleGetData();
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {buttonLoader ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          <header className="receive-center">
            <button
              className="back-btn"
              onClick={() =>
                navigate("/home", {
                  state: {
                    state: { isBusiness },
                  },
                })
              }
            >
              <img src={Index.back} alt="Back" />
            </button>
            <div className="app-icon">
              {/* <img src={Index.pocketPi} alt={t("PocketPi")} /> */}
              <img src={Index.logo} className="logo-header" alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>
          <div className="home-page-main">
            <Box className="address-book-details">
              <Box className="address-book-head">
                <Typography
                  className={`address-book-title ${
                    isRtl ? "text-align-right" : ""
                  }`}
                >
                  {t("Create Invoice")}
                </Typography>
                <button
                  className="icon-btn"
                  onClick={() =>
                    navigate("/send-invoice", {
                      state: {
                        state: { isBusiness },
                        data: invoiceList?.length,
                      },
                    })
                  }
                >
                  <img src={Index.Plusadd} alt={t("Add")} />
                </button>
              </Box>

              {invoiceList?.length ? (
                <div
                  className={`transaction-section ${
                    isExpanded ? "expanded" : "collapsed"
                  }`}
                >
                  <div className="toggle-arrow" onClick={toggleSection}>
                    {isExpanded ? (
                      <span className="arrow-icon">↓</span>
                    ) : (
                      <span className="arrow-icon">↑</span>
                    )}
                  </div>
                  <h2 className="transaction-section-title">
                    {"Invoice List"}
                  </h2>
                  <div className="transaction-list">
                    {invoiceList?.length ? (
                      <div
                        className={`transaction-section ${
                          isExpanded ? "expanded" : "collapsed"
                        }`}
                      >
                        <div className="toggle-arrow" onClick={toggleSection}>
                          {isExpanded ? (
                            <span className="arrow-icon">↓</span>
                          ) : (
                            <span className="arrow-icon">↑</span>
                          )}
                        </div>
                        <h2 className="transaction-section-title">
                          {t("Invoice List")}
                        </h2>
                        <div className="transaction-list">
                          {invoiceList?.map((transaction, index) => {
                            const isPositive =
                              transaction.paymentType === "received";
                            const amountPrefix = isPositive ? "+" : "-";
                            return (
                              <div className="transaction-main-box" key={index}>
                                <div className="transaction-details">
                                  <img
                                    src={Index.showIcon}
                                    alt={t("expense")}
                                    className="transaction-icon"
                                    onClick={() => {
                                      navigate(
                                        "/invoice-request/" + transaction?._id,
                                        {
                                          state: {
                                            data: transaction,
                                          },
                                        }
                                      );
                                    }}
                                  />
                                  <img
                                    src={
                                      // isPositive ? Index.income : Index.expense

                                      transaction?.sendReqUserId?._id ==
                                        userData?._id &&
                                      transaction?.senderStatus == "credit"
                                        ? Index.income
                                        : transaction?.receiveReqUserId?._id ==
                                            userData?._id &&
                                          transaction?.receiverStatus == "debit"
                                        ? Index.expense
                                        : Index.markIcon
                                    }
                                    alt={t("expense")}
                                    className="transaction-icon"
                                  />

                                  <div className="transaction-info">
                                    <p className="transaction-title">
                                      {transaction?.sendReqUserId?._id ==
                                        userData?._id &&
                                      transaction?.senderStatus == "credit"
                                        ? "Credit"
                                        : transaction?.receiveReqUserId?._id ==
                                            userData?._id &&
                                          transaction?.receiverStatus == "debit"
                                        ? "Debit"
                                        : "Pending"}{" "}
                                      {userData?._id ==
                                      transaction?.receiveReqUserId?._id
                                        ? transaction?.sendReqUserId?.userName
                                        : transaction?.receiveReqUserId
                                            ?.userName}
                                    </p>
                                    <p className="transaction-time">
                                      {Index.moment(
                                        transaction.createdAt
                                      ).format("hh:mm A")}
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className={`transaction-amount ${
                                    transaction?.sendReqUserId?._id ==
                                      userData?._id &&
                                    transaction?.senderStatus == "credit"
                                      ? "positive"
                                      : transaction?.receiveReqUserId?._id ==
                                          userData?._id &&
                                        transaction?.receiverStatus == "debit"
                                      ? "negative"
                                      : "pending"
                                  }`}
                                >
                                  <p className="transaction-amount">
                                    {amountPrefix}
                                    {Math.abs(transaction.totalAmount)?.toFixed(
                                      5
                                    )}{" "}
                                    Pi
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
              ) : (
                <></>
              )}
            </Box>
          </div>
        </div>
      )}
    </>
  );
}

export default Invoice;
