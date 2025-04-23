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
<<<<<<< HEAD
    answer: Yup.string().trim().required('Please enter your answer'),
=======
    selectedQuestion: Yup.number()
      .typeError("Select a security question")
      .required("Select a security question"),
    answer: Yup.string().trim().required("Please enter an answer"),
>>>>>>> 0ad0941c850814194d817a0b14b12cec15c488b4
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
          navigate("/update-pin-successfully");
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
    <Box className="app-container p-20-0 set-pin-div" maxWidth={600} mx="auto">
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
<<<<<<< HEAD
              <FormGroup className='question-radio'>
                {questions.map((q, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Radio
                        name="selectedQuestion"
                        className='question-radio-box'
                        value={index}
                        checked={parseInt(values.selectedQuestion) === index}
                        onChange={() => setFieldValue('selectedQuestion', index)}
                      />
                    }
                    label={q}
                  />
                ))}
=======
              <FormGroup>
                {(isBusiness ? businessQuestions : questions).map(
                  (q, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Radio
                          name="selectedQuestion"
                          value={index}
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
>>>>>>> 0ad0941c850814194d817a0b14b12cec15c488b4
              </FormGroup>

              <TextField
                name="answer"
                placeholder='Enter your Answer'
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

export default SetPinRecoveryQuestion;
