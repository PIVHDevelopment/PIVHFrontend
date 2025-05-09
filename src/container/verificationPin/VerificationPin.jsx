import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import Index from "../Index";

const VerificationPin = ({ handleSubmitFunction, setNextPage }) => {
  const { t } = Index.useTranslation();
  const [showPin, setShowPin] = useState(false);
  const navigate = Index.useNavigate();

  const validationSchema = Yup.object().shape({
    pinFields: Yup.array()
      .of(Yup.string().matches(/^\d$/, t("OnlyDigitsAllowed")))
      .test("pin-required", t("PleaseEnterPIN"), (arr) =>
        arr.some((val) => val && val.trim() !== "")
      )
      .test(
        "pin-length",
        t("PINDigits"),
        (arr) => arr.filter((val) => val && val.trim() !== "").length === 5
      ),
  });

  console.log("verifiction");

  const renderPinInputs = (values, setFieldValue) => (
    <Box className="set-pin-row">
      {values.pinFields.map((val, idx) => (
        <input
          key={idx}
          type={showPin ? "text" : "password"}
          maxLength={1}
          value={val}
          onChange={(e) => {
            const newValues = [...values.pinFields];
            const newChar = e.target.value.replace(/\D/g, "");
            newValues[idx] = newChar;
            setFieldValue("pinFields", newValues);
            if (newChar && e.target.nextSibling?.tagName === "INPUT") {
              e.target.nextSibling.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !values.pinFields[idx] && idx > 0) {
              const inputs =
                e.currentTarget.parentElement.querySelectorAll("input");
              if (inputs[idx - 1]) inputs[idx - 1].focus();
            }
          }}
          className="set-pin-input-box"
        />
      ))}
      <img
        className="show-icon"
        onClick={() => setShowPin(!showPin)}
        src={showPin ? Index.showIcon : Index.invisibleIcon}
        alt="icon"
        style={{ cursor: "pointer" }}
      />
    </Box>
  );

  return (
    <Box>
      <header className="receive-center">
        <button className="back-btn" onClick={() => setNextPage(false)}>
          <img src={Index.back} alt="Back" />
        </button>
        <div className="app-icon">
          <img src={Index.pocketPi} alt="PocketPi" />
        </div>
        <div className="header-right"></div>
      </header>
      <div className="common-pin-details">
        <Formik
          initialValues={{ pinFields: ["", "", "", "", ""] }}
          validationSchema={Index.addVerificationPinSchema(t)}
          onSubmit={handleSubmitFunction}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            setTouched,
            validateForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <>
                <Box className="common-head-details">
                  <Typography variant="h5" className="common-heading" gutterBottom>
                    {t("VerifyPIN")}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="common-para"
                    gutterBottom
                  >
                    {t("ForPIN")}
                  </Typography>
                </Box>


                <p variant="h6" className="user-form-lable" gutterBottom>
                  {t("EnterPIN")}
                </p>
                {renderPinInputs(values, setFieldValue)}

                {touched.pinFields &&
                  errors.pinFields &&
                  typeof errors.pinFields === "string" && (
                    <p color="error" className="input-error">
                      {errors.pinFields}
                    </p>
                  )}

                <Box className="common-btn-space-main">
                  <button
                    type="submit"
                    className="common-btn"
                  >
                    {t("Verify")}
                  </button>
                </Box>
              </>
            </form>
          )}
        </Formik>
      </div>
    </Box>
  );
};

export default VerificationPin;
