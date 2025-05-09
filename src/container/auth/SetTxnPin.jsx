import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import Index from "../Index";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const SetTxnPin = () => {
  const { t } = Index.useTranslation();
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const location = useLocation();
  const isBusiness = location?.state?.isBusiness;
  const isRecover = location?.state?.isRecover;

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();

  const validationSchema = Yup.object().shape({
    pinFields: Yup.array()
      .of(Yup.string().matches(/^\d$/, t("OnlyDigitsAllowed")))
      .test("pin-required", t("PleaseEnterPin"), (arr) =>
        arr.some((val) => val && val.trim() !== "")
      )
      .test(
        "pin-length",
        t("PINDigits"),
        (arr) => arr.filter((val) => val && val.trim() !== "").length === 5
      ),

    confirmPinFields: Yup.array()
      .of(Yup.string().matches(/^\d$/, t("OnlyDigitsAllowed")))
      .test("confirm-required", t("PleaseConformPin"), (arr) =>
        arr.some((val) => val && val.trim() !== "")
      )
      .test("pin-match", t("PINNotMatch"), function (value) {
        const { pinFields } = this.parent;
        return value.join("") === pinFields.join("");
      }),
  });

  const handleSubmitFunction = async (values) => {
    let endPoint;
    if (isBusiness) {
      endPoint = Index.Api.SET_PIN_QUESTION_BUSINESS;
    } else {
      endPoint = Index.Api.SET_PIN_QUESTION;
    }
    const pin = values.pinFields.join("");
    setIsLoading(true);
    Index.DataService.post(endPoint, {
      uid: userData?.uid,
      pin: pin,
    })
      .then((res) => {
        if (res?.data?.status === 200) {
          const sessionData = JSON.parse(
            sessionStorage.getItem("pi_user_data")
          );
          if (isBusiness) {
            const updatedSessionData = {
              ...sessionData,
              businessTxn: {
                ...sessionData.businessTxn,
                isPin: true,
              },
            };
            sessionStorage.setItem(
              "pi_user_data",
              JSON.stringify(updatedSessionData)
            );
          } else {
            const updatedSessionData = {
              ...sessionData,
              userTxn: {
                ...sessionData.userTxn,
                isPin: true,
              },
            };
            sessionStorage.setItem(
              "pi_user_data",
              JSON.stringify(updatedSessionData)
            );
          }
          if (isRecover) {
            Index.toasterSuccess(res?.data?.message);
            navigate("/home", {
              state: { isBusiness: isBusiness },
            });
          } else {
            navigate("/set-recovery-pin-question", {
              state: { isBusiness: isBusiness },
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Index.toasterError(
          err?.response?.data?.message || t("SomethingWrong")
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderPinInputs = (name, values, setFieldValue, show, setShow) => (
    <Box className="set-pin-row" sx={{ display: "flex", gap: 1 }}>
      {values[name].map((val, idx) => (
        <input
          key={idx}
          type={show ? "text" : "password"}
          maxLength={1}
          value={val}
          onChange={(e) => {
            const newValues = [...values[name]];
            const newChar = e.target.value.replace(/\D/g, "");
            newValues[idx] = newChar;
            setFieldValue(name, newValues);

            if (newChar && e.target.nextSibling?.tagName === "INPUT") {
              e.target.nextSibling.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !values[name][idx] && idx > 0) {
              const inputs =
                e.currentTarget.parentElement.querySelectorAll("input");
              if (inputs[idx - 1]) inputs[idx - 1].focus();
            }
          }}
          className="set-pin-input-box"
          style={{ width: "40px", fontSize: "24px", textAlign: "center" }}
        />
      ))}
      <img
        className="show-icon"
        onClick={() => setShow(!show)}
        src={show ? Index.showIcon : Index.invisibleIcon}
        alt={t("Icon")}
        style={{ cursor: "pointer" }}
      />
    </Box>
  );

  return (
    <>
      {isLoading ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          <header className="receive-center">
            <button
              className="back-btn"
              onClick={() => {
                if (step == 1) navigate(-1);
                else setStep(1);
              }}
            >
              <img src={Index.back} alt={t("Back")} />
            </button>
            <div className="app-icon">
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>
          <Formik
            initialValues={{
              pinFields: ["", "", "", "", ""],
              confirmPinFields: ["", "", "", "", ""],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmitFunction}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              setFieldValue,
              validateForm,
              setTouched,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Typography variant="h5" className="common-heading" gutterBottom>
                    {t("Set")} {isBusiness && t("Business")} {t("TransactionPIN")}
                  </Typography>

                  <Typography
                    variant="h6"
                    className="common-para"
                    gutterBottom
                  >
                  {t("PINContaint")}
                  </Typography>

                  <Grid container spacing={4}>
                    {step === 1 && (
                      <Grid item xs={12} md={6} className="set-pin-box">
                        <Typography variant="h6" className="text" gutterBottom>
                          {t("EnterPIN")}
                        </Typography>
                        {renderPinInputs(
                          "pinFields",
                          values,
                          setFieldValue,
                          showPin,
                          setShowPin
                        )}
                        {touched.pinFields &&
                          errors.pinFields &&
                          typeof errors.pinFields === "string" && (
                            <Typography color="error" variant="body2" mt={1}>
                              {errors.pinFields}
                            </Typography>
                          )}
                      </Grid>
                    )}

                    {step === 2 && (
                      <Grid item xs={12} md={6} className="set-pin-box">
                        <Typography variant="h6" className="text" gutterBottom>
                          {t("ConfirmPIN")}
                        </Typography>
                        {renderPinInputs(
                          "confirmPinFields",
                          values,
                          setFieldValue,
                          showConfirmPin,
                          setShowConfirmPin
                        )}
                        {touched.confirmPinFields &&
                          errors.confirmPinFields &&
                          typeof errors.confirmPinFields === "string" && (
                            <Typography color="error" variant="body2" mt={1}>
                              {errors.confirmPinFields}
                            </Typography>
                          )}
                      </Grid>
                    )}
                  </Grid>

                  <Box textAlign="center" mt={8}>
                    {step === 1 ? (
                      <button
                        type="button"
                        className="secondary-btn share-btn"
                        onClick={async () => {
                          await setTouched({
                            pinFields: [true, true, true, true, true],
                          });
                          const errors = await validateForm();
                          if (!errors.pinFields) {
                            setStep(2);
                          }
                        }}
                      >
                        {t("Next")}
                      </button>
                    ) : (
                      <button type="submit" className="secondary-btn share-btn">
                        {/* {isLoading ? (
                      <Spinner animation="border" role="status" size="sm" />
                    ) : ( */}
                        {t("Set PIN")}
                        {/* )} */}
                      </button>
                    )}
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default SetTxnPin;
