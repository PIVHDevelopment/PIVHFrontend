import React, { useRef, useState } from "react";
import Index from "../Index";

function Deposit() {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();
  const [tab, setTab] = useState(1);
  const handleSubmitFunction = async (values) => {
    const paymentData = {
      amount: values?.amount,
      memo: "deposit",
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
  };
  const onReadyForServerApproval = (paymentId) => {
    Index.DataService.post(Index.Api.PAYMENT_DEPOSITE, {
      ...formRef?.current?.values,
      paymentId,
    }).then(() => {});
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
        navigate("/home");
      }
    });
  };

  const onCancel = (paymentId) => {
    console.log("onCancel", paymentId);
    return Index.DataService.post(Index.Api.PAYMENT_DEPOSITE_CANCEL, {
      paymentId,
    });
  };

  const onError = (error, payment) => {
    console.log("onError", error);
    if (payment) {
      console.log(payment);
      // handle the error accordingly
    }
  };
  return (
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

      {/* <Index.TabContainer
        id="left-tabs-example"
        defaultActiveKey="individual"
        activeKey={tab}
      >
        <div className="wallet-tabs" style={{ width: "100%" }}>
          <button
            className={`tab-btn${tab === 1 ? " active" : ""}`}
            data-tab="individual"
            onClick={() => setTab(1)}
          >
            Waller Address
          </button>
          <button
            className={`tab-btn${tab === 2 ? " active" : ""}`}
            data-tab="business"
            onClick={() => setTab(2)}
          >
            Scan QR
          </button>
        </div>
        <Index.TabContent>
          <Index.TabPane eventKey={1}></Index.TabPane>
          <Index.TabPane eventKey={2}></Index.TabPane>
        </Index.TabContent>
      </Index.TabContainer> */}
      <Index.Formik
        initialValues={{
          amount: "",
        }}
        onSubmit={handleSubmitFunction}
        validationSchema={Index.depositPiFormSchema}
        innerRef={formRef}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="send-form">
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  inputMode="numeric" // shows numeric keyboard on mobile
                  className="notes-input"
                  placeholder="Enter Amount"
                  name="amount"
                  value={formik.values.amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow digits
                    if (/^\d*\.?\d{0,6}$/.test(value)) {
                      formik.setFieldValue("amount", value);
                    }
                  }}
                />
              </div>
              <div>
                {formik.errors?.amount && formik.touched?.amount
                  ? formik.errors?.amount
                  : null}
              </div>
            </div>
            <div className="amount-section">
              <label>Enter Pi Amount</label>
              <div className="amount-display">
                {formik.values.amount || "0"} Pi
              </div>
            </div>

            <button className="action-btn full-width send-pi-btn" type="submit">
              Deposit
            </button>
          </form>
        )}
      </Index.Formik>
    </div>
  );
}

export default Deposit;
