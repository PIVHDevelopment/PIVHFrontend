import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Index from "../Index";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const VerifyAnswer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const location = useLocation();
  const isBusiness = location?.state?.isBusiness;
  const type = isBusiness ? "business" : "individual";

  const validationSchema = Yup.object().shape({
    answer: Yup.string().trim().required("Please enter your answer"),
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
          err?.response?.data?.message || "Something went wrong"
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
    <Box className="app-container p-20-0 set-pin-div" maxWidth={600} mx="auto">
        <header className="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Index.back} alt="Back" />
        </button>
        <div className="app-icon" style={{ marginLeft: "-26px" }}>
          <img src={Index.pocketPi} alt="PocketPi" />
        </div>
        <div className="header-right"></div>
      </header>
      <Box className="p-20">
        <Typography variant="h5" gutterBottom>
          {isBusiness && "Business "}Security Question
        </Typography>

        {/* Show fetched question */}
        <Typography variant="subtitle1" mb={2}>
          {question || "Loading question..."}
        </Typography>

        <Formik
          initialValues={{ answer: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <TextField
                name="answer"
                placeholder="Enter your Answer"
                fullWidth
                className="textarea-question-sequrity"
                multiline
                rows={3}
                margin="normal"
                value={values.answer}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.answer && Boolean(errors.answer)}
                helperText={touched.answer && errors.answer}
              />

              <Box textAlign="center" mt={5}>
                <button
                  variant="contained"
                  type="submit"
                  className="secondary-btn share-btn"
                >
                  {isLoading ? (
                    <Spinner animation="border" role="status" size="sm" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default VerifyAnswer;
