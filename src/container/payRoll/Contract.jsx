import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Index from "../Index";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { format } from "date-fns";

export default function Contract() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();

  const [contractDetails, setContractDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const notification = location?.state?.notification;

  useEffect(() => {
    const contractId = notification?.ObjectId || id;
    if (notification?.ObjectId) {
      fetchContractDetails(notification.ObjectId);
    } else if (id) {
      fetchContractDetails(id);
    } else {
      setLoading(false);
    }
  }, [id, notification]);

  const fetchContractDetails = async (contractId) => {
    setLoading(true);
    try {
      const res = await Index.DataService.get(
        `${Index.Api.GET_PAYROLL_BY_ID}/${contractId}`
      );
      console.log("res", res);
      if (res?.data?.status === 200) {
        setContractDetails(res.data.data);
      } else {
        Index.toasterError(
          res?.data?.message || t("Failed to load contract details")
        );
      }
    } catch (error) {
      console.error("Error fetching contract details", error);
      Index.toasterError(t("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!contractDetails) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        {t("No contract details found.")}
      </Typography>
    );
  }

  return (
    <div className="app-container">
      <header className="receive-center">
        <Index.Box className="flex-header-title">
          <button className="back-btn" onClick={() => navigate("/home")}>
            <img src={Index.back} alt="Back" />
          </button>
        </Index.Box>
        <div className="app-icon">
          <img src={Index.logo} alt="PocketPi" className="logo-header" />
        </div>
      </header>

      <Index.Box className="invoice-details">
        <Index.Box className="invoices-heading">
          <Index.Typography component="p" className="title-header">
            {t("Contract Details")}
          </Index.Typography>
        </Index.Box>

        <Paper
          elevation={1}
          sx={{ mt: 2, p: 3, borderRadius: "12px", background: "#fff" }}
        >
          <Typography variant="h6" gutterBottom>
            <strong>{t("Contract Creator")}:</strong>{" "}
            {contractDetails?.loginUserId?.userName || "-"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Name")}:</strong> {contractDetails?.employeeId?.name || "-"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Amount")}:</strong> {contractDetails?.amount || "-"}π
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Date")}:</strong>{" "}
            {contractDetails?.date
              ? format(new Date(contractDetails.date), "dd MMMM yyyy")
              : "-"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Status")}:</strong> {contractDetails?.status || "-"}
          </Typography>
        </Paper>
      </Index.Box>
    </div>
  );
}
