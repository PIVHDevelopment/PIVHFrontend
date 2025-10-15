import React, { useEffect, useState } from "react";
import Index from "../Index";
import {
  Box,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useLocation, useSearchParams } from "react-router-dom";

function EmployeeRoll() {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams(location?.search);
  const activeTab = searchParams?.get("activeTab");
  const isBusiness = location?.state?.isBusiness;
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const { t } = Index.useTranslation();
  const [employeeRolls, setEmployeeRolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // For confirmation dialog
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    handleGetEmployeeRolls();
  }, []);

  const handleGetEmployeeRolls = async () => {
    setLoading(true);
    try {
      const res = await Index.DataService.get(Index.Api.GET_EMPLOYEE_ROLE);
      if (res?.data?.status) {
        const filteredEmployeeRolls = res.data.data.filter((item) => {
          const loginUserId =
            typeof item.loginUserId === "object"
              ? item.loginUserId?._id || item.loginUserId?.$oid
              : item.loginUserId;
          return loginUserId === userData._id;
        });
        setEmployeeRolls(filteredEmployeeRolls);
      } else {
        Index.toasterError(res?.data?.message || t("Failed to load employee rolls"));
      }
    } catch (error) {
      console.error("Error fetching users", error);
      Index.toasterError(t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  // Open confirmation dialog
  const handleOpenConfirm = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setDeleteId(null);
    setOpenConfirm(false);
  };

  // Delete user
  const handleDeleteEmployeeRoll = async () => {
    try {
      const res = await Index.DataService.post(
        `${Index.Api.DELETE_EMPLOYEE_ROLE}/${deleteId}`
      );
      if (res?.data?.status === 200) {
        Index.toasterSuccess(
          res?.data?.message || t("Employee roll deleted successfully")
        );
        setEmployeeRolls((prev) => prev.filter((u) => u._id !== deleteId));
      } else {
        Index.toasterError(res?.data?.message || t("Failed to delete employee roll"));
      }
    } catch (error) {
      console.error("Delete error:", error);
      Index.toasterError(t("anUnexpectedErrorOccurred"));
    } finally {
      handleCloseConfirm();
    }
  };

  const toggleSection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {loading && employeeRolls.length === 0 ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          <header className="receive-center">
            <Index.Box className="flex-header-title">
              <button
                className="back-btn"
                onClick={() =>
                  navigate("/home", {
                    state: { isBusiness, activeTab },
                  })
                }
              >
                <img src={Index.back} alt="Back" />
              </button>
            </Index.Box>
            <div className="app-icon">
              <img src={Index.logo} alt={"PocketPi"} className="logo-header" />
            </div>
            <div className="header-right"></div>
          </header>

          <Index.Box className="address-book-details">
            <Index.Box className="address-book-head">
              <Typography className={`address-book-title`}>
                {t("Employee Roll")}
              </Typography>
              <button
                className="icon-btn"
                onClick={() => navigate("/add-employee-role")}
              >
                <img src={Index.Plusadd} alt={t("Add")} />
              </button>
            </Index.Box>

            {employeeRolls?.length > 0 ? (
              <div
                className={`transaction-section ${
                  isExpanded ? "expanded" : "collapsed"
                }`}
              >
                <div className="toggle-arrow" onClick={toggleSection}>
                  {isExpanded ? (
                    <span className="arrow-icon">↓</span>
                  ) : (
                    <span className="arrow-icon">↑</span>
                  )}
                </div>
                <h2 className="transaction-section-title">{t("Employee Roll List")}</h2>
                <div className="transaction-list">
                  {loading ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", my: 2 }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    employeeRolls.map((user) => (
                      <div className="transaction-main-box" key={user._id}>
                        <div className="transaction-details">
                          <img
                            src={Index.pencil}
                            alt={t("Edit")}
                            className="view-icon"
                            onClick={() => navigate(`/edit-employee-role/${user._id}`)}
                          />
                          <img
                            src={Index.trash}
                            alt={t("Delete")}
                            className="view-icon"
                            onClick={() => handleOpenConfirm(user._id)} // open confirm dialog
                          />
                          <div className="transaction-info">
                            <p className="transaction-title">{user.name}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <Index.Typography sx={{ mt: 2, textAlign: "center" }}>
                {t("No Employees Roll Found")}
              </Index.Typography>
            )}
          </Index.Box>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>{t("Confirm Delete")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Are you sure you want to delete this employee roll?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>{t("Cancel")}</Button>
          <Button color="error" onClick={handleDeleteEmployeeRoll}>
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeRoll;
