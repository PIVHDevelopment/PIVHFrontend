import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Index from "../Index";
import { useLocation } from "react-router-dom";

const VerifyAnswer = () => {
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
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
        Index.toasterSuccess(res?.data?.message?.[language]);
        if (res?.data?.status === 200) {
          navigate("/set-txn-pin", {
            state: { isBusiness: isBusiness, isRecover: true },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Index.toasterError(
          err?.response?.data?.message?.[language] || t("SomethingWrong")
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
        <Box className="app-container">
          <header className="receive-center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <img src={Index.back} alt={t("Back")} />
            </button>
            <div className="app-icon">
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>
          <Box className="security-question-details">
            <Typography
              variant="h5"
              gutterBottom
              className="common-heading"
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
                    <p
                      className="user-form-lable"
                    >
                      {question || t("SecurityNotFound")}
                    </p>
                    <div className="input-box">
                      <div className="user-form-group">
                        <TextField
                          name="answer"
                          placeholder={t("EnterYourAnswer")}
                          fullWidth
                          className="user-form-control"
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
                      </div>
                    </div>
                    <Box className="common-btn-space-main">
                      <button
                        variant="contained"
                        type="submit"
                        className="common-btn"
                        disabled={!question}
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
