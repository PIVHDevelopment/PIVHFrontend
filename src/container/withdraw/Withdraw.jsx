import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

function Withdraw() {
  const [buttonLoader, setButtonLoader] = useState(false);
  const [balance, setBalance] = useState("0");
  const [wallets, setWallets] = useState([]);
  const [businessBalance, setBusinessBalance] = useState("0");
  const [open, setOpen] = useState(false);
  const location = Index.useLocation();
  const typeTxn = location?.state?.typeTxn;
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();
  const [tab, setTab] = useState(1);
  console.log({ wallets });

  const getWallets = async () => {
    try {
      const capitalizedType =
        typeTxn?.charAt(0)?.toUpperCase() + typeTxn?.slice(1);
      const res = await Index.DataService.get(
        `${Index.Api.GET_WALLET_ADDRESS}/${userData?._id}/${capitalizedType}`
      );
      if (res?.data?.status) {
        setWallets(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitFunction = async (values) => {
    try {
      setButtonLoader(true);

      const paymentData = {
        uid: userData?.uid,
        amount: values?.amount,
        address: values?.address,
        userName: userData?.userName,
        typeTxn,
      };

      const res = await Index.DataService.post(Index.Api.WITHDRAW, paymentData);
      setButtonLoader(false);
      if (res?.data?.status === 200) {
        Index.toasterSuccess(res?.data?.message);
        navigate("/transaction-success", {
          state: { isBusiness: typeTxn == "business" ? true : false },
        });
      } else {
        Index.toasterError(res?.data?.message);
        setButtonLoader(false);
      }
    } catch (error) {
      // console.log("error", error?.response?.data?.message)
      Index.toasterError(error?.response?.data?.message);
      setButtonLoader(false);
    } finally {
      setButtonLoader(false);
    }
  };

  // const onReadyForServerApproval = (paymentId) => {
  //   Index.DataService.post(Index.Api.PAYMENT_DEPOSITE, {
  //     ...formRef?.current?.values,
  //     paymentId,
  //   }).then(() => {});
  // };
  // const onReadyForServerCompletion = (paymentId, txid) => {
  //   Index.DataService.post(Index.Api.PAYMENT_DEPOSITE_COMPLETE, {
  //     paymentId,
  //     txid,
  //   }).then((res) => {
  //     if (res?.data?.status) {
  //       sessionStorage.setItem(
  //         "pi_user_data",
  //         JSON.stringify(res?.data?.data?.user)
  //       );
  //       navigate("/home");
  //     }
  //   });
  // };

  // const onCancel = (paymentId) => {
  //   console.log("onCancel", paymentId);
  //   return Index.DataService.post(Index.Api.PAYMENT_DEPOSITE_CANCEL, {
  //     paymentId,
  //   });
  // };

  // const onError = (error, payment) => {
  //   console.log("onError", error);
  //   if (payment) {
  //     console.log(payment);
  //     // handle the error accordingly
  //   }
  // };

  const handleGetTransactions = () => {
    Index.DataService.get(
      Index.Api.GET_TRANSACTIONS + "/" + userData?.uid
    ).then((res) => {
      setBalance(res?.data?.data?.balance);
      setBusinessBalance(res?.data?.data?.businessBalance);
    });
  };

  useEffect(() => {
    handleGetTransactions();
    getWallets();
  }, []);

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
                  state: { isBusiness: typeTxn == "business" ? true : false },
                })
              }
            >
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
              address: "",
            }}
            onSubmit={handleSubmitFunction}
            validationSchema={Index.withdrawPiFormSchema}
            innerRef={formRef}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="send-form">
                <div className="input-group">
                  {console.log("onCancel", formik.errors)}
                  <div className="amount-section">
                    <label>Available Balance</label>
                    <div className="amount-display">
                      {parseFloat(
                        typeTxn == "business" ? businessBalance : balance
                      ).toFixed(5)}{" "}
                      Pi
                    </div>
                  </div>
                  <div className="withdraw-form">
                    <div className="input-mb-space">
                      <div className="input-wrapper">
                        <input
                          type="text"
                          inputMode="numeric"
                          className="notes-input"
                          placeholder="Enter Amount"
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
                    <div className="input-mb-space">
                      <div className="input-wrapper">
                        <Autocomplete
                          freeSolo
                          slotProps={{
                            popper: {
                              modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
                              className: 'custom-dropdown-withdrow',
                            },
                          }}
                          className="notes-input-box custom-notes-input-box"
                          options={wallets?.map((item) => item?.walletAddress) || []}
                          value={formik?.values?.address || ""}
                          open={open}
                          onChange={(event, newValue) => {
                            formik.setFieldValue("address", newValue);
                            setOpen(false);
                          }}
                          onInputChange={(event, newInputValue, reason) => {
                            if (reason !== "reset") {
                              formik.setFieldValue("address", newInputValue);
                              setOpen(newInputValue?.trim() !== "");
                            }
                          }}
                          onBlur={() => setOpen(false)}
                          onFocus={(e) => {
                            if (!formik?.values?.address) setOpen(false);
                          }}
                          filterOptions={(options, state) => {
                            const input = state?.inputValue?.toLowerCase();
                            if (!input) return [];
                            return options?.filter((option) =>
                              option?.toLowerCase()?.startsWith(input)
                            );
                          }}
                          
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              className="notes-input"
                              placeholder={
                                formik?.values?.address
                                  ? ""
                                  : "Enter Wallet Address"
                              }
                              variant="outlined"
                              fullWidth
                             
                            
                            />
                          )}
                        />
                        

                        {/* <input
                            type="text"
                            inputMode="numeric"
                            className="notes-input"
                            placeholder="Enter Wallet Address"
                            name="address"
                            value={formik.values.address}
                            onChange={(e) => {
                              const value = e.target.value;
                              formik.setFieldValue("address", value);
                            }}
                          /> */}
                      </div>
                      <div className="input-error">
                        {formik.errors?.address && formik.touched?.address
                          ? formik.errors?.address
                          : null}
                      </div>
                      {formik.values.amount >= 0.01 ? (
                        <label className="text-color deduction-message">
                          0.01 will be deducted as transaction fees
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                {/* <button
                className="action-btn full-width send-pi-btn"
                type="submit"
                disabled={buttonLoader}
              >
                Withdraw
              </button> */}
                <button
                  className="action-btn full-width send-pi-btn"
                  type="submit"
                  disabled={buttonLoader}
                >
                  {buttonLoader ? "Processing..." : "Withdraw"}
                </button>
              </form>
            )}
          </Index.Formik>
        </div>
      )}
    </>
  );
}

export default Withdraw;
