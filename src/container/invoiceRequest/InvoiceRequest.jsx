import React, { useState, useEffect } from "react";
import Index from "../Index";
import { Modal, Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

function InvoiceRequest() {
  const { id } = useParams();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [buttonLoader, setButtonLoader] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ For multi-box PIN input
  const [pinFields, setPinFields] = useState(["", "", "", "", ""]);
  const [pinError, setPinError] = useState("");

  const navigate = Index.useNavigate();
  const location = Index.useLocation();

  // ✅ Load data from state or fetch via API
  useEffect(() => {
    const fromState = location?.state?.data;
    if (fromState) {
      setData(fromState);
      setLoading(false);
    } else {
      fetchInvoiceById();
    }
  }, [id]);

  // ✅ Fetch data if not passed in state
  const fetchInvoiceById = async () => {
    try {
      const res = await Index.DataService.get(`${Index.Api.GET_INVOICE_BY_ID}/${id}`);
      if (res?.data?.status === 200) {
        setData(res.data.data);
      } else {
        Index.toasterError(res?.data?.message || "Failed to load invoice");
      }
    } catch (error) {
      Index.toasterError("Unable to fetch invoice");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-clear error when 5 digits entered
  useEffect(() => {
    const pin = pinFields.join("");
    if (pin.length === 5 && pinError) {
      setPinError("");
    }
  }, [pinFields, pinError]);

  // ✅ Handle Payment Release
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
        pin,
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
      Index.toasterError(error?.response?.data?.message?.En || "Unexpected error");
      navigate("/home");
    } finally {
      setButtonLoader(false);
    }
  };

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

            if (newValues.join("").length === 5) setPinError("");

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

  if (loading) return <Index.Loader />;

  return (
    <>
      <div className="app-container">
        <header className="receive-center">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <img src={Index.back} alt="Back" />
          </button>
          <div className="app-icon">
            <img src={Index.logo} className="logo-header" alt="Pocket For Pi" />
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

      {/* PIN Entry Modal */}
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
