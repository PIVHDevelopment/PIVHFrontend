import React, { useRef, useState } from "react";
import Index from "../Index";

function Deposit() {
  const { t } = Index.useTranslation();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  const typeTxn = location?.state?.typeTxn;
  const [buttonLoader, setButtonLoader] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleSubmitFunction = async (values) => {
    setButtonLoader(true);
    if (typeTxn == "business") {
      try {
        const bodyData = {
          uid: userData?.uid,
          amount: values?.amount,
          paymentType: "received",
          type: "Deposit",
        };
        const res = await Index.DataService.post(
          Index.Api.BUSINESS_DEPOSITE,
          bodyData
        );
        if (res?.data?.status === 200) {
          // Index.toasterSuccess(res?.data?.message);
          navigate("/transaction-success", {
            state: { isBusiness: typeTxn == "business" ? true : false },
          });
        } else {
          Index.toasterError(res?.data?.message || t("SomethingWrong"));
        }
      } catch (error) {
        Index.toasterError(
          error?.response?.data?.message || t("AnUnexpectedErrorOccurred")
        );
      }
      setButtonLoader(false);
    } else {
      const paymentData = {
        amount: values?.amount,
        memo: "deposit",
        typeTxn,
        metadata: {
          userName: userData?.userName,
          uid: userData?.uid,
          type: "Deposit",
        },
      };
      const callbacks = {
        onReadyForServerApproval,
        onReadyForServerCompletion,
        onCancel,
        onError,
      };
      await window.Pi.createPayment(paymentData, callbacks);
    }
  };
  const onReadyForServerApproval = (paymentId) => {
    Index.DataService.post(Index.Api.PAYMENT_DEPOSITE, {
      amount,
      paymentId,
    }).then(() => {}).catch((res)=>{
      setButtonLoader(false);
      navigate("/home");
    });
  };
  const onReadyForServerCompletion = (paymentId, txid) => {
    Index.DataService.post(Index.Api.PAYMENT_DEPOSITE_COMPLETE, {
      paymentId,
      txid,
    }).then((res) => {
      if (res?.data?.status) {
        sessionStorage.setItem(
          "pi_user_data",
          JSON.stringify(res?.data?.data?.user)
        );
        navigate("/transaction-success", {
          state: { isBusiness: typeTxn == "business" ? true : false },
        });
        setButtonLoader(false);
      }
    }).catch((res)=>{
      setButtonLoader(false);
      navigate("/home");
    });
  };

  const onCancel = (paymentId) => {
    setButtonLoader(false);
    navigate("/home");
    console.log("onCancel", paymentId);
    return Index.DataService.post(Index.Api.PAYMENT_DEPOSITE_CANCEL, {
      paymentId,
    });
  };

  const onError = (error, payment) => {
    setButtonLoader(false);
    navigate("/home");
    console.log("onError", error);
    if (payment) {
      // handle the error accordingly
    }
  };

  return (
    <>
      {buttonLoader ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
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
            initialValues={{
              amount: "",
            }}
            onSubmit={handleSubmitFunction}
            validationSchema={Index.depositPiFormSchema(t)}
            innerRef={formRef}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="send-form">
                <div className="input-group">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      inputMode="numeric" 
                      className="notes-input"
                      placeholder={t("EnterAmount")}
                      name="amount"
                      value={formik.values.amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Only allow digits
                        if (/^\d*\.?\d{0,6}$/.test(value)) {
                          formik.setFieldValue("amount", value);
                          setAmount(value);
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
                <div className="amount-section">
                  <label>{t("EnterPiAmount")}</label>
                  <div className="amount-display">
                    {formik.values.amount || "0"} Pi
                  </div>
                </div>

                <button
                  className="common-btn"
                  type="submit"
                  disabled={buttonLoader}
                >
                  {/* {buttonLoader ? "Processing..." : "Deposit"} */}
                  {t("Deposit")}
                </button>
              </form>
            )}
          </Index.Formik>
        </div>
      )}
    </>
  );
}

export default Deposit;
