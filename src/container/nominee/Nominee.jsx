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

function Nominee() {
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();
  const [nomineesData, setNomineesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));

  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  useEffect(() => {
    handleGetNominees();
  }, []);

  const handleGetNominees = async () => {
    try {
      const res = await Index.DataService.get(Index.Api.GET_NOMINEE);
      if (res?.data?.status === 200) {
        const filteredNominees = res.data.data.filter((item) => {
          const loginUserId =
            typeof item.loginUserId === "object"
              ? item.loginUserId?._id || item.loginUserId?.$oid
              : item.loginUserId;
          return loginUserId === userData._id;
        });

        setNomineesData(filteredNominees);
      } else {
        Index.toasterError(res?.data?.message || t("failedToLoadNominees"));
      }
    } catch (error) {
      console.error("Error fetching nominees:", error);
      Index.toasterError(t("somethingWentWrong"));
    }
  };

  const handleOpenConfirm = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setDeleteId(null);
    setOpenConfirm(false);
  };

  const handleDeleteNominee = async () => {
    try {
      const res = await Index.DataService.post(
        `${Index.Api.DELETE_NOMINEE}/${deleteId}`
      );
      if (res?.data?.status === 200) {
        Index.toasterSuccess(
          res?.data?.message || t("Nominee deleted successfully")
        );
        setNomineesData((prev) => prev.filter((n) => n._id !== deleteId));
      } else {
        Index.toasterError(res?.data?.message || t("Failed to delete nominee"));
      }
    } catch (error) {
      console.error("Delete error:", error);
      Index.toasterError(t("anUnexpectedErrorOccurred"));
    } finally {
      handleCloseConfirm();
    }
  };

  const toggleSection = () => setIsExpanded(!isExpanded);

  return (
    <>
      {loading && nomineesData.length === 0 ? (
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
                {t("Nominee Management")}
              </Typography>
              {nomineesData?.length === 0 && (
                <button
                  className="icon-btn"
                  onClick={() => navigate("/add-nominee")}
                >
                  <img src={Index.Plusadd} alt={t("Add")} />
                </button>
              )}
            </Index.Box>

            {nomineesData?.length > 0 ? (
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
                <h2 className="transaction-section-title">
                  {t("Nominees List")}
                </h2>
                <div className="transaction-list">
                  {loading ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", my: 2 }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    nomineesData.map((item) => (
                      <div className="transaction-main-box" key={item._id}>
                        <div className="transaction-details">
                          {/* Edit/Delete for the whole record */}
                          <img
                            src={Index.pencil}
                            alt={t("Edit")}
                            className="view-icon"
                            onClick={() =>
                              navigate(`/edit-nominee/${item._id}`)
                            }
                          />
                          <img
                            src={Index.trash}
                            alt={t("Delete")}
                            className="view-icon"
                            onClick={() => handleOpenConfirm(item._id)}
                          />
                          <div className="transaction-info">
                            {item.nominees.map((n) => (
                              <div key={n._id} className="nominee-info">
                                <p className="transaction-title">{n.name}</p>
                                <p className="transaction-time">{n.userName}</p>
                                <p className="transaction-time">
                                  {n.percentage}%
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <Index.Typography sx={{ mt: 2, textAlign: "center" }}>
                {t("No Nominees Found")}
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
            {t("Are you sure you want to delete this nominee?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>{t("Cancel")}</Button>
          <Button color="error" onClick={handleDeleteNominee}>
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Nominee;
