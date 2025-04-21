import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";
import { Autocomplete, TextField } from "@mui/material";

function Send() {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();
  const [tab, setTab] = useState(1);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const handleSubmitFunction = async (values) => {
    const paymentData = {
      amount: values?.amount,
      memo: values?.memo,
      metadata: {
        userName: values?.userName,
        uid: userData?.uid,
        type: "Send",
      },
    };
    Index.DataService.post(Index.Api.PAYMENT_SEND, paymentData).then((res) => {
      if (res?.data?.status) {
        navigate("/home");
      }
    });
  };

  const getUsers = async () => {
    Index.DataService.get(Index.Api.GET_USERS).then((res) => {
      if (res?.data?.status) {
        setUsers(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log("user", users);

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
      {/* 
      <Index.TabContainer
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
          userName: text,
          amount: "",
          memo: "",
        }}
        onSubmit={handleSubmitFunction}
        validationSchema={Index.sendPiFormSchema}
        innerRef={formRef}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="send-form">
            <div className="input-group">
              <div className="input-wrapper send-input-box">
                <Autocomplete
                  id="userName"
                  className="notes-input-box"
                  options={users}
                  getOptionLabel={(option) => option.userName}
                  value={
                    users.find(
                      (user) => user.userName === formik.values.userName
                    ) || null
                  }
                  onChange={(e, selectedUser) => {
                    formik.setFieldValue(
                      "userName",
                      selectedUser?.userName || ""
                    );
                  }}
                
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="userName"
                      className="notes-input"
                      placeholder={
                        formik?.values?.userName
                          ? ""
                          : "Select User"
                      }
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  )}
                />

                {/* <button
                  className="paste-btn"
                  onClick={async () => {
                    const res = await navigator.clipboard.readText();
                    setText(res);
                  }}
                >
                  Paste
                </button> */}
              </div>
              <div>
                {formik.errors?.userName && formik.touched?.userName
                  ? formik.errors?.userName
                  : null}
              </div>
              {/* <button className="address-book-link">
                Select from Address Book
              </button> */}
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
                <div></div>
              </div>
              {formik.errors?.memo && formik.touched?.memo
                ? formik.errors?.memo
                : null}
            </div>

            <div className="amount-section">
              <label>Enter Pi Amount</label>
              <div className="amount-display">
                {formik.values.amount || "0"} Pi
              </div>
            </div>

            <button className="action-btn full-width send-pi-btn" type="submit">
              Send Pi
            </button>
          </form>
        )}
      </Index.Formik>
    </div>
  );
}

export default Send;
