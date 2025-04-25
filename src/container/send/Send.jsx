import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import VerificationPin from "../verificationPin/VerificationPin";
import { QrReader } from 'react-qr-reader';

function Send() {
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [scannedValue, setScannedValue] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [txnData, setTxnData] = useState({});
  const [formValues, setFormValues] = useState({
    userName: "",
    amount: "",
    memo: "",
  });

  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  const balance = location?.state?.balance;
  let typeTxn = location?.state?.typeTxn;

  useEffect(() => {
    // Fetch users
    const getUsers = async () => {
      try {
        const res = await Index.DataService.get(Index.Api.GET_USERS);
        if (res?.data?.status) {
          let filteredUsers = res?.data?.data?.filter(
            (item) => item?.uid !== userData?.uid
          );
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
        navigate("/home", {
          state: { isBusiness: typeTxn == "business" ? true : false },
        });
      } else {
        Index.toasterError(res?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      Index.toasterError(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setButtonLoader(false);
    }
  };

  const getUsers = async () => {
    Index.DataService.get(
      `${Index.Api.GET_USERS}?uid=${userData?.uid}&typeTxn=${typeTxn}`
    ).then((res) => {
      if (res?.data?.status) {
        console.log(res?.data?.data, "res");
        // let filteredUsers = res?.data?.data?.filter(
        //   (item) => item?.uid !== userData?.uid
        // );
        setUsers(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log("user", users);

  const handleSubmit = (values) => {
    setFormValues(values);
    setTxnData(values);
    setNextPage(true);
  };

    const checkCameraAvailability = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const camera = devices.find(device => device.kind === 'videoinput');
        if (!camera) {
          console.error('No camera found');
          Index.toasterError("No camera found on your device.");
        }else{
       setQrScannerOpen(true)
        }
      } catch (error) {
        console.error("Error checking camera availability:", error);
      }

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
                <button className="back-btn" onClick={() => navigate(-1)}>
                  <img src={Index.back} alt="Back" />
                </button>
                <div className="app-icon" style={{ marginLeft: "-26px" }}>
                  <img src={Index.pocketPi} alt="PocketPi" />
                </div>
                <div className="header-right"></div>
              </header>
              <Index.Formik
                enableReinitialize
                initialValues={formValues || { userName: text, amount: "", memo: "" }}
                onSubmit={handleSubmit}
                validationSchema={Index.sendPiFormSchema}
                innerRef={formRef}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit} className="send-form">
                    <div className="input-group">
                      <div className="input-wrapper send-input-box receiver-addres-scanner-box">
                        <Autocomplete
                          id="userName"
                          className="notes-input-box"
                          options={users}
                          // getOptionLabel={(option) =>
                          //   typeTxn == "business"
                          //     ? option.businessUserName
                          //     : option.userName
                          // }
                          getOptionLabel={(option) => option.userName}
                          // value={
                          //   users.find(
                          //     (user) =>
                          //       user.userName === formik.values.userName ||
                          //       user.businessUserName === formik.values.userName
                          //   ) || null
                          // }
                          value={
                            users.find(
                              (user) => user.userName === formik.values.userName
                            ) || null
                          }
                          open={userDropDown}
                          // onOpen={() => setUserDropDown(true)}
                          onClose={() => setUserDropDown(false)}
                          onInputChange={(event, newInputValue, reason) => {
                            if (reason === "input") {
                              setUserDropDown(true);
                            }
                          }}
                          onChange={(e, selectedUser) => {
                            // formik.setFieldValue(
                            //   "userName",
                            //   typeTxn == "business"
                            //     ? selectedUser?.businessUserName
                            //     : selectedUser?.userName || ""
                            // );
                            formik.setFieldValue(
                              "userName",
                              selectedUser?.userName
                            );
                          }}
                          onBlur={formik.handleBlur}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="userName"
                              className="notes-input"
                              placeholder={
                                formik?.values?.userName ? "" : "Select User"
                              }
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          )}
                        />
                        <div className="scanner-icon">
                          <img src={Index.scannerIcon} alt="scanner" />
                        </div>
                      </div>
                      <div className="input-error">
                        {formik.errors?.userName && formik.touched?.userName
                          ? formik.errors?.userName
                          : null}
                      </div>
                    </div>

                    <div className="input-group">
                      <div className="input-wrapper">
                        <input
                          type="text"
                          className="notes-input"
                          placeholder="Enter Amount"
                          name="amount"
                          value={formik.values.amount}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*\.?\d{0,6}$/.test(value)) {
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
                          placeholder="Enter Memo"
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
                      <label>Enter Pi Amount</label>
                      <div className="amount-display">
                        {formik.values.amount || "0"} Pi
                      </div>
                    </div>

                    <button
                      className="action-btn full-width send-pi-btn"
                      type="submit"
                      disabled={buttonLoader}
                    >
                      Send Pi
                    </button>
                  </form>
                )}
              </Index.Formik>
            </>
          )}
        </div>
      )}

      {qrScannerOpen && (
        <div className="qr-scanner-popup">
          <button className="close-btn" onClick={() => setQrScannerOpen(false)}>
            Close
          </button>
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              if (!!result) {
                const data = result?.text;
                setQrScannerOpen(false);
                setScannedValue(data);

                const matchedUser = users.find(
                  (user) =>
                    user.userName === data || user.businessUserName === data
                );

                if (matchedUser) {
                  const matchedName =
                    typeTxn === "business"
                      ? matchedUser.businessUserName
                      : matchedUser.userName;
                  formRef.current.setFieldValue("userName", matchedName);
                  setText(matchedName);
                } else {
                  Index.toasterError("No matching user found for scanned QR.");
                }
              }

              if (!!error) {
                console.error("QR Error", error);
              }
            }}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </>
  );
}

export default Send;