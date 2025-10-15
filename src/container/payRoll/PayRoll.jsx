// import React, { useEffect, useState } from "react";
// import Index from "../Index";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import { format } from "date-fns";

// function PayRoll() {
//   const navigate = Index.useNavigate();
//   const { t } = Index.useTranslation();
//   const [payrolls, setPayrolls] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     handleGetPayrolls();
//   }, []);

//   const handleGetPayrolls = async () => {
//     setLoading(true);
//     try {
//       const res = await Index.DataService.get(Index.Api.GET_PAYROLL);
//       if (res?.data?.status) {
//         setPayrolls(res.data.data);
//       } else {
//         Index.toasterError(res?.data?.message || t("failedToLoadPayrolls"));
//       }
//     } catch (error) {
//       console.error("Error fetching payrolls", error);
//       Index.toasterError(t("anUnexpectedErrorOccurred"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeletePayroll = async (id) => {
//     try {
//       const res = await Index.DataService.post(
//         `${Index.Api.DELETE_PAYROLL}/${id}`
//       );
//       if (res?.data?.status === 200) {
//         Index.toasterSuccess(
//           res?.data?.message || t("Payroll deleted successfully")
//         );
//         setPayrolls((prev) => prev.filter((p) => p._id !== id));
//       } else {
//         Index.toasterError(res?.data?.message || t("Failed to delete payroll"));
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       Index.toasterError(t("anUnexpectedErrorOccurred"));
//     }
//   };

//   return (
//     <>
//       {loading && payrolls.length === 0 ? (
//         <Index.Loader />
//       ) : (
//         <div className="app-container">
//           <header className="receive-center">
//             <Index.Box className="flex-header-title">
//               <button className="back-btn" onClick={() => navigate("/home")}>
//                 <img src={Index.back} alt="Back" />
//               </button>
//             </Index.Box>
//             <div className="app-icon">
//               <img src={Index.logo} alt={"PocketPi"} className="logo-header" />
//             </div>
//             <div className="header-right"></div>
//           </header>

//           {/* White box container like UserManagement */}
//           <Index.Box className="address-book-details">
//             <Index.Box className="address-book-head">
//               <Typography className="address-book-title">
//                 {t("Payroll Management")}
//               </Typography>
//               <button
//                 className="icon-btn"
//                 onClick={() => navigate("/add-payroll")}
//               >
//                 <img src={Index.Plusadd} alt={t("Add")} />
//               </button>
//             </Index.Box>

//             {/* Payroll List in Table format */}
//             {payrolls?.length > 0 ? (
//               <Paper
//                 elevation={1}
//                 sx={{ mt: 2, p: 2, borderRadius: "12px", background: "#fff" }}
//               >
//                 {loading ? (
//                   <Box
//                     sx={{ display: "flex", justifyContent: "center", my: 2 }}
//                   >
//                     <CircularProgress />
//                   </Box>
//                 ) : (
//                   <Box sx={{ overflowX: "auto" }}>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>
//                             <b>{t("Employee")}</b>
//                           </TableCell>
//                           <TableCell>
//                             <b>{t("Date")}</b>
//                           </TableCell>
//                           <TableCell>
//                             <b>{t("Amount")}</b>
//                           </TableCell>
//                           <TableCell>
//                             <b>{t("Status")}</b>
//                           </TableCell>
//                           <TableCell align="center">{t("Actions")}</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {payrolls.map((payroll) => (
//                           <TableRow
//                             key={payroll._id}
//                             hover
//                             sx={{ cursor: "pointer" }}
//                             onClick={() => navigate(`/pay/${payroll._id}`)}
//                           >
//                             <TableCell>
//                               {payroll?.employeeId?.userName || "-"}
//                             </TableCell>
//                             <TableCell>
//                               {payroll.date
//                                 ? format(new Date(payroll.date), "MMM yyyy")
//                                 : "-"}
//                             </TableCell>
//                             <TableCell>₹{payroll.amount}</TableCell>
//                             <TableCell>{payroll.status}</TableCell>
//                             <TableCell align="center">
//                               <IconButton
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   navigate(`/edit-payroll/${payroll._id}`);
//                                 }}
//                               >
//                                 <img
//                                   src={Index.pencil}
//                                   alt={t("Edit")}
//                                   className="view-icon"
//                                 />
//                               </IconButton>
//                               <IconButton
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleDeletePayroll(payroll._id);
//                                 }}
//                               >
//                                 <img
//                                   src={Index.trash}
//                                   alt={t("Delete")}
//                                   className="view-icon"
//                                 />
//                               </IconButton>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </Box>
//                 )}
//               </Paper>
//             ) : (
//               <Index.Typography sx={{ mt: 2, textAlign: "center" }}>
//                 {t("No Payrolls Found")}
//               </Index.Typography>
//             )}
//           </Index.Box>
//         </div>
//       )}
//     </>
//   );
// }

