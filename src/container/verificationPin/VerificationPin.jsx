import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import Index from "../Index";

const VerificationPin = ({ handleSubmitFunction, setNextPage }) => {
  const [showPin, setShowPin] = useState(false);
  const navigate = Index.useNavigate();

  const validationSchema = Yup.object().shape({
    pinFields: Yup.array()
      .of(Yup.string().matches(/^\d$/, "Only digits allowed"))
      .test("pin-required", "Please enter PIN", (arr) =>
        arr.some((val) => val && val.trim() !== "")
      )
      .test(
        "pin-length",
        "PIN must be 5 digits",
        (arr) => arr.filter((val) => val && val.trim() !== "").length === 5
      ),
  });

  console.log("verifiction");

  const renderPinInputs = (values, setFieldValue) => (
    <Box className="set-pin-row common-pin-flex">
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
          className="set-pin-input-box common-pin-input"
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
        <div className="app-icon" style={{ marginLeft: "-26px" }}>
          <img src={Index.pocketPi} alt="PocketPi" />
        </div>
        <div className="header-right"></div>
      </header>
      <div className="transaction-pin-details common-pin-details">
        <Formik
          initialValues={{ pinFields: ["", "", "", "", ""] }}
          validationSchema={validationSchema}
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
            <form className="p-20-0 set-pin-div" onSubmit={handleSubmit}>
              <Box className="p-20">
                <Box className="common-head-details">
                  <Typography variant="h5" className="heading" gutterBottom>
                    Verify PIN
                  </Typography>
                  <Typography
                    variant="h6"
                    className="heading-note"
                    gutterBottom
                  >
                    For your security, please enter your 5-digit transaction PIN
                    to continue with this transaction.
                  </Typography>
                </Box>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6} className="set-pin-box">
                    <Typography variant="h6" className="text" gutterBottom>
                      Enter PIN
                    </Typography>
                    {renderPinInputs(values, setFieldValue)}

                    {touched.pinFields &&
                      errors.pinFields &&
                      typeof errors.pinFields === "string" && (
                        <Typography color="error" variant="body2" mt={1}>
                          {errors.pinFields}
                        </Typography>
                      )}
                  </Grid>
                </Grid>

                <Box className="common-pin-btn-center">
                  <button
                    type="submit"
                    className="secondary-btn share-btn"
                    // onClick={async () => {
                    //   await setTouched({
                    //     pinFields: [true, true, true, true, true],
                    //   });
                    //   const errors = await validateForm();
                    //   if (!errors.pinFields) {
                    //     handleSubmit();
                    //   }
                    // }}
                  >
                    Verify
                  </button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </div>
    </Box>
  );
};

export default VerificationPin;
