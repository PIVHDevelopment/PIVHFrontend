import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  FormGroup,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Index from "../Index";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const questionsEn = [
  "What was your first school's name?",
  "Who was your childhood best friend?",
  "What was your dream job as a child?",
  "What is your favorite teacher’s name?",
  "What city were you born in?",
];
const questionsHi = [
  "आपके पहले स्कूल का नाम क्या था?",
  "आपके बचपन के सबसे अच्छे दोस्त का नाम क्या था?",
  "बचपन में आपका सपना क्या बनना था?",
  "आपके पसंदीदा शिक्षक का नाम क्या है?",
  "आपका जन्म किस शहर में हुआ था?",
];
const questionsAr = [
  "ما اسم أول مدرسة التحقت بها؟",
  "من كان أفضل صديق لك في الطفولة؟",
  "ما هي وظيفة أحلامك عندما كنت طفلاً؟",
  "ما اسم معلمك المفضل؟",
  "في أي مدينة وُلدت؟",
];

const businessQuestionsEn = [
  "What was your desk or office number when you joined?",
  "What was the name of your first internal project?",
  "What is the official email address associated with your account?",
  "What is your official job title?",
  "What was your onboarding trainer's name?",
];

const businessQuestionsHi = [
  "जब आपने जॉइन किया था, तब आपकी डेस्क या ऑफिस नंबर क्या था?",
  "आपकी पहली आंतरिक परियोजना (इंटरनल प्रोजेक्ट) का नाम क्या था?",
  "आपके खाते से जुड़ा आधिकारिक ईमेल पता क्या है?",
  "आपका आधिकारिक पदनाम (जॉब टाइटल) क्या है?",
  "आपके ऑनबोर्डिंग ट्रेनर का नाम क्या था?",
];
const businessQuestionsAr = [
  "ما رقم مكتبك أو مكتبك عند انضمامك؟",
  "ما اسم أول مشروع داخلي شاركت فيه؟",
  "ما هو عنوان البريد الإلكتروني الرسمي المرتبط بحسابك؟",
  "ما هو المسمى الوظيفي الرسمي الخاص بك؟",
  "ما اسم مدرب التهيئة (onboarding) الخاص بك؟",
];

const SetPinRecoveryQuestion = () => {
  const { t } = Index.useTranslation();
  let ln = localStorage.getItem("language");
  console.log("ddddd", ln)
  let questions =
    ln === "Hi" ? questionsHi : ln === "Ar" ? questionsAr : questionsEn;
  let businessQuestions =
    ln === "Hi"
      ? businessQuestionsHi
      : ln === "Ar"
      ? businessQuestionsAr
      : businessQuestionsEn;
  const [submitted, setSubmitted] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const isBusiness = location?.state?.isBusiness;

  // const validationSchema = Yup.object().shape({
  //   answer: Yup.string().trim().required("Please enter your answer"),
  //   customQuestion: Yup.string().when("selectedQuestion", {
  //     is: (val) => parseInt(val) === -1,
  //     then: (schema) => schema.trim().required("Please enter your custom question"),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),
  // });

  const validationSchema = Yup.object().shape({
    answer: Yup.string().trim().required(t("EnterAnswer")),
    selectedQuestion: Yup.string().required(),
    customQuestion: Yup.string().when("selectedQuestion", {
      is: (val) => parseInt(val) === -1,
      then: (schema) =>
        schema
          .trim()
          .required(t("EnterCustomeQuestion"))
          .test("not-duplicate", t("QuestionAlreasyExist"), function (value) {
            const normalizeText = (text) => {
              return text
                ?.toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .trim();
            };

            const lowerCasedValue = normalizeText(value);
            const allQuestions = (
              isBusiness ? businessQuestions : questions
            )?.map((q) => normalizeText(q));

            return !allQuestions?.includes(lowerCasedValue);
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleSubmit = (values) => {
    let endPoint = isBusiness
      ? Index.Api.SET_PIN_QUESTION_BUSINESS
      : Index.Api.SET_PIN_QUESTION;

    const selectedQuestion =
      parseInt(values.selectedQuestion) === -1
        ? values.customQuestion
        : (isBusiness ? businessQuestions : questions)[values.selectedQuestion];

    setSubmitted(true);
    setIsLoading(true);

    Index.DataService.post(endPoint, {
      uid: userData?.uid,
      question: selectedQuestion,
      answer: values.answer,
    })
      .then((res) => {
        if (res?.data?.status === 200) {
          const sessionData = JSON.parse(
            sessionStorage.getItem("pi_user_data")
          );
          const updatedSessionData = isBusiness
            ? {
                ...sessionData,
                businessTxn: {
                  ...sessionData.businessTxn,
                  isQuestion: true,
                },
              }
            : {
                ...sessionData,
                userTxn: {
                  ...sessionData.userTxn,
                  isQuestion: true,
                },
              };

          sessionStorage.setItem(
            "pi_user_data",
            JSON.stringify(updatedSessionData)
          );

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
    <>
      {isLoading ? (
        <Index.Loader />
      ) : (
        <Box className="app-container p-20-0 set-pin-div">
          <header className="receive-center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <img src={Index.back} alt={t("Back")} />
            </button>
            <div className="app-icon" style={{ marginLeft: "-26px" }}>
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>
          <Box className="p-20 security-ques-div">
            <Typography variant="h5" gutterBottom>
              {isBusiness && t("Business")} {t("SecurityQuestion")}
            </Typography>

            <Formik
              initialValues={{
                selectedQuestion: 0,
                answer: "",
                customQuestion: "",
              }}
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
                  {console.log(values, "error", errors)}
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
                              checked={
                                parseInt(values.selectedQuestion) === index
                              }
                              onChange={() =>
                                setFieldValue("selectedQuestion", index)
                              }
                            />
                          }
                          label={q}
                        />
                      )
                    )}

                    {/* Custom question option */}
                    <FormControlLabel
                      control={
                        <Radio
                          name="selectedQuestion"
                          value={-1}
                          className="question-radio-box"
                          checked={parseInt(values.selectedQuestion) === -1}
                          onChange={() => setFieldValue("selectedQuestion", -1)}
                        />
                      }
                      label={t("Custom")}
                    />
                  </FormGroup>

                  {/* Custom question input */}
                  {parseInt(values.selectedQuestion) === -1 && (
                    <TextField
                      name="customQuestion"
                      placeholder={t("EnterQuestion")}
                      fullWidth
                      className="textarea-question-sequrity question-custom"
                      margin="normal"
                      value={values.customQuestion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.customQuestion && Boolean(errors.customQuestion)
                      }
                      helperText={
                        touched.customQuestion && errors.customQuestion
                      }
                    />
                  )}

                  <TextField
                    name="answer"
                    placeholder={t("EnterYourAnswer")}
                    fullWidth
                    className="textarea-question-sequrity"
                    multiline
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
                    >
                      {isLoading ? (
                        <Spinner animation="border" role="status" size="sm" />
                      ) : (
                        t("Submit")
                      )}
                    </button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SetPinRecoveryQuestion;