// export default PayRoll;

import React, { useEffect, useState } from "react";
import Index from "../Index";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import { useLocation, useSearchParams } from "react-router-dom";

function PayRoll() {
  const navigate = Index.useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams(location?.search);
  const activeTab = searchParams?.get("activeTab");
  const isBusiness = location?.state?.isBusiness;
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const { t } = Index.useTranslation();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  // For confirmation dialog
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    handleGetPayrolls();
  }, []);

  const handleGetPayrolls = async () => {
    setLoading(true);
    try {
      const res = await Index.DataService.get(Index.Api.GET_PAYROLL);
      if (res?.data?.status) {
        const filteredPayrolls = res.data.data.filter((item) => {
          const loginUserId =
            typeof item.loginUserId === "object"
              ? item.loginUserId?._id || item.loginUserId?.$oid
              : item.loginUserId;
          return loginUserId === userData._id;
        });
        setPayrolls(filteredPayrolls);
      } else {
        Index.toasterError(res?.data?.message || t("failedToLoadPayrolls"));
      }
    } catch (error) {
      console.error("Error fetching payrolls", error);
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

  // Delete payroll
  const handleDeletePayroll = async () => {
    try {
      const res = await Index.DataService.post(
        `${Index.Api.DELETE_PAYROLL}/${deleteId}`
      );
      if (res?.data?.status === 200) {
        Index.toasterSuccess(
          res?.data?.message || t("Payroll deleted successfully")
        );
        setPayrolls((prev) => prev.filter((p) => p._id !== deleteId));
      } else {
        Index.toasterError(res?.data?.message || t("Failed to delete payroll"));
      }
    } catch (error) {
      console.error("Delete error:", error);
      Index.toasterError(t("anUnexpectedErrorOccurred"));
    } finally {
      handleCloseConfirm();
    }
  };

  return (
    <>
      {loading && payrolls.length === 0 ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          {/* Header */}
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
          </header>

          {/* Payroll Table */}
          <Index.Box className="address-book-details">
            <Index.Box className="address-book-head">
              <Typography className="address-book-title">
                {t("Payroll Management")}
              </Typography>
              <button
                className="icon-btn"
                onClick={() => navigate("/add-payroll")}
              >
                <img src={Index.Plusadd} alt={t("Add")} />
              </button>
            </Index.Box>

            {payrolls?.length > 0 ? (
              <Paper
                elevation={1}
                sx={{ mt: 2, p: 2, borderRadius: "12px", background: "#fff" }}
              >
                {loading ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 2 }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box sx={{ overflowX: "auto" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <b>{t("Employee")}</b>
                          </TableCell>
                          <TableCell>
                            <b>{t("Date")}</b>
                          </TableCell>
                          <TableCell>
                            <b>{t("Amount")}</b>
                          </TableCell>
                          <TableCell>
                            <b>{t("Status")}</b>
                          </TableCell>
                          <TableCell align="center">{t("Actions")}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payrolls.map((payroll) => (
                          <TableRow
                            key={payroll._id}
                            hover
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`/pay/${payroll._id}`)}
                          >
                            <TableCell>
                              {payroll?.employeeId?.name || "-"}
                            </TableCell>
                            <TableCell>
                              {payroll.date
                                ? format(new Date(payroll.date), "MMM yyyy")
                                : "-"}
                            </TableCell>
                            <TableCell>₹{payroll.amount}</TableCell>
                            <TableCell>{payroll.status}</TableCell>
                            <TableCell align="center">
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/edit-payroll/${payroll._id}`);
                                }}
                              >
                                <img
                                  src={Index.pencil}
                                  alt={t("Edit")}
                                  className="view-icon"
                                />
                              </IconButton>
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenConfirm(payroll._id);
                                }}
                              >
                                <img
                                  src={Index.trash}
                                  alt={t("Delete")}
                                  className="view-icon"
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                )}
              </Paper>
            ) : (
              <Index.Typography sx={{ mt: 2, textAlign: "center" }}>
                {t("No Payrolls Found")}
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
            {t("Are you sure you want to delete this payroll?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>{t("Cancel")}</Button>
          <Button color="error" onClick={handleDeletePayroll}>
            {t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PayRoll;
