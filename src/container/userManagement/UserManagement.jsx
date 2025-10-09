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

function UserManagement() {
  const navigate = Index.useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const { t } = Index.useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  // For confirmation dialog
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    setLoading(true);
    try {
      const res = await Index.DataService.get(Index.Api.GET_USER_MANAGEMENT);
      if (res?.data?.status) {
        const filteredUsers = res.data.data.filter((item) => {
          const loginUserId =
            typeof item.loginUserId === "object"
              ? item.loginUserId?._id || item.loginUserId?.$oid
              : item.loginUserId;
          return loginUserId === userData._id;
        });
        setUsers(filteredUsers);
      } else {
        Index.toasterError(res?.data?.message || t("failedToLoadUsers"));
      }
    } catch (error) {
      console.error("Error fetching users", error);
      Index.toasterError(t("anUnexpectedErrorOccurred"));
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
  const handleDeleteUser = async () => {
    try {
      const res = await Index.DataService.post(
        `${Index.Api.DELETE_USER_MANAGEMENT}/${deleteId}`
      );
      if (res?.data?.status === 200) {
        Index.toasterSuccess(
          res?.data?.message || t("Employee deleted successfully")
        );
        setUsers((prev) => prev.filter((u) => u._id !== deleteId));
      } else {
        Index.toasterError(res?.data?.message || t("Failed to delete user"));
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
      {loading && users.length === 0 ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          <header className="receive-center">
            <Index.Box className="flex-header-title">
              <button className="back-btn" onClick={() => navigate("/home")}>
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
                {t("Employee Management")}
              </Typography>
              <button
                className="icon-btn"
                onClick={() => navigate("/add-user")}
              >
                <img src={Index.Plusadd} alt={t("Add")} />
              </button>
            </Index.Box>

            {users?.length > 0 ? (
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
                <h2 className="transaction-section-title">{t("Employee List")}</h2>
                <div className="transaction-list">
                  {loading ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", my: 2 }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    users.map((user) => (
                      <div className="transaction-main-box" key={user._id}>
                        <div className="transaction-details">
                          <img
                            src={Index.pencil}
                            alt={t("Edit")}
                            className="view-icon"
                            onClick={() => navigate(`/edit-user/${user._id}`)}
                          />
                          <img
                            src={Index.trash}
                            alt={t("Delete")}
                            className="view-icon"
                            onClick={() => handleOpenConfirm(user._id)} // open confirm dialog
                          />
                          <div className="transaction-info">
                            <p className="transaction-title">{user.name}</p>
                            <p className="transaction-time">
                              {user.userId?.userName} ({user.employeeRole?.name})
                            </p>
                            <p className="transaction-time">{user.phoneNumber}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <Index.Typography sx={{ mt: 2, textAlign: "center" }}>
                {t("No Employees Found")}
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
            {t("Are you sure you want to delete this employee?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>{t("Cancel")}</Button>
          <Button color="error" onClick={handleDeleteUser}>
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserManagement;
