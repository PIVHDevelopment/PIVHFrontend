import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Index from "../Index";
import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
  Modal,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import countries from "./countries.json";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "49%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 40px)",
  maxWidth: "450px",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function KYBVerification() {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
  const [loading, setLoading] = React.useState(false);
  const [openPreviewModal, setOpenPreviewModal] = React.useState(false);
  const [previewFile, setPreviewFile] = React.useState(null);
  console.log(openPreviewModal, previewFile, "text");

  const formik = useFormik({
    initialValues: {
      country: { name: "India" } || null,
      frontDocument: null,
      backDocument: null,
      singleDocument: null,
    },
    validationSchema: Index.addKybVerificationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("userId", userData?._id);
      formData.append("country", values?.country?.name);

      // Append documents depending on country
      if (values.country.name === "India") {
        formData.append("documents", values.frontDocument);
        formData.append("documents", values.backDocument);
      } else {
        formData.append("documents", values.singleDocument);
      }

      try {
        const res = await Index.DataService.post(
          Index.Api.ADD_KYB_VERIFICATION,
          formData
        );
        if (res?.data?.status === 200 || res?.data?.status === 201) {
          Index.toasterSuccess(res?.data?.message?.[language]);
          formik.resetForm();
          navigate("/check-kyb-verification");
        }
      } catch (error) {
        Index.toasterError(
          error?.response?.data?.message?.[language] ||
            t("AnUnexpectedErrorOccurred")
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const FilePreview = ({ file }) => {
    if (!file) return null;
    const fileURL = URL.createObjectURL(file);
    if (file.type === "application/pdf") {
      return (
        <iframe
          src={fileURL}
          title="PDF Preview"
          width="100%"
          height="200px"
          style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        />
      );
    }

    return (
      <img
        src={fileURL}
        alt="Document Preview"
        className="user-upload-profile-img"
      />
    );
  };

    const FilePreviewModal = ({ file }) => {
    if (!file) return null;
    const fileURL = URL.createObjectURL(file);
    if (file.type === "application/pdf") {
      return (
        <iframe
          src={fileURL}
          title="PDF Preview"
          width="100%"
          height="500px"
        />
      );
    }

    return (
      <img
        src={fileURL}
        alt="Document Preview"
        className="user-upload-profile-img"
              width="100%"
          height="500px"
      />
    );
  };

  return (
    <div className="app-container">
      <header className="receive-center">
        <button
          className="back-btn"
          onClick={() => navigate("/check-kyb-verification")}
        >
          <img src={Index.back} alt="Back" />
        </button>
        <div className="app-icon">
          <img src={Index.pocketPi} alt="PocketPi" />
        </div>
        <div className="header-right"></div>
      </header>

      <Index.Box className="address-book-details">
        <form onSubmit={formik.handleSubmit}>
          <Index.Box className="address-book-head">
            <Index.Typography className="address-book-title">
              {t("KYB Verification")}
            </Index.Typography>
          </Index.Box>

          <Index.Box className="grid-row">
            <Index.Box sx={{ width: 1 }} className="grid-main">
              <Index.Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={3}
              >
                {/* Country Autocomplete */}
                <Index.Box gridColumn="span 12" className="grid-column">
                  <div className="input-box">
                    <Typography className="input-form-label">
                      {t("Select Country")}
                    </Typography>
                    <Autocomplete
                      options={countries}
                      getOptionLabel={(option) => option.name}
                      className="kyb-autocomplete-input"
                      value={formik.values.country}
                      onChange={(e, value) =>
                        formik.setFieldValue("country", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="country"
                          //   error={
                          //     formik.touched.country &&
                          //     Boolean(formik.errors.country)
                          //   }
                          //   helperText={
                          //     formik.touched.country && formik.errors.country
                          //   }
                          className="dropdown-select"
                          placeholder={t("Select Country")}
                        />
                      )}
                    />
                    {formik.touched.country && formik.errors.country && (
                      <p color="error" className="input-error">
                        {formik.errors.country}
                      </p>
                    )}
                  </div>
                </Index.Box>

                {/* Upload Front Document */}
                {formik.values.country?.name === "India" ? (
                  <>
                    {/* Upload Aadhar Front */}
                    <Index.Box gridColumn="span 12" className="grid-column">
                      <div className="input-box">
                        <Typography className="input-form-label">
                          {t("Upload Aadhar Card Front")}
                        </Typography>
                        <div className="user-file-upload-btn-main">
                          <Button
                            variant="contained"
                            component="label"
                            className="user-file-upload-btn"
                          >
                            {formik.values.frontDocument ? (
                              <>
                                <FilePreview
                                  file={formik.values.frontDocument}
                                />
                              </>
                            ) : (
                              <CloudUploadIcon className="user-upload-icon-img" />
                            )}

                            <input
                              hidden
                              accept="image/*,.pdf"
                              type="file"
                              onClick={(e) => {
                                e.target.value = null;
                              }}
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "frontDocument",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </Button>
                          {formik.values.frontDocument && (
                            <Index.Box className="kyb-clear-icon">
                              <Button
                                onClick={(e) => {
                                  formik.setFieldValue("frontDocument", null);
                                }}
                              >
                                Remove
                              </Button>
                              <Button
                                onClick={() => {
                                  if (formik.values.frontDocument) {
                                    setPreviewFile(formik.values.frontDocument);
                                    setOpenPreviewModal(true);
                                  }
                                }}
                              >
                                Preview
                              </Button>
                            </Index.Box>
                          )}

                          {formik.touched.frontDocument &&
                            formik.errors.frontDocument && (
                              <p color="error" className="input-error">
                                {formik.errors.frontDocument}
                              </p>
                            )}
                        </div>
                      </div>
                    </Index.Box>

                    {/* Upload Aadhar Back */}
                    <Index.Box gridColumn="span 12" className="grid-column">
                      <div className="input-box">
                        <Typography className="input-form-label">
                          {t("Upload Aadhar Card Back")}
                        </Typography>
                        <div className="user-file-upload-btn-main">
                          <Button
                            variant="contained"
                            component="label"
                            className="user-file-upload-btn"
                          >
                            {formik.values.backDocument ? (
                              <>
                                <FilePreview
                                  file={formik.values.backDocument}
                                />
                                {/* <Box className="clear-icon">
                                  <ClearIcon
                                    fontSize="small"
                                   
                                  />
                                </Box> */}
                              </>
                            ) : (
                              <CloudUploadIcon className="user-upload-icon-img" />
                            )}
                            <input
                              hidden
                              accept="image/*,.pdf"
                              type="file"
                              onClick={(e) => {
                                e.target.value = null;
                              }}
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "backDocument",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </Button>
                          {console.log(formik.values.backDocument, "check")}
                          {formik.values.backDocument && (
                            <Index.Box className="kyb-clear-icon">
                              <Button
                                onClick={(e) => {
                                  formik.setFieldValue("backDocument", null);
                                }}
                              >
                                Remove
                              </Button>
                              <Button 
                               onClick={() => {
                                  if (formik.values.backDocument) {
                                    setPreviewFile(formik.values.backDocument);
                                    setOpenPreviewModal(true);
                                  }
                                }}
                                >Preview</Button>
                            </Index.Box>
                          )}
                          {formik.touched.backDocument &&
                            formik.errors.backDocument && (
                              <p color="error" className="input-error">
                                {formik.errors.backDocument}
                              </p>
                            )}
                        </div>
                      </div>
                    </Index.Box>
                  </>
                ) : (
                  // Single Document Upload for Non-India
                  <Index.Box gridColumn="span 12" className="grid-column">
                    <div className="input-box">
                      <Typography className="input-form-label">
                        {t("Upload Passport or Driving License")}
                      </Typography>
                      <div className="user-file-upload-btn-main">
                        <Button
                          variant="contained"
                          component="label"
                          className="user-file-upload-btn"
                        >
                          {formik.values.singleDocument ? (
                            <>
                              <FilePreview
                                file={formik.values.singleDocument}
                              />
                            </>
                          ) : (
                            <CloudUploadIcon className="user-upload-icon-img" />
                          )}

                          <input
                            hidden
                            accept="image/*,.pdf"
                            type="file"
                            onClick={(e) => {
                              e.target.value = null;
                            }}
                            onChange={(event) => {
                              formik.setFieldValue(
                                "singleDocument",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </Button>
                        {formik.values.singleDocument && (
                          <Index.Box className="kyb-clear-icon">
                            <Button
                              onClick={(e) => {
                                formik.setFieldValue("singleDocument", null);
                              }}
                            >
                              Remove
                            </Button>
                            <Button
                             onClick={() => {
                                  if (formik.values.singleDocument) {
                                    setPreviewFile(formik.values.singleDocument);
                                    setOpenPreviewModal(true);
                                  }
                                }}>Preview</Button>
                          </Index.Box>
                        )}

                        {formik.touched.singleDocument &&
                          formik.errors.singleDocument && (
                            <p color="error" className="input-error">
                              {formik.errors.singleDocument}
                            </p>
                          )}
                      </div>
                    </div>
                  </Index.Box>
                )}
              </Index.Box>
            </Index.Box>

            <button
              className="kyb-verification-btn"
              type="submit"
              disabled={loading}
            >
              {t("Submit")}
            </button>
          </Index.Box>
        </form>
      </Index.Box>

      {openPreviewModal && (
        <Modal
          open={openPreviewModal}
          onClose={() => setOpenPreviewModal(false)}
        >
          <Box sx={modalStyle}>
            <FilePreviewModal file={previewFile} />
          </Box>
        </Modal>
      )}
    </div>
  );
}
