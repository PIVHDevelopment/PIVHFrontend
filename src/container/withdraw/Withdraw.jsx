import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";
import { CircularProgress } from "@mui/material";
import VerificationPin from "../verificationPin/VerificationPin";
import { Autocomplete, TextField } from "@mui/material";

function Withdraw() {
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
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
  const [nextPage, setNextPage] = useState(false);
  const [txnData, setTxnData] = useState({});

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
      const pin = values.pinFields.join("");
      setButtonLoader(true);
      const paymentData = {
        pin,
        uid: userData?.uid,
        amount: txnData?.amount,
        address: txnData?.address,
        userName: userData?.userName,
        typeTxn,
      };

      const res = await Index.DataService.post(Index.Api.WITHDRAW, paymentData);
      setButtonLoader(false);
      if (res?.data?.status === 200) {
        setTxnData({});
        // Index.toasterSuccess(res?.data?.message?.[language]);
        navigate("/transaction-success", {
          state: { isBusiness: typeTxn == "business" ? true : false },
        });
      } else {
        Index.toasterError(res?.data?.message?.[language]);
        setButtonLoader(false);
      }
    } catch (error) {
      Index.toasterError(error?.response?.data?.message?.[language]);
      setButtonLoader(false);
    } finally {
      setButtonLoader(false);
    }
  };

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

  const handleSubmit = (values) => {
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
                      state: { isBusiness: typeTxn == "business" ? true : false },
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

              <Index.Formik
                initialValues={{
                  amount: txnData?.amount || "",
                  address: txnData?.address || "",
                }}
                onSubmit={handleSubmit}
                validationSchema={Index.withdrawPiFormSchema(t)}
                innerRef={formRef}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <>
                      {console.log("onCancel", formik.errors)}
                      <div className="amount-section">
                        <label>{t("AvailableBalance")}</label>
                        <p className="amount-display">
                          {parseFloat(
                            typeTxn == "business" ? businessBalance : balance
                          ).toFixed(5)}{" "}
                          Pi
                        </p>
                      </div>
                      <div className="input-box">
                        <div className="user-form-group">
                          <input
                            type="text"
                            inputMode="numeric"
                            className="user-form-control"
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
                      <div className="input-box">
                        <div className="user-form-group">
                          <Autocomplete
                            freeSolo
                            slotProps={{
                              popper: {
                                modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
                                className: 'custom-dropdown-withdrow',
                              },
                            }}
                            className="user-form-control"
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
                                    : t("EnterWalletAddress")
                                }
                                variant="outlined"
                                fullWidth


                              />
                            )}
                          />
                        </div>
                        <div className="input-error">
                          {formik.errors?.address && formik.touched?.address
                            ? formik.errors?.address
                            : null}
                        </div>
                        {formik.values.amount >= 0.01 ? (
                          <label className="text-color deduction-message">
                            0.01 {t("DeductFees")}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                    <div className="common-btn-space-main">
                    <button
                      className="common-btn"
                      type="submit"
                      disabled={buttonLoader}
                    >
                      {buttonLoader ? t("Processing") : t("Withdraw")}
                    </button>
                    </div>
                  </form>
                )}
              </Index.Formik>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Withdraw;
