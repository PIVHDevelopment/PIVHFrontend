import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  FormGroup,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Index from "../Index";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const questions = [
  "What was your first school's name?",
  "Who was your childhood best friend?",
  "What was your dream job as a child?",
  "What is your favorite teacher’s name?",
  "What city were you born in?",
];

const businessQuestions = [
  "What was your desk or office number when you joined?",
  "What was the name of your first internal project?",
  "What is the official email address associated with your account?",
  "What is your official job title?",
  "What was your onboarding trainer's name?",
];

const SetPinRecoveryQuestion = () => {
  const [submitted, setSubmitted] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const isBusiness = location?.state?.isBusiness;

  const validationSchema = Yup.object().shape({
    answer: Yup.string().trim().required("Please enter your answer"),
  });

  const handleSubmit = (values) => {
    let endPoint;
    if (isBusiness) {
      endPoint = Index.Api.SET_PIN_QUESTION_BUSINESS;
    } else {
      endPoint = Index.Api.SET_PIN_QUESTION;
    }
    setSubmitted(true);
    setIsLoading(true);
    Index.DataService.post(endPoint, {
      uid: userData?.uid,
      question: (isBusiness ? businessQuestions : questions)[
        values.selectedQuestion
      ],
      answer: values.answer,
    })
      .then((res) => {
        if (res?.data?.status === 200) {
          if (isBusiness) {
            const sessionData = JSON.parse(
              sessionStorage.getItem("pi_user_data")
            );
            const updatedSessionData = {
              ...sessionData,
              businessTxn: {
                ...sessionData.businessTxn,
                isQuestion: true,
              },
            };
            sessionStorage.setItem(
              "pi_user_data",
              JSON.stringify(updatedSessionData)
            );
          }
          navigate("/update-pin-successfully", {
            state: { isBusiness: isBusiness },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box className="app-container p-20-0 set-pin-div">
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
          {isBusiness && "Business"} Security Question
        </Typography>

        <Formik
          initialValues={{ selectedQuestion: 0, answer: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleBlur,
          }) => (
            <Form>
              <FormGroup className="question-radio">
                {(isBusiness ? businessQuestions : questions).map(
                  (q, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Radio
                          name="selectedQuestion"
                          value={index}
                          className="question-radio-box"
                          checked={parseInt(values.selectedQuestion) === index}
                          onChange={() =>
                            setFieldValue("selectedQuestion", index)
                          }
                        />
                      }
                      label={q}
                    />
                  )
                )}
              </FormGroup>

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
                  className="action-btn full-width send-pi-btn"
                // className="secondary-btn share-btn"
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

export default SetPinRecoveryQuestion;
