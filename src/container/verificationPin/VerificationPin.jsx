import React, { useState } from 'react';
import Index from '../Index';
import { Box, Grid, Typography } from "@mui/material";

const VerificationPin = () => {
      const navigate = Index.useNavigate();
      return (
            <>
                  <div className="app-container">

                        <div className="transaction-pin-details common-pin-details">
                              <form
                                    className=" p-20-0 set-pin-div"
                              >
                                    <Box className="p-20">
                                          <Box className="common-head-details">
                                                <Typography variant="h5" className="heading" gutterBottom>
                                                      Verify PIN
                                                </Typography>

                                                <Typography variant="h6" className='heading-note' gutterBottom>
                                                      Your PIN will be securely saved with PocketPie. You will need to enter this PIN every time when you make the payment in application.
                                                </Typography>

                                          </Box>


                                          <Grid container spacing={4}>
                                                <Grid item xs={12} md={6} className="set-pin-box">
                                                      <Typography variant="h6" className="text" gutterBottom>
                                                            Enter PIN
                                                      </Typography>
                                                      <Box className="set-pin-row common-pin-flex">

                                                            <input
                                                                  type="password"
                                                                  maxLength={1}
                                                                  className="set-pin-input-box common-pin-input"
                                                            />
                                                            <input
                                                                  type="password"
                                                                  maxLength={1}
                                                                  className="set-pin-input-box common-pin-input"
                                                            />
                                                            <input
                                                                  type="password"
                                                                  maxLength={1}
                                                                  className="set-pin-input-box common-pin-input"
                                                            />
                                                            <input
                                                                  type="password"
                                                                  maxLength={1}
                                                                  className="set-pin-input-box common-pin-input"
                                                            />
                                                            <input
                                                                  type="password"
                                                                  maxLength={1}
                                                                  className="set-pin-input-box common-pin-input"
                                                            />
                                                            <img
                                                                  className="show-icon"

                                                                  src={Index.showIcon}
                                                                  alt="icon"
                                                                  style={{ cursor: "pointer" }}
                                                            />
                                                      </Box>
                                                </Grid>

                                          </Grid>

                                          <Box className="common-pin-btn-center" >

                                                <button
                                                      type="button"
                                                      className="secondary-btn share-btn"
                                                >
                                                      Verify
                                                </button>

                                          </Box>
                                    </Box>


                              </form>
                        </div>
                  </div>
            </>
      )
}

export default VerificationPin
