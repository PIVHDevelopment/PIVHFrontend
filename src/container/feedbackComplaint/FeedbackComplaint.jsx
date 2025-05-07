import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  List,
  ListItem,
  CircularProgress,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import Index from "../Index";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 30px)",
  maxWidth: "350px",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const FeedbackComplaint = () => {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  const isBusiness = location?.state?.isBusiness;
  const [feedbackData, setFeedbackData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const fetchRequests = async () => {
    try {
      const res = await Index.DataService.get(
        Index.Api.GET_USER_FEEDBACK + `/${userData?._id}`
      );
      if (res?.data?.status) {
        setFeedbackData(res?.data?.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values, 
        userId: userData?._id, 
      };
      const res = await Index.DataService.post(
        Index.Api.ADD_FEEDBACK,
        payload
      );
      if (res?.data?.status) {
        Index.toasterSuccess(res.data.message);
        fetchRequests();
        handleClose();
      }
    } catch (err) {
      Index.toasterError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="app-container">
      <header className="receive-center">
        <button
          className="back-btn"
          onClick={() =>
            navigate("/home", {
              state: { isBusiness },
            })
          }
        >
          <img src={Index.back} alt="Back" />
        </button>
        <div className="app-icon">
          <img src={Index.pocketPi} alt="PocketPi" />
        </div>
        <div className="header-right"></div>
      </header>

      <Box className="address-book-details">
        <Box className="address-book-head">
          <Typography className="address-book-title">
            Feedback And Complaint
          </Typography>
          <button className="icon-btn" onClick={handleOpen}>
            <img src={Index.Plusadd} alt="Add" />
          </button>
        </Box>
        <List className="list-ul-address">
          {feedbackData.length > 0 ? (
            feedbackData.map((item, index) => (
              <ListItem key={index} className="list-item-address">
                <Box
                  className={`flex-justify-gap-add ${
                    item?.status !== "pending" ? "custom-align" : ""
                  }`}
                >
                  <Box className="address-left-contain">
                    <Box className="list-field-show">
                      <Typography className="label-contain-address">
                        Email :
                      </Typography>
                      <Typography className="field-contain-address">
                        {item?.email}
                      </Typography>
                    </Box>
                    <Box className="list-field-show">
                      <Typography className="label-contain-address">
                        Description :
                      </Typography>
                      <Typography className="field-contain-address">
                        {item?.description}
                      </Typography>
                    </Box>
                    <Box className="list-field-show">
                      <Typography className="label-contain-address">
                        Status :
                      </Typography>
                      <Typography className="field-contain-address custom-field-contain-status">
                        {item?.status}
                      </Typography>
                    </Box>
                    <Box className="list-field-show">
                      <Typography className="label-contain-address">
                        Date :
                      </Typography>
                      <Typography className="field-contain-address custom-field-contain-status">
                        {Index.moment(item?.createdAt).format(
                          "DD-MM-YYYY hh:mm A"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            ))
          ) : (
             <Index.NoDataFound message={" No Feedback And Complaint Found"} />
          )}
        </List>
      </Box>

      {/* Add/Edit Modal */}
      <Modal open={open} onClose={handleClose} className="address-modal">
        <Box sx={modalStyle} className="common-style-modal address-style">
          <Box className="modal-header-common address-modal-header">
            <Typography className="add-title">
              {"Add Feedback And Complaint"}
            </Typography>
            <button className="btn-close" onClick={handleClose}></button>
          </Box>
          <Index.Formik
            initialValues={{
              email: "",
              description: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
              .email("Enter a valid email")
              .matches(
                /^(([^<>()[\]\\.,;:-\s@#"]+(\.[^<>()[\]\\.,;:-\s@#"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Enter the valid email"
              )
              .required("Email is required"),
              description: Yup.string().required("Description is required"),
            })}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Box className="modal-body address-body">
                  <Box className="grid-row">
                    <Box className="common-grid">
                      <div className="input-wrapper">
                        <Typography className="label-field">Email</Typography>
                        <input
                          type="text"
                          className="notes-input"
                          placeholder="Enter Email"
                          name="email"
                          value={formik.values.userName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          maxLength={164}
                        />
                        <div className="input-error">
                          {formik.errors.email && formik.touched.email
                            ? formik.errors.email
                            : null}
                        </div>
                      </div>
                    </Box>
                    <Box className="common-grid">
                      <div className="input-wrapper">
                        <Typography className="label-field">
                          Description
                        </Typography>
                        <TextField
                          type="text"
                          multiline
                          rows={3}
                          className="notes-input-multiline"
                          placeholder="Enter Description"
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          inputProps={{ maxLength: 512 }}
                        />

                        <div className="input-error">
                          {formik.errors.description &&
                          formik.touched.description
                            ? formik.errors.description
                            : null}
                        </div>
                      </div>
                    </Box>
                  </Box>
                  <Box className="modal-footer modal-footer-address">
                    <Box className="footer-address-center">
                      <button
                        className="action-btn full-width send-pi-btn"
                        type="submit"
                        disabled={buttonLoader}
                      >
                        {buttonLoader ? (
                          <CircularProgress size={20} />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Index.Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default FeedbackComplaint;
