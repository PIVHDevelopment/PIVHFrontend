import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Index from "../Index";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const VerifyAnswer = () => {
  const { t } = Index.useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const location = useLocation();
  const isBusiness = location?.state?.isBusiness;
  const type = isBusiness ? "business" : "individual";

  const validationSchema = Yup.object().shape({
    answer: Yup.string().trim().required(t("EnterAnswer")),
  });

  const handleSubmit = (values) => {
    setIsLoading(true);
    Index.DataService.post(Index.Api.VERIFY_ANSWER, {
      uid: userData?.uid,
      answer: values.answer,
      type: isBusiness ? "business" : "individual",
    })
      .then((res) => {
        Index.toasterSuccess(res?.data?.message);
        if (res?.data?.status === 200) {
          navigate("/set-txn-pin", {
            state: { isBusiness: isBusiness, isRecover: true },
          });
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

  const handleGetQuestion = () => {
    Index.DataService.get(
      Index.Api.GET_RECOVER_QUESTION + `?uid=${userData?.uid}&type=${type}`
    )
      .then((res) => {
        if (res?.data?.status === 200) {
          setQuestion(res?.data?.data?.question || "");
        }
      })
      .catch((e) => {
        console.log("Failed to fetch question", err);
      });
  };

  useEffect(() => {
    handleGetQuestion();
  }, []);

  return (
    <>
      {isLoading ? (
        <Index.Loader />
      ) : (
        <Box className="app-container p-20-0 set-pin-div" mx="auto">
          <header className="receive-center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <img src={Index.back} alt={t("Back")} />
            </button>
            <div className="app-icon" style={{ marginLeft: "-26px" }}>
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>
          <Box className="p-20 security-question-details">
            <Typography
              variant="h5"
              gutterBottom
              className="security-question-title"
            >
              {isBusiness && t("Business")}{" "}{t("SecurityQuestion")}
            </Typography>

            <Box className="verify-answer-content">
              <Formik
                initialValues={{ answer: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form>
                    {/* Show fetched question */}
                    <Typography
                      variant="subtitle1"
                      className="verify-answer-label"
                    >
                      {question || t("SecurityNotFound")}
                    </Typography>
                    <TextField
                      name="answer"
                      placeholder={t("EnterYourAnswer")}
                      fullWidth
                      className="textarea-question-sequrity"
                      multiline
                      // rows={3}
                      margin="normal"
                      value={values.answer}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.answer && Boolean(errors.answer)}
                      helperText={touched.answer && errors.answer}
                      disabled={!question}
                    />

                    <Box textAlign="center" mt={5}>
                      <button
                        variant="contained"
                        type="submit"
                        className="action-btn full-width send-pi-btn"
                        disabled={!question}
                        // className="secondary-btn share-btn"
                      >
                        {/* {isLoading ? (
                      <Spinner animation="border" role="status" size="sm" />
                    ) : ( */}
                        {t("Submit")}
                        {/* )} */}
                      </button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default VerifyAnswer;
