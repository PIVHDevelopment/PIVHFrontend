// import React, { useEffect, useRef, useState } from "react";
// import Index from "../Index";
// import {
//   Autocomplete,
//   Box,
//   CircularProgress,
//   Modal,
//   TextField,
//   Typography,
// } from "@mui/material";
// import VerificationPin from "../verificationPin/VerificationPin";

// function InvoiceRequest() {
//   const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
//   const [buttonLoader, setButtonLoader] = useState(false);
//   const location = Index.useLocation();
//   const data = location?.state?.data;
//   const navigate = Index.useNavigate();

//   const handleSubmit = async () => {
//     const invoiceData = {
//       title: data?.title,
//       amount: data?.amount,
//       sendReqUserId: data?.sendReqUserId?._id,
//       receiveReqUserId: data?.receiveReqUserId?._id,
//     };

//     try {
//       setButtonLoader(true);

//       const res = await Index.DataService.post(
//         Index.Api.RELEASE_PAYMENT,
//         invoiceData
//       );

//       // Check API response status
//       if (res?.status === 200 || res?.status === 201) {
//         Index.toasterSuccess(
//           res?.data?.message || "Payment released successfully"
//         );
//         navigate("/home");
//       } else {
//         Index.toasterError(res?.data?.message || "Something went wrong");
//       }
//     } catch (error) {
//       Index.toasterError(
//         error?.response?.data?.message || "An unexpected error occurred"
//       );
//     } finally {
//       setButtonLoader(false);
//     }
//   };

//   return (
//     <>
//       {buttonLoader ? (
//         <Index.Loader />
//       ) : (
//         <div className="app-container">
//           <header className="receive-center">
//             <button className="back-btn" onClick={() => navigate(-1)}>
//               <img src={Index.back} alt="Back" />
//             </button>
//             <div className="app-icon">
//               {/* <img src={Index.pocketPi} alt={t("PocketPi")} /> */}
//               <img src={Index.logo} className="logo-header" alt="PocketPi" />
//             </div>
//             <div className="header-right"></div>
//           </header>

//           <div className="home-page-main">
//             {data?.sendReqUserId?.userName && (
//               <div className="input-box">
//                 <div className="user-form-group">
//                   <input
//                     className="user-form-control"
//                     value={data?.sendReqUserId?.userName}
//                     disabled
//                   />
//                 </div>
//               </div>
//             )}

//             {/* ✅ Loop through items */}
//             {data?.items?.map((item, index) => (
//               <div key={index} className="item-wrapper">
//                 <div className="input-box">
//                   <div className="user-form-group">
//                     <input
//                       className="user-form-control"
//                       value={item?.title}
//                       disabled
//                     />
//                   </div>
//                 </div>
//                 <div className="input-box">
//                   <div className="user-form-group">
//                     <input
//                       className="user-form-control"
//                       value={item?.amount}
//                       disabled
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Show total if available */}
//             {data?.totalAmount && (
//               <div className="input-box">
//                 <div className="user-form-group">
//                   <input
//                     className="user-form-control"
//                     value={`Total: ${data?.totalAmount}π`}
//                     disabled
//                   />
//                 </div>
//               </div>
//             )}

//             {data?.status === "pending" &&
//             userData?._id != data?.sendReqUserId?._id && (
//               // userData?._id == data?.sendReqUserId?._id && (
//                 <div className="common-btn-space-main">
//                   <button
//                     className="common-btn"
//                     disabled={buttonLoader}
//                     onClick={handleSubmit}
//                   >
//                     Release Payment
//                   </button>
//                 </div>
//               )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default InvoiceRequest;
import React, { useState, useEffect } from "react";
import Index from "../Index";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";

function InvoiceRequest() {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [buttonLoader, setButtonLoader] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);

  // For multi-box PIN input
  const [pinFields, setPinFields] = useState(["", "", "", "", ""]);
  const [pinError, setPinError] = useState("");

  const location = Index.useLocation();
  const data = location?.state?.data;
  const navigate = Index.useNavigate();

  // ✅ Auto-clear error when 5 digits entered
  useEffect(() => {
    const pin = pinFields.join("");
    if (pin.length === 5 && pinError) {
      setPinError("");
    }
  }, [pinFields, pinError]);

  // 🔹 Handle Payment Release after PIN verification
  const handleReleasePayment = async () => {
    const pin = pinFields.join("");
    if (pin.length !== 5) {
      setPinError("Please enter a valid 5-digit PIN");
      return;
    }

    try {
      setButtonLoader(true);
      const invoiceData = {
        title: data?.title,
        amount: data?.amount,
        sendReqUserId: data?.sendReqUserId?._id,
        receiveReqUserId: data?.receiveReqUserId?._id,
        pin, // ✅ include pin for backend verification
      };

      const res = await Index.DataService.post(Index.Api.RELEASE_PAYMENT, invoiceData);

      if (res?.status === 200 || res?.status === 201) {
        Index.toasterSuccess(res?.data?.message || "Payment released successfully");
        setOpenPinModal(false);
        navigate("/home");
      } else {
        Index.toasterError(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      Index.toasterError(error?.response?.data?.message || "An unexpected error occurred");
    } finally {
      setButtonLoader(false);
    }
  };

  // 🔹 Render multi-box PIN input
  const renderPinInputs = (values, setValues) => (
    <Box className="set-pin-row" sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
      {values.map((val, idx) => (
        <input
          key={idx}
          type="password"
          maxLength={1}
          value={val}
          onChange={(e) => {
            const newValues = [...values];
            newValues[idx] = e.target.value.replace(/\D/g, "");
            setValues(newValues);

            // clear error immediately if PIN is complete
            if (newValues.join("").length === 5) setPinError("");

            // auto-focus next input
            if (newValues[idx] && e.target.nextSibling?.tagName === "INPUT") {
              e.target.nextSibling.focus();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !values[idx] && idx > 0) {
              const inputs = e.currentTarget.parentElement.querySelectorAll("input");
              if (inputs[idx - 1]) inputs[idx - 1].focus();
            }
          }}
          style={{
            width: "50px",
            height: "50px",
            textAlign: "center",
            fontSize: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      ))}
    </Box>
  );

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

            {data?.items?.map((item, index) => (
              <div key={index} className="item-wrapper">
                <div className="input-box">
                  <div className="user-form-group">
                    <input className="user-form-control" value={item?.title} disabled />
                  </div>
                </div>
                <div className="input-box">
                  <div className="user-form-group">
                    <input className="user-form-control" value={item?.amount} disabled />
                  </div>
                </div>
              </div>
            ))}

            {data?.totalAmount && (
              <div className="input-box">
                <div className="user-form-group">
                  <input
                    className="user-form-control"
                    value={`Total: ${data?.totalAmount}π`}
                    disabled
                  />
                </div>
              </div>
            )}

            {data?.status === "pending" &&
              userData?._id !== data?.sendReqUserId?._id && (
                <div className="common-btn-space-main">
                  <button
                    className="common-btn"
                    disabled={buttonLoader}
                    onClick={() => setOpenPinModal(true)}
                  >
                    Release Payment
                  </button>
                </div>
              )}
          </div>
        </div>
      )}

      {/* ✅ PIN Entry Modal with multi-box input */}
      <Modal open={openPinModal} onClose={() => setOpenPinModal(false)}>
        <Box
          sx={{
            background: "#fff",
            borderRadius: "16px",
            p: 4,
            width: "90%",
            maxWidth: 400,
            mx: "auto",
            mt: "20vh",
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Enter Your Business PIN
          </Typography>

          {renderPinInputs(pinFields, setPinFields)}

          {pinError && (
            <Typography color="error" variant="body2" mt={1}>
              {pinError}
            </Typography>
          )}

          <div style={{ marginTop: "24px" }}>
            <button
              className="common-btn"
              onClick={handleReleasePayment}
              disabled={buttonLoader}
              style={{ width: "100%" }}
            >
              {buttonLoader ? <CircularProgress size={24} color="inherit" /> : "Confirm Payment"}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default InvoiceRequest;
