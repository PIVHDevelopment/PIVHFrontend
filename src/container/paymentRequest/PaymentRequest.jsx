import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import Index from "../Index";
import VerificationPin from "../verificationPin/VerificationPin";
import * as Yup from "yup";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 30px)",
  maxWidth: "350px",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const PaymentRequest = () => {
  const { t } = Index.useTranslation();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const language = localStorage.getItem("language");
  let isRtl = language === "Ar" ? true : false;
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  const [tab, setTab] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const isBusiness = location?.state?.isBusiness;
  const [requestData, setRequests] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [txnData, setTxnData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId("");
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await Index.DataService.get(
        `${Index.Api.GET_PAYMENT_REQUEST}?merchantId=${userData?._id
        }&userName=${isBusiness ? userData?.businessUserName : userData?.userName
        }`
      );
      if (res?.data?.status) {
        setRequests(res?.data?.data?.sentRequests);
        setReceivedData(res?.data?.data?.receivedRequests);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        merchantId: userData._id,
        merchantName: isBusiness
          ? userData?.businessUserName
          : userData?.userName,
        // id,
      };
      const res = await Index.DataService.post(
        Index.Api.ADD_UPDATE_PAYMENT_REQUEST,
        payload
      );
      if (res?.data?.status) {
        Index.toasterSuccess(res.data.message?.[language]);
        fetchRequests();
        handleClose();
      }
    } catch (err) {
      Index.toasterError(err?.response?.data?.message?.[language]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmitFunction = async (values) => {
    const pin = values.pinFields.join("");
    setButtonLoader(true);
    const paymentData = {
      amount: txnData?.amount,
      memo: "Pay Request",
      pin,
      typeTxn: isBusiness ? "business" : "individual",
      metadata: {
        userName: txnData?.merchantName,
        uid: userData?.uid,
        type: "Send",
      },
    };

    try {
      const res = await Index.DataService.post(
        Index.Api.PAYMENT_SEND,
        paymentData
      );
      await Index.DataService.post(Index.Api.ACCEPT_PAYMENT_REQUEST, {
        id: txnData?._id,
        transactionId: res?.data?.data,
      });

      if (res?.data?.status) {
        navigate("/transaction-success", {
          state: { isBusiness: type == "business" ? true : false },
        });
        fetchRequests();
        setNextPage(false);
      }
    } catch (error) {
      Index.toasterError(error?.response?.data?.message?.[language]);
    } finally {
      setButtonLoader(false);
    }
  };
  console.log({ txnData });

  const handleSubmitPin = (values) => {
    setTxnData(values);
    setNextPage(true);
  };

  return (
    <>
      {loading ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          {nextPage ? (
            <VerificationPin
              handleSubmitFunction={handleSubmitFunction}
              setNextPage={setNextPage}
            />
          ) : (
            <>
              <header className="receive-center">
                <button
                  className="back-btn"
                  onClick={() =>
                    navigate("/home", {
                      state: { isBusiness },
                    })
                  }
                >
                  <img src={Index.back} alt="Back" />
                </button>
                <div className="app-icon">
                  <img src={Index.pocketPi} alt={t("PocketPi")} />
                </div>
                <div className="header-right"></div>
              </header>

              {isBusiness && (
                <Index.TabContainer
                  id="left-tabs-example"
                  defaultActiveKey="individual"
                  activeKey={tab}
                >
                  <div className="wallet-tabs payment-request-tabs">
                    <button
                      className={`tab-btn${tab === 1 ? " active" : ""}`}
                      data-tab="individual"
                      onClick={() => setTab(1)}
                    >
                      {t("Receive")}
                    </button>

                    <button
                      className={`tab-btn${tab === 2 ? " active" : ""}`}
                      data-tab="business"
                      onClick={() => setTab(2)}
                    >
                      {t("Sent")}
                    </button>
                  </div>
                </Index.TabContainer>
              )}

              <Box className="address-book-details">
                <Box className="address-book-head">
                  <Typography
                    className={`address-book-title ${isRtl ? "text-align-right" : ""
                      }`}
                  >
                    {t("PaymentRequest")}
                  </Typography>
                  {tab == 2 && (
                    <button className="icon-btn" onClick={handleOpen}>
                      <img src={Index.Plusadd} alt={t("Add")} />
                    </button>
                  )}
                </Box>
                {tab == 1 && (
                  <List className="list-ul-address">
                    {receivedData.length > 0 ? (
                      receivedData.map((item, index) => (
                        <ListItem key={index} className="list-item-address">
                          <Box
                            className={`flex-justify-gap-add ${item?.status !== "pending" ? "custom-align" : ""
                              }`}
                          >
                            <Box className="address-left-contain">
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("RequestBy")} :
                                </Typography>
                                <Typography className="field-contain-address">
                                  {item?.merchantName}
                                </Typography>
                              </Box>
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("Amount")} :
                                </Typography>
                                <Typography className="field-contain-address">
                                  {item?.amount}
                                </Typography>
                              </Box>
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("Description")} :
                                </Typography>
                                <Typography className="field-contain-address">
                                  {item?.description}
                                </Typography>
                              </Box>
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("Status")} :
                                </Typography>
                                <Typography className="field-contain-address custom-field-contain-status">
                                  {item?.status}
                                </Typography>
                              </Box>
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("Date")} :
                                </Typography>
                                <Typography className="field-contain-address custom-field-contain-status">
                                  {Index.moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
                                </Typography>
                              </Box>
                            </Box>
                            <Box className=" request-payment-pay-btn-box">
                              <button
                                className={`${item?.status === "pending"
                                  ? "request-payment-pay-btn request-payment-pay-pending-btn"
                                  : "request-payment-pay-btn request-payment-pay-success-btn"
                                  }`}
                                onClick={() => handleSubmitPin(item)}
                                disabled={item?.status == "pending" ? false : true}
                              >
                                {item?.status == "pending" ? t("Pay") : t("Paid")}
                              </button>
                            </Box>
                          </Box>
                        </ListItem>
                      ))
                    ) : (
                      <Index.NoDataFound message={t("No Request Found")} />
                    )}
                  </List>
                )}

                {tab == 2 && (
                  <List className="list-ul-address">
                    {requestData.length > 0 ? (
                      requestData.map((item, index) => (
                        <ListItem key={index} className="list-item-address">
                          <Box className="flex-justify-gap-add">
                            <Box className="address-left-contain">
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("Username")} :
                                </Typography>
                                <Typography className="field-contain-address">
                                  {item?.userName}
                                </Typography>
                              </Box>
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("Amount")} :
                                </Typography>
                                <Typography className="field-contain-address">
                                  {item?.amount}
                                </Typography>
                              </Box>
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("Description")} :
                                </Typography>
                                <Typography className="field-contain-address">
                                  {item?.description}
                                </Typography>
                              </Box>
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("Status")} :
                                </Typography>
                                <Typography className="field-contain-address custom-field-contain-status">
                                  {item?.status}
                                </Typography>
                              </Box>
                              <Box className="list-field-show">
                                <Typography className="label-contain-address">
                                  {t("Date")} :
                                </Typography>
                                <Typography className="field-contain-address custom-field-contain-status">
                                  {Index.moment(item?.createdAt).format("DD/MM/YYYY hh:mm A")}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                      ))
                    ) : (
                      <Index.NoDataFound message={t("No Request Found")} />
                    )}
                  </List>
                )}
              </Box>


              {/* Add/Edit Modal */}
              <Modal open={open} onClose={handleClose} className="address-modal">
                <Box sx={modalStyle} className="common-style-modal address-style">
                  <Box className="modal-header-common address-modal-header">
                    <Typography className="add-title">
                      {id
                        ? `${t("Edit")} ${t("PaymentRequest")}`
                        : `${t("Add")} ${t("PaymentRequest")}`}
                    </Typography>
                    <button className="btn-close" onClick={handleClose}></button>
                  </Box>
                  <Index.Formik
                    initialValues={{
                      userName: "",
                      amount: "",
                      description: "",
                    }}
                    validationSchema={Yup.object({
                      userName: Yup.string().required(
                        `${t("Username")} ${t("IsRequired")}`
                      ),
                      amount: Yup.string().required(
                        `${t("Amount")} ${t("IsRequired")}`
                      ),
                      description: Yup.string().required(
                        `${t("Description")} ${t("IsRequired")}`
                      ),
                    })}
                    onSubmit={handleSubmit}
                  >
                    {(formik) => (
                      <form onSubmit={formik.handleSubmit}>
                        <Box className="modal-body address-body">
                          <Box className="grid-row">
                            <div className="input-box">
                              <p className="user-form-lable">
                                {t("Username")}
                              </p>
                              <div className="user-form-group">
                                <input
                                  type="text"
                                  className="user-form-control"
                                  placeholder={t("EnterUserName")}
                                  name="userName"
                                  value={formik.values.userName}
                                  onChange={(e) => {
                                    const noSpaces = e.target.value.replace(
                                      /\s/g,
                                      ""
                                    );
                                    formik.setFieldValue("userName", noSpaces);
                                  }}
                                  onBlur={formik.handleBlur}
                                  maxLength={64}
                                />
                              </div>
                              <p className="input-error">
                                {formik.errors.userName && formik.touched.userName
                                  ? formik.errors.userName
                                  : null}
                              </p>
                            </div>
                            <div className="input-box">
                              <p className="user-form-lable">
                                {t("Amount")}
                              </p>
                              <div className="user-form-group">
                                <input
                                  type="text"
                                  className="user-form-control"
                                  placeholder={t("EnterAmount")}
                                  name="amount"
                                  value={formik.values.amount}
                                  onChange={(e) => {
                                    const value = e?.target?.value;
                                    if (/^\d*\.?\d*$/.test(value)) {
                                      formik.setFieldValue("amount", value);
                                    }
                                  }}
                                  onBlur={formik.handleBlur}
                                  maxLength={12}
                                />
                                <p className="input-error">
                                  {formik.errors.amount && formik.touched.amount
                                    ? formik.errors.amount
                                    : null}
                                </p>
                              </div>
                            </div>
                            <div className="input-box">
                              <p className="user-form-lable">
                                {t("Description")}
                              </p>
                              <div className="user-form-group">
                                <input
                                  type="text"
                                  className="user-form-control"
                                  placeholder={t("EnterDescription")}
                                  name="description"
                                  value={formik.values.description}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  maxLength={164}
                                />
                                <p className="input-error">
                                  {formik.errors.description &&
                                    formik.touched.description
                                    ? formik.errors.description
                                    : null}
                                </p>
                              </div>
                            </div>
                          </Box>
                          <Box className="modal-footer">
                            <Box className="footer-address-center">
                              <button
                                className="common-btn"
                                type="submit"
                                disabled={buttonLoader}
                              >
                                {buttonLoader ? (
                                  <CircularProgress size={20} />
                                ) : (
                                  t("Submit")
                                )}
                              </button>
                            </Box>
                          </Box>
                        </Box>
                      </form>
                    )}
                  </Index.Formik>
                </Box>
              </Modal>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PaymentRequest;
