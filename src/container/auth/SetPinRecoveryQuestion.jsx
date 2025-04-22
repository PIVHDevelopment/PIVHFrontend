import React, { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  FormGroup,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Index from '../Index';

const questions = [
  "What was your first school's name?",
  'Who was your childhood best friend?',
  'What was your dream job as a child?',
  'What is your favorite teacher’s name?',
  'What city were you born in?',
];

const SetPinRecoveryQuestion = () => {
  const [submitted, setSubmitted] = useState(false);
    const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
    const navigate = Index.useNavigate();

  const validationSchema = Yup.object().shape({
    answer: Yup.string().trim().required('Please enter an answer'),
  });

  const handleSubmit = (values) => {
    setSubmitted(true);
    Index.DataService.post(Index.Api.SET_PIN_QUESTION, {
        uid: userData?.uid,
        question: questions[values.selectedQuestion],
        answer: values.answer,
      }).then((res) => {
        if (res?.data?.status === 200) {
          navigate("/home");
        }
      });
  };

  return (
    <Box className="app-container p-20-0 set-pin-div" maxWidth={600} mx="auto">
      <Box className="p-20">
        <Typography variant="h5" gutterBottom>
          Security Question
        </Typography>

        <Formik
          initialValues={{selectedQuestion: 0, answer: '' }}
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
              <FormGroup>
                {questions.map((q, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Radio
                        name="selectedQuestion"
                        value={index}
                        checked={parseInt(values.selectedQuestion) === index}
                        onChange={() => setFieldValue('selectedQuestion', index)}
                      />
                    }
                    label={q}
                  />
                ))}
              </FormGroup>

              <TextField
                label="Your Answer"
                name="answer"
                fullWidth
                className='textarea-question-sequrity'
                multiline
                rows={3}
                margin="normal"
                value={values.answer}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.answer && Boolean(errors.answer)}
                helperText={touched.answer && errors.answer}
              />

              {submitted && !errors.answer && !errors.selectedQuestion && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Recovery question set successfully!
                </Alert>
              )}

              <Box textAlign="center" mt={5}>
                <button variant="contained" type="submit" className="secondary-btn">
                  Submit
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
