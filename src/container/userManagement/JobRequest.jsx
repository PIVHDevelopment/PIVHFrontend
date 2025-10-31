import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Index from "../Index";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { format } from "date-fns";

export default function JobRequest() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();

  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const notification = location?.state?.notification;

  useEffect(() => {
    const jobId = notification?.ObjectId || id;
    if (notification?.ObjectId) {
      fetchJobDetails(notification.ObjectId);
    } else if (id) {
      fetchJobDetails(id);
    } else {
      setLoading(false);
    }
  }, [id, notification]);

  const fetchJobDetails = async (jobId) => {
    setLoading(true);
    try {
      const res = await Index.DataService.get(
        `${Index.Api.GET_USER_BY_ID}/${jobId}`
      );
      console.log("res", res);
      if (res?.data?.status === 200) {
        setJobDetails(res.data.data);
      } else {
        Index.toasterError(
          res?.data?.message || t("Failed to load job details")
        );
      }
    } catch (error) {
      console.error("Error fetching job details", error);
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

  if (!jobDetails) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        {t("No job details found.")}
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
            {t("Job Details")}
          </Index.Typography>
        </Index.Box>

        <Paper
          elevation={1}
          sx={{ mt: 2, p: 3, borderRadius: "12px", background: "#fff" }}
        >
          <Typography variant="h6" gutterBottom>
            <strong>{t("Job Creator")}:</strong>{" "}
            {jobDetails?.loginUserId?.userName || "-"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Name")}:</strong> {jobDetails?.name || "-"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <strong>{t("Date")}:</strong>{" "}
            {jobDetails?.createdAt
              ? format(new Date(jobDetails.createdAt), "dd MMMM yyyy")
              : "-"}
          </Typography>
        </Paper>
      </Index.Box>
    </div>
  );
}
