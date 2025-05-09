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

  const getTranslatedQuestion = (question, language, isBusiness) => {
    const map = {
      En: isBusiness ? businessQuestionsEn : questionsEn,
      Hi: isBusiness ? businessQuestionsHi : questionsHi,
      Ar: isBusiness ? businessQuestionsAr : questionsAr,
    };
  
    const index = map["En"]?.indexOf(question);
    if (index !== -1) {
      return map[language]?.[index] || question;
    }
    return question; 
  };
  

  return (
    <>
      {isLoading ? (
        <Index.Loader />
      ) : (
        <Box className="app-container set-pin-div" mx="auto">
          <header className="receive-center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <img src={Index.back} alt={t("Back")} />
            </button>
            <div className="app-icon" style={{ marginLeft: "-26px" }}>
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>
          <Box className="security-question-details">
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
                  {question
                    ? getTranslatedQuestion(question, language, isBusiness)
                     : t("SecurityNotFound")}
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
