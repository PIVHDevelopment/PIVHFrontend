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

const questions = [
  {
    En: {
      question: "What was your first school's name?",
      id: "What was your first school's name?",
      index: 1
    },
    Hi: {
      question: "आपके पहले स्कूल का नाम क्या था?",
      id: "What was your first school's name?",
      index: 1
    },
    Ar: {
      question: "ما اسم أول مدرسة التحقت بها؟",
      id: "What was your first school's name?",
      index: 1
    },
  },
  {
    En: {
      question: "Who was your childhood best friend?",
      id: "Who was your childhood best friend?",
      index: 2
    },
    Hi: {
      question: "आपके बचपन के सबसे अच्छे दोस्त का नाम क्या था?",
      id: "Who was your childhood best friend?",
      index: 2
    },
    Ar: {
      question: "من كان أفضل صديق لك في الطفولة؟",
      id: "Who was your childhood best friend?",
      index: 2
    },
  },
  {
    En: {
      question: "What was your dream job as a child?",
      id: "What was your dream job as a child?",
      index: 3
    },
    Hi: {
      question: "बचपन में आपका सपना क्या बनना था?",
      id: "What was your dream job as a child?",
      index: 3
    },
    Ar: {
      question: "ما هي وظيفة أحلامك عندما كنت طفلاً؟",
      id: "What was your dream job as a child?",
      index: 3
    },
  },
  {
    En: {
      question: "What is your favorite teacher’s name?",
      id: "What is your favorite teacher’s name?",
      index: 4
    },
    Hi: {
      question: "आपके पसंदीदा शिक्षक का नाम क्या है?",
      id: "What is your favorite teacher’s name?",
      index: 4
    },
    Ar: {
      question: "ما اسم معلمك المفضل؟",
      id: "What is your favorite teacher’s name?",
      index: 4
    },
  },
  {
    En: {
      question: "What city were you born in?",
      id: "What city were you born in?",
      index: 5
    },
    Hi: {
      question: "आपका जन्म किस शहर में हुआ था?",
      id: "What city were you born in?",
      index: 5
    },
    Ar: {
      question: "في أي مدينة وُلدت؟",
      id: "What city were you born in?",
      index: 5
    },
  },
];


const businessQuestions = [
  {
    En: {
      question: "What was your desk or office number when you joined?",
      id: "What was your desk or office number when you joined?",
      index: 1
    },
    Hi: {
      question: "जब आपने जॉइन किया था, तब आपकी डेस्क या ऑफिस नंबर क्या था?",
      id: "What was your desk or office number when you joined?",
      index: 1
    },
    Ar: {
      question: "ما رقم مكتبك أو مكتبك عند انضمامك؟",
      id: "What was your desk or office number when you joined?",
      index: 1
    },
  },
  {
    En: {
      question: "What was the name of your first internal project?",
      id: "What was the name of your first internal project?",
      index: 2
    },
    Hi: {
      question: "आपकी पहली आंतरिक परियोजना (इंटरनल प्रोजेक्ट) का नाम क्या था?",
      id: "What was the name of your first internal project?",
      index: 2
    },
    Ar: {
      question: "ما اسم أول مشروع داخلي شاركت فيه؟",
      id: "What was the name of your first internal project?",
      index: 2
    },
  },
  {
    En: {
      question: "What is the official email address associated with your account?",
      id: "What is the official email address associated with your account?",
      index: 3
    },
    Hi: {
      question: "आपके खाते से जुड़ा आधिकारिक ईमेल पता क्या है?",
      id: "What is the official email address associated with your account?",
      index: 3
    },
    Ar: {
      question: "ما هو عنوان البريد الإلكتروني الرسمي المرتبط بحسابك؟",
      id: "What is the official email address associated with your account?",
      index: 3
    },
  },
  {
    En: {
      question: "What is your official job title?",
      id: "What is your official job title?",
      index: 4
    },
    Hi: {
      question: "आपका आधिकारिक पदनाम (जॉब टाइटल) क्या है?",
      id: "What is your official job title?",
      index: 4
    },
    Ar: {
      question: "ما هو المسمى الوظيفي الرسمي الخاص بك؟",
      id: "What is your official job title?",
      index: 4
    },
  },
  {
    En: {
      question: "What was your onboarding trainer's name?",
      id: "What was your onboarding trainer's name?",
      index: 5
    },
    Hi: {
      question: "आपके ऑनबोर्डिंग ट्रेनर का नाम क्या था?",
      id: "What was your onboarding trainer's name?",
      index: 5
    },
    Ar: {
      question: "ما اسم مدرب التهيئة (onboarding) الخاص بك؟",
      id: "What was your onboarding trainer's name?",
      index: 5
    },
  },
];


const SetPinRecoveryQuestion = () => {
  const { t } = Index.useTranslation();
  let ln = localStorage.getItem("language");
  console.log("ddddd", ln)
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
            )?.map((q) => normalizeText(q?.[ln]?.id));

            return !allQuestions?.includes(lowerCasedValue);
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleSubmit = (values) => {
    let endPoint = isBusiness
      ? Index.Api.SET_PIN_QUESTION_BUSINESS
      : Index.Api.SET_PIN_QUESTION;

      const questionIndex = parseInt(values.selectedQuestion);
      const selectedQuestion =
        questionIndex === -1
          ? values.customQuestion
          : (isBusiness ? businessQuestionsEn : questionsEn)[questionIndex]; 

    setSubmitted(true);
    setIsLoading(true);

    Index.DataService.post(endPoint, {
      uid: userData?.uid,
      question: selectedQuestion?.[ln]?.id,
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
        <Box className="app-container">
          <header className="receive-center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <img src={Index.back} alt={t("Back")} />
            </button>
            <div className="app-icon" style={{ marginLeft: "-26px" }}>
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>
          <Box className="security-ques-page">
            <Typography variant="h5" gutterBottom className="common-heading">
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
                              value={q?.[ln]?.index}
                              className="question-radio-box"
                              checked={
                                parseInt(values.selectedQuestion) === q?.[ln]?.index
                              }
                              onChange={() =>
                                setFieldValue("selectedQuestion", q?.[ln]?.index)
                              }
                            />
                          }
                          label={q?.[ln]?.question}
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
                    <div className="user-form-group">
                      <TextField
                        name="customQuestion"
                        placeholder={t("EnterQuestion")}
                        fullWidth
                        className="user-from-control"
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
                    </div>
                  )}

                  <div className="user-form-group">
                    <TextField
                      name="answer"
                      placeholder={t("EnterYourAnswer")}
                      fullWidth
                      className="user-form-control-textarea"
                      multiline
                      margin="normal"
                      value={values.answer}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.answer && Boolean(errors.answer)}
                      helperText={touched.answer && errors.answer}
                    />
                  </div>

                  <div className="common-btn-space-main">
                    <button
                      variant="contained"
                      type="submit"
                      className="common-btn"
                    >
                      {isLoading ? (
                        <Spinner animation="border" role="status" size="sm" />
                      ) : (
                        t("Submit")
                      )}
                    </button>
                  </div>
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
