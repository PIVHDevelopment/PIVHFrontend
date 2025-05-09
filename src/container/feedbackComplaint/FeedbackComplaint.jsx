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
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
  let isRtl = language === "Ar" ? true : false;
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
    setLoading(true);
    try {
      const res = await Index.DataService.get(
        Index.Api.GET_USER_FEEDBACK + `/${userData?._id}`
      );
      if (res?.data?.status) {
        setFeedbackData(res?.data?.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setButtonLoader(true);
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
        Index.toasterSuccess(res.data.message?.[language]);
        fetchRequests();
        handleClose();
      }
    } catch (err) {
      Index.toasterError(err?.response?.data?.message?.[language]);
    } finally {
      setButtonLoader(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
     {loading ? (
       <Index.Loader />
       ) : (
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
          <img src={Index.back} alt={t("Back")} />
        </button>
        <div className="app-icon">
          <img src={Index.pocketPi} alt={t("PocketPi")} />
        </div>
        <div className="header-right"></div>
      </header>

      <Box className="address-book-details">
        <Box className="address-book-head">
          <Typography className="address-book-title">
            {t("Feedback And Complaint")}
          </Typography>
          <button className="icon-btn" onClick={handleOpen}>
            <img src={Index.Plusadd} alt={t("Add")} />
          </button>
        </Box>
        <List className="list-ul-address">
          {feedbackData.length > 0 ? (
            feedbackData.map((item, index) => (
              <ListItem key={index}   className={`list-item-address ${
                isRtl ? "text-align-right" : ""
              }`}>
                <Box
                  className={`flex-justify-gap-add ${
                    item?.status !== "pending" ? "custom-align" : ""
                  }`}
                >
                  <Box className="address-left-contain">
                    <Box className="list-field-show">
                      <Typography className="label-contain-address">
                        {t("Email")} :
                      </Typography>
                      <Typography className="field-contain-address">
                        {item?.email}
                      </Typography>
                    </Box>
                    <Box className="list-field-show">
                      <Typography className="label-contain-address">
                        {t("Description")} :
                      </Typography>
                      <Typography className="field-contain-address">
                        {item?.description}
                      </Typography>
                    </Box>
                    <Box className="list-field-show">
                      <Typography className="label-contain-address">
                        {t("Status")} :
                      </Typography>
                      <Typography className="field-contain-address custom-field-contain-status">
                        {item?.status}
                      </Typography>
                    </Box>
                    <Box className="list-field-show">
                      <Typography className="label-contain-address">
                        {t("Date")} :
                      </Typography>
                      <Typography className="field-contain-address custom-field-contain-status">
                        {Index.moment(item?.createdAt).format(
                          "DD/MM/YYYY hh:mm A"
                        )}
                      </Typography>
                    </Box>
                    <Box className="list-field-show list-field-show-full">
                      <Typography className="label-contain-address">
                        Description :
                      </Typography>
                      <Typography className="field-contain-address">
                        {item?.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            ))
          ) : (
             <Index.NoDataFound message={t("No Feedback And Complaint Found")} />
          )}
        </List>
      </Box>

      {/* Add/Edit Modal */}
      <Modal open={open} onClose={handleClose} className="address-modal">
        <Box sx={modalStyle} className="common-style-modal address-style">
          <Box className="modal-header-common address-modal-header">
            <Typography className="add-title">
              {t("Add Feedback And Complaint")}
            </Typography>
            <button className="btn-close" onClick={handleClose}></button>
          </Box>
          <Index.Formik
            initialValues={{
              email: "",
              description: "",
            }}
            validationSchema={Index.addFeedbackFormSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Box className="modal-body address-body">
                  <Box className="grid-row">
                    <Box className="common-grid">
                      <div className="input-wrapper">
                        <Typography className="label-field">{t("Email")}</Typography>
                        <input
                          type="text"
                          className="notes-input"
                          placeholder={t("Enter Email")}
                          name="email"
                          value={formik.values.userName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          maxLength={164}
                        />
                        <div className="input-error">
                          {formik.errors.email && formik.touched.email
                            ? t(formik.errors.email)
                            : null}
                        </div>
                      </div>
                    </Box>
                    <Box className="common-grid">
                      <div className="input-wrapper">
                        <Typography className="label-field">
                          {t("Description")}
                        </Typography>
                        <TextField
                          type="text"
                          multiline
                          rows={3}
                          className="notes-input-multiline"
                          placeholder={t("EnterDescription")}
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          inputProps={{ maxLength: 512 }}
                        />

                        <div className="input-error">
                          {formik.errors.description &&
                          formik.touched.description
                            ? t(formik.errors.description)
                            : null}
                        </div>
                      </div>
                    </Box>
                  </Box>
                  <Box className="modal-footer">
                    <Box className="footer-address-center">
                      <button
                        className="common-btn"
                        type="submit"
                        disabled={buttonLoader}
                      >
                        {buttonLoader ? (
                          <CircularProgress size={20} />
                        ) : (
                          t("Submit")
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
     )}
    </>
  );
};

export default FeedbackComplaint;
