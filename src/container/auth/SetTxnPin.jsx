import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Index from '../Index';
import { Spinner } from 'react-bootstrap';

const SetTxnPin = () => {
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();

  const handleSubmitFunction = async (values) => {
    setIsLoading(true);
    const pin = values.pinFields.join('');
    Index.DataService.post(Index.Api.SET_PIN_QUESTION, {
      uid: userData?.uid,
      pin: pin
    }).then((res) => {
      if (res?.data?.status === 200) {
        navigate("/set-recovery-pin-question");
      }
    }).catch((err) => {
        console.log(err);
      })
    .finally(() => {
        setIsLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    pinFields: Yup.array()
      .of(Yup.string().matches(/^\d$/, 'Only digits allowed'))
      .test('pin-required', 'Please enter pin', (arr) => arr.some(val => val && val.trim() !== ''))
      .test('pin-length', 'PIN must be 5 digits', (arr) => arr.filter(val => val && val.trim() !== '').length === 5),
  
    confirmPinFields: Yup.array()
      .of(Yup.string().matches(/^\d$/, 'Only digits allowed'))
      .test('confirm-required', 'Please enter confirm pin', (arr) => arr.some(val => val && val.trim() !== ''))
      .test('pin-match', 'PIN does not match', function (value) {
        const { pinFields } = this.parent;
        return value.join('') === pinFields.join('');
      }),
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
                    Set Transaction PIN
                        </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6} className="set-pin-box">
                  <Typography variant="h6" className="text" gutterBottom>Enter PIN</Typography>
                  {renderPinInputs('pinFields', values, setFieldValue, showPin, setShowPin)}
                  {touched.pinFields && errors.pinFields && typeof errors.pinFields === 'string' && (
  <Typography color="error" variant="body2" mt={1}>
    {errors.pinFields}
  </Typography>
)}
                </Grid>

                <Grid item xs={12} md={6} className="set-pin-box">
                  <Typography variant="h6" className="text" gutterBottom>Confirm PIN</Typography>
                  {renderPinInputs('confirmPinFields', values, setFieldValue, showConfirmPin, setShowConfirmPin)}
                  {touched.confirmPinFields && errors.confirmPinFields && typeof errors.confirmPinFields === 'string' && (
  <Typography color="error" variant="body2" mt={1}>
    {errors.confirmPinFields}
  </Typography>
)}
                </Grid>
              </Grid>

              <Box textAlign="center" mt={8}>
                <button variant="contained" type="submit" className="secondary-btn share-btn" >
                  
                   {isLoading ? (
                         <Spinner animation="border" role="status" size="sm"/>
                        ) : (
                       "Set PIN"
                       )}
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
