import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Index from '../Index';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import { format } from "date-fns";

export default function Pay() {
  const { id } = useParams();
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  const [payrollDetails, setPayrollDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPayrollDetails(id);
    }
  }, [id]);

  const fetchPayrollDetails = async (payrollId) => {
    setLoading(true);
    try {
      const res = await Index.DataService.get(
        `${Index.Api.GET_PAYROLL_BY_ID}/${payrollId}`
      );
      if (res?.data?.status) {
        setPayrollDetails(res.data.data);
      } else {
        Index.toasterError(res?.data?.message || t("Failed to load payroll details"));
      }
    } catch (error) {
      console.error("Error fetching payroll details", error);
      Index.toasterError(t("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const handlePay = () => {
    // Implement your payment logic here
    Index.toasterSuccess(t("Payment successful"));
    navigate("/payroll");
    // You might want to update the payroll status, navigate, etc.
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!payrollDetails) {
    return (
      <div className="app-container">
        <header className="receive-center">
          <Index.Box className="flex-header-title">
            <button className="back-btn" onClick={() => navigate("/payroll")}>
              <img src={Index.back} alt="Back" />
            </button>
          </Index.Box>
          <div className="app-icon">
            <img src={Index.logo} alt="PocketPi" className="logo-header" />
          </div>
        </header>
        <Index.Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6">{t("Payroll details not found.")}</Typography>
          <Button variant="contained" onClick={() => navigate("/payroll")} sx={{ mt: 2 }}>
            {t("Back to Payroll List")}
          </Button>
        </Index.Box>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="receive-center">
        <Index.Box className="flex-header-title">
          <button className="back-btn" onClick={() => navigate("/payroll")}>
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
            {t("Payroll Details")}
          </Index.Typography>
        </Index.Box>

        <Paper elevation={1} sx={{ mt: 2, p: 3, borderRadius: "12px", background: "#fff" }}>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Employee")}:</strong> {payrollDetails.employeeId?.userName || "-"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Date")}:</strong> {payrollDetails.date ? format(new Date(payrollDetails.date), "MMMM yyyy") : "-"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Amount")}:</strong> {payrollDetails.amount}π
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Status")}:</strong> {payrollDetails.status}
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePay}
              disabled={payrollDetails.status === "Paid"} 
            >
              {t("Pay Now")}
            </Button>
          </Box>
        </Paper>
      </Index.Box>
    </div>
  );
}