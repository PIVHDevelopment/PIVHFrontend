import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Index from '../Index';

const SetTxnPin = () => {
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();

  const handleSubmitFunction = async (values) => {
    const pin = values.pinFields.join('');
    Index.DataService.post(Index.Api.SET_PIN_QUESTION, {
      uid: userData?.uid,
      pin: pin
    }).then((res) => {
      if (res?.data?.status === 200) {
        navigate("/set-recovery-pin-question");
      }
    });
  };

  const validationSchema = Yup.object().shape({
    pinFields: Yup.array()
      .of(Yup.string().matches(/^\d$/, 'Only digits allowed'))
      .length(5, 'PIN must be 5 digits')
      .required(),
    confirmPinFields: Yup.array()
      .of(Yup.string().matches(/^\d$/, 'Only digits allowed'))
      .length(5, 'PIN must be 5 digits')
      .test('match', 'PINs do not match', function (value) {
        return value.join('') === this.parent.pinFields.join('');
      })
      .required()
  });

  const renderPinInputs = (name, values, setFieldValue, show, setShow) => (
    <Box className="set-pin-row" sx={{ display: 'flex', gap: 1 }}>
      {values[name].map((val, idx) => (
        <input
          key={idx}
          type={show ? 'text' : 'password'}
          maxLength={1}
          value={val}
          onChange={(e) => {
            const newValues = [...values[name]];
            const newChar = e.target.value.replace(/\D/g, '');
            newValues[idx] = newChar;
            setFieldValue(name, newValues);
  
            if (newChar && e.target.nextSibling?.tagName === 'INPUT') {
              e.target.nextSibling.focus();
            }
          }}
          onKeyDown={(e) => {
            // Prevent backspace from jumping to previous input
            if (e.key === 'Backspace' && !values[name][idx] && idx > 0) {
              const inputs = e.currentTarget.parentElement.querySelectorAll('input');
              if (inputs[idx - 1]) inputs[idx - 1].focus();
            }
          }}
          className="set-pin-input-box"
          style={{ width: '40px', fontSize: '24px', textAlign: 'center' }}
        />
      ))}
      <img
        className='show-icon'
        onClick={() => setShow(!show)}
        src={show ? Index.invisibleIcon : Index.showIcon}
        alt="icon"
        style={{ cursor: 'pointer'}}
      />
    </Box>
  );
  

  return (
    <div className='set-pin-main'>
      <Formik
        initialValues={{ pinFields: ['', '', '', '', ''], confirmPinFields: ['', '', '', '', ''] }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitFunction}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="app-container p-20-0 set-pin-div">
            <Box className="p-20">
                 <Typography variant="h5" className='heading' gutterBottom>
                    Set User Transaction Pin
                        </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6} className="set-pin-box">
                  <Typography variant="h6" className="text" gutterBottom>Enter PIN</Typography>
                  {renderPinInputs('pinFields', values, setFieldValue, showPin, setShowPin)}
                  {touched.pinFields && errors.pinFields && (
                    <Typography color="error" variant="body2" mt={1}>
                      {typeof errors.pinFields === 'string' ? errors.pinFields : 'Invalid PIN input'}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} md={6} className="set-pin-box">
                  <Typography variant="h6" className="text" gutterBottom>Confirm PIN</Typography>
                  {renderPinInputs('confirmPinFields', values, setFieldValue, showConfirmPin, setShowConfirmPin)}
                  {touched.confirmPinFields && errors.confirmPinFields && (
                    <Typography color="error" variant="body2" mt={1}>
                      {typeof errors.confirmPinFields === 'string' ? errors.confirmPinFields : 'PINs do not match'}
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Box textAlign="center" mt={8}>
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
