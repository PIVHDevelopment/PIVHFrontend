import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import VerificationPin from "../verificationPin/VerificationPin";

function Send() {
  const { t } = Index.useTranslation();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const [checkUser, setCheckUser] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);

  console.log({ users });

  const [txnData, setTxnData] = useState({});

  const location = Index.useLocation();
  const type = location?.state?.typeTxn;
  let scannerResult = location?.state?.scannerResult;
  console.log({ scannerResult });
  const [formValues, setFormValues] = useState({
    userName: "",
    amount: "",
    memo: "",
  });
  console.log({ type });

  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();

  const balance = location?.state?.balance;
  let typeTxn = location?.state?.typeTxn;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const capitalizedType = type?.charAt(0)?.toUpperCase() + type?.slice(1);
        const res = await Index.DataService.get(
          Index.Api.GET_ADDRESS + "/" + userData?._id + "/" + capitalizedType
        );
        const resAllData = await Index.DataService.get(Index.Api.GET_USERS);

        const checkUsers = resAllData?.data?.data;
        if (res?.data?.status && Array.isArray(res?.data?.data)) {
          const rawUsers = res?.data?.data;
          const filteredUsers = rawUsers.filter((user) => {
            const match = checkUsers.find(
              (cu) => cu.userName === user.userName
            );
            return !(match && match.isBlocked);
          });
          setCheckUser(checkUsers);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    getUsers();
  }, []);

  const handleSubmitFunction = async (values) => {
    const pin = values.pinFields.join("");
    setButtonLoader(true);
    const paymentData = {
      amount: txnData?.amount,
      memo: txnData?.memo,
      pin,
      typeTxn,
      metadata: {
        userName: txnData?.userName,
        uid: userData?.uid,
        type: "Send",
      },
    };

    try {
      const res = await Index.DataService.post(
        Index.Api.PAYMENT_SEND,
        paymentData
      );
      if (res?.data?.status) {
        Index.toasterSuccess(res?.data?.message);
        navigate("/transaction-success", {
          state: { isBusiness: type == "business" ? true : false },
        });
      } else {
        Index.toasterError(res?.data?.message || t("SomethingWrong"));
      }
    } catch (error) {
      Index.toasterError(
        error?.response?.data?.message || t("AnUnexpectedErrorOccurred")
      );
    } finally {
      setButtonLoader(false);
    }
  };

  const handleSubmit = (values) => {
    const result = checkUser?.find(
      (user) => user.userName === values?.userName
    );
    if (!result) {
      Index.toasterError(t("UserNotExist"));
      return false;
    }
    setFormValues(values);
    setTxnData(values);
    setNextPage(true);
  };

  return (
    <>
      {buttonLoader ? (
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
                      state: { isBusiness: type == "business" ? true : false },
                    })
                  }
                >
                  <img src={Index.back} alt="Back" />
                </button>
                <div className="app-icon" style={{ marginLeft: "-26px" }}>
                  <img src={Index.pocketPi} alt={t("PocketPi")} />
                </div>
                <div className="header-right"></div>
              </header>
              <Index.Formik
                enableReinitialize
                initialValues={
                  formValues || { userName: text, amount: "", memo: "" }
                }
                onSubmit={handleSubmit}
                validationSchema={Index.sendPiFormSchema(t)}
                innerRef={formRef}
              >
                {(formik) => {
                  useEffect(() => {
                    if (scannerResult && !formik.values.userName) {
                      formik.setFieldValue("userName", scannerResult);
                      setInputValue(scannerResult);
                    }
                  }, [scannerResult]);

                  return (
                    <form onSubmit={formik.handleSubmit} className="send-form">
                      <div className="input-group">
                        <div className="input-wrapper send-input-box receiver-addres-scanner-box">
                          <Autocomplete
                            id="userName"
                            className="notes-input-box"
                            freeSolo
                            options={users}
                            getOptionLabel={(option) =>
                              typeof option === "string"
                                ? option
                                : option?.type
                                ? `${option.userName} (${option.type})`
                                : option.userName
                            }
                            inputValue={inputValue}
                            value={
                              users.find(
                                (user) =>
                                  user.userName === formik.values.userName
                              ) ||
                              (Array.isArray(checkUser) &&
                                checkUser.find(
                                  (user) =>
                                    user.userName === formik.values.userName
                                )) ||
                              null
                            }
                            open={userDropDown}
                            onClose={() => setUserDropDown(false)}
                            onInputChange={(event, newInputValue, reason) => {
                              if (reason === "input") {
                                setInputValue(newInputValue);
                                formik.setFieldValue("userName", newInputValue);
                                setUserDropDown(true);
                              }
                            }}
                            onChange={(e, selectedUser) => {
                              const name = selectedUser?.userName || "";
                              formik.setFieldValue("userName", name);
                              setInputValue(name); // just show username in input box
                              setUserDropDown(false);
                            }}
                            onBlur={formik.handleBlur}
                            filterOptions={(options, state) =>
                              options.filter((option) =>
                                option.userName
                                  ?.toLowerCase()
                                  ?.startsWith(state.inputValue.toLowerCase())
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="userName"
                                className="notes-input"
                                placeholder={
                                  formik?.values?.userName ? "" : t("EnterUserName")
                                }
                                variant="outlined"
                                size="small"
                                fullWidth
                              />
                            )}
                          />

                          <div
                            className="scanner-icon"
                            onClick={() =>
                              navigate("/qr-scanner", {
                                state: { typeTxn: type },
                              })
                            }
                          >
                            <img src={Index.scannerIcon} alt="scanner" />
                          </div>
                        </div>
                        <div className="input-error">
                          {formik.errors?.userName && formik.touched?.userName
                            ? formik.errors?.userName
                            : null}
                        </div>
                      </div>

                      {/* Other fields for Amount and Memo */}
                      <div className="input-group">
                        <div className="input-wrapper">
                          <input
                            type="text"
                            className="notes-input"
                            placeholder={t("EnterAmount")}
                            name="amount"
                            value={formik.values.amount}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*\.?\d{0,5}$/.test(value)) {
                                if (parseFloat(value) > parseFloat(balance)) {
                                  formik.setFieldValue("amount", balance);
                                } else {
                                  formik.setFieldValue("amount", value);
                                }
                              }
                            }}
                          />
                        </div>
                        <div className="input-error">
                          {formik.errors?.amount && formik.touched?.amount
                            ? formik.errors?.amount
                            : null}
                        </div>
                      </div>

                      <div className="input-group">
                        <div className="input-wrapper">
                          <input
                            type="text"
                            className="notes-input"
                            placeholder={t("EnterMemo")}
                            name="memo"
                            value={formik.values.memo}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="input-error">
                          {formik.errors?.memo && formik.touched?.memo
                            ? formik.errors?.memo
                            : null}
                        </div>
                      </div>

                      <div className="amount-section">
                        <label>{t("EnterPiAmount")}</label>
                        <div className="amount-display">
                          {formik.values.amount || "0"} {t("Pi")}
                        </div>
                      </div>

                      <button
                        className="action-btn full-width send-pi-btn"
                        type="submit"
                        disabled={buttonLoader}
                      >
                        {t("SendPi")}
                      </button>
                    </form>
                  );
                }}
              </Index.Formik>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Send;
