import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";
import { Autocomplete, Box, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import VerificationPin from "../verificationPin/VerificationPin";
import QrScanner from './QrScanner';  // Import the QR scanner component
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 30px)",
  maxWidth: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
};

function Send() {
  const [buttonLoader, setButtonLoader] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  // const [scannerResult,setScannerResult]=useState("")
  const [nextPage, setNextPage] = useState(false);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [txnData, setTxnData] = useState({});
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const location = Index.useLocation();
    let scannerResult = location?.state?.scannerResult;
    console.log({scannerResult});
  const [formValues, setFormValues] = useState({
    userName: scannerResult || "",
    amount: "",
    memo: "",
  });

  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();

  const balance = location?.state?.balance;
  let typeTxn = location?.state?.typeTxn;
 

  // const onNewScanResult = (decodedText) => {
  //   setOpen(false);
  //   setScannerResult(decodedText);
  // };

  const scannerComponentRef = useRef();

const handleClose = () => {
  if (scannerComponentRef.current) {
    scannerComponentRef.current.stopScanner(); 
  }
  setOpen(false);
};

  

  useEffect(() => {
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

  const handleSubmit = (values) => {
    setFormValues(values);
    setTxnData(values);
    setNextPage(true);
  };

  console.log({scannerResult});
  
  

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
                          getOptionLabel={(option) => option.userName}
                          value={
                            users.find(
                              (user) =>  user.userName === scannerResult || user.userName === formik.values.userName
                          ) || null
                          }
                          open={userDropDown}
                          onClose={() => setUserDropDown(false)}
                          onInputChange={(event, newInputValue, reason) => {
                            if (reason === "input") {
                              setUserDropDown(true);
                            }
                          }}
                          onChange={(e, selectedUser) => {
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
                        <div className="scanner-icon" onClick={() => navigate("/qr-scanner")}>
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

{/* <Modal
  className="address-modal common-modall"
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <QrScanner
      ref={scannerComponentRef}
      fps={10}
      qrCodeSuccessCallback={(decodedText, decodedResult) => onNewScanResult(decodedText)}
      qrCodeErrorCallback={(error) => console.log(error)}
    />
  </Box>
</Modal> */}


    </>
  );
}

export default Send;
