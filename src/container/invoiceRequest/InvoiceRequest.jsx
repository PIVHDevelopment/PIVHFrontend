import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import VerificationPin from "../verificationPin/VerificationPin";

function InvoiceRequest() {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [buttonLoader, setButtonLoader] = useState(false);
  const location = Index.useLocation();
  const data = location?.state?.data;
  const navigate = Index.useNavigate();

  const handleSubmit = async () => {
    const invoiceData = {
      title: data?.title,
      amount: data?.amount,
      sendReqUserId: data?.sendReqUserId?._id,
      receiveReqUserId: data?.receiveReqUserId?._id,
    };

    try {
      setButtonLoader(true);

      const res = await Index.DataService.post(
        Index.Api.RELEASE_PAYMENT,
        invoiceData
      );

      // Check API response status
      if (res?.status === 200 || res?.status === 201) {
        Index.toasterSuccess(
          res?.data?.message || "Payment released successfully"
        );
        navigate("/home");
      } else {
        Index.toasterError(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      Index.toasterError(
        error?.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setButtonLoader(false);
    }
  };

  return (
    <>
      {buttonLoader ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          <header className="receive-center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <img src={Index.back} alt="Back" />
            </button>
            <div className="app-icon">
              {/* <img src={Index.pocketPi} alt={t("PocketPi")} /> */}
              <img src={Index.logo} className="logo-header" alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>

          <div className="home-page-main">
            {data?.sendReqUserId?.userName && (
              <div className="input-box">
                <div className="user-form-group">
                  <input
                    className="user-form-control"
                    value={data?.sendReqUserId?.userName}
                    disabled
                  />
                </div>
              </div>
            )}

            {/* ✅ Loop through items */}
            {data?.items?.map((item, index) => (
              <div key={index} className="item-wrapper">
                <div className="input-box">
                  <div className="user-form-group">
                    <input
                      className="user-form-control"
                      value={item?.title}
                      disabled
                    />
                  </div>
                </div>
                <div className="input-box">
                  <div className="user-form-group">
                    <input
                      className="user-form-control"
                      value={item?.amount}
                      disabled
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Show total if available */}
            {data?.totalAmount && (
              <div className="input-box">
                <div className="user-form-group">
                  <input
                    className="user-form-control"
                    value={`Total: ${data?.totalAmount}`}
                    disabled
                  />
                </div>
              </div>
            )}

            {data?.status === "pending" &&
            // userData?._id != data?.sendReqUserId?._id && (
              userData?._id == data?.sendReqUserId?._id && (
                <div className="common-btn-space-main">
                  <button
                    className="common-btn"
                    disabled={buttonLoader}
                    onClick={handleSubmit}
                  >
                    Release Payment
                  </button>
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default InvoiceRequest;
