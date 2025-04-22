import React, { useState } from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Index from '../Index';

const SetTxnPin = () => {
  const [showPin, setShowPin] = useState(true);
  const [showConfirmPin, setShowConfirmPin] = useState(true);
console.log({showPin});

  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();

  const handleSubmitFunction = async (values) => {
    Index.DataService.post(Index.Api.SET_PIN_QUESTION, {
      uid: userData?.uid,
      pin: values.pin
    }).then((res) => {
      if (res?.data?.status === 200) {
        navigate("/set-recovery-pin-question");
      }
    });
  };

  const validationSchema = Yup.object().shape({
    pin: Yup.string()
      .length(5, 'PIN must be 5 digits')
      .matches(/^\d+$/, 'Only numbers allowed')
      .required('Enter your pin'),
    confirmPin: Yup.string()
      .oneOf([Yup.ref('pin')], 'PIN do not match')
      .required('Enter your confirm pin'),
  });

  return (
    <div className='set-pin-main'>
    <Formik
      initialValues={{ pin: '', confirmPin: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmitFunction}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="app-container p-20-0 signin-main">
          <Box className="p-20">
            <Grid container spacing={4}>
              {/* PIN Field */}
              <Grid item xs={12} md={6} className="set-pin-box">
                <Typography variant="h6" className="text" gutterBottom>Enter PIN</Typography>
                <Box className="set-pin-row">
                  <MuiOtpInput
                    value={values.pin}
                    className="set-pin-input"
                    length={5}
                    onlyNumbers
                    onChange={(value) => {
                        const numericValue = value.replace(/\D/g, ''); 
                        setFieldValue('pin', numericValue);
                      }}
                    onBlur={handleBlur}
                    type={showPin ? 'text' : 'password'}
                    TextFieldsProps={{
                      error: touched.pin && Boolean(errors.pin),
                    }}
                  />
           
                  <img className='show-icon' onClick={()=>setShowPin(!showPin)} src={showPin ? Index.invisibleIcon : Index.showIcon}  alt="icon" />
                </Box>
                {touched.pin && errors.pin && (
                  <Typography color="error" variant="body2" mt={1}>
                    {errors.pin}
                  </Typography>
                )}
              </Grid>

              {/* Confirm PIN Field */}
              <Grid item xs={12} md={6} className="set-pin-box">
                <Typography variant="h6" className="text" gutterBottom>Confirm PIN</Typography>
                <Box className="set-pin-row">
                  <MuiOtpInput
                    value={values.confirmPin}
                    length={5}
                    onlyNumbers
                    className="set-pin-input"
                    onChange={(value) => {
                        const numericValue = value.replace(/\D/g, ''); 
                        setFieldValue('confirmPin', numericValue);
                      }}
                    onBlur={handleBlur}
                    type={showConfirmPin ? 'text' : 'password'}
                    TextFieldsProps={{
                      error: touched.confirmPin && Boolean(errors.confirmPin),
                    }}
                  />
                 
                <img className='show-icon' onClick={()=>setShowConfirmPin(!showConfirmPin)} src={showConfirmPin ? Index.invisibleIcon : Index.showIcon} alt="icon" />
                </Box>
                {touched.confirmPin && errors.confirmPin && (
                  <Typography color="error" variant="body2" mt={1}>
                    {errors.confirmPin}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box textAlign="center" mt={10}>
              <button variant="contained" type="submit" className="secondary-btn">
                Set PIN
              </button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
    </div>
  );
};

export default SetTxnPin;
