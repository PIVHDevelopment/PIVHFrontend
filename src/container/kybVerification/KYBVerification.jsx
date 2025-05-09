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
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import countries from "./countries.json";

export default function KYBVerification() {
 const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
 const navigate = Index.useNavigate();
 const { t } = Index.useTranslation();

 const formik = useFormik({
    initialValues: {
      country: { name: "India" } || null,
      frontDocument: null,
      backDocument: null,
      singleDocument: null,
    },
    validationSchema: Index.addKybVerificationSchema,
    onSubmit: async (values) => {
        console.log({values});
        
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
          Index.toasterSuccess(res?.data?.message);
          formik.resetForm();
          navigate("/check-kyb-verification");
        }
      } catch (error) {
        Index.toasterError(
          error?.response?.data?.message
        );
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
  

  return (
    <div className="app-container">
      <header className="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
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
              KYB Verification
            </Index.Typography>
          </Index.Box>

          <Index.Box className="grid-row">
            <Index.Box sx={{ width: 1 }} className="grid-main">
              <Index.Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={2}
              >
                {/* Country Autocomplete */}
                <Index.Box gridColumn="span 12" className="grid-column">
                  <div className="input-box">
                    <Typography className="input-form-label">
                      Select Country
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
                          placeholder="Select Country"
                        />
                      )}
                    />
                     {formik.touched.country &&
                            formik.errors.country && (
                              <Typography color="error" fontSize={12}>
                                {formik.errors.country}
                              </Typography>
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
                          Upload Aadhar Card Front
                        </Typography>
                        <div className="user-file-upload-btn-main">
                          <Button
                            variant="contained"
                            component="label"
                            className="user-file-upload-btn"
                          >
                              {formik.values.frontDocument ?
                              <img
                              src={URL.createObjectURL(formik.values.frontDocument)}
                              alt="Front Document Preview"
                             className="user-upload-profile-img"
                            /> :
                            <CloudUploadIcon className="user-upload-icon-img" /> }
                            <input
                              hidden
                              accept="image/*,.pdf"
                              type="file"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "frontDocument",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </Button>
                          {formik.touched.frontDocument &&
                            formik.errors.frontDocument && (
                              <Typography color="error" fontSize={12}>
                                {formik.errors.frontDocument}
                              </Typography>
                            )}
                        </div>
                      </div>
                    </Index.Box>

                    {/* Upload Aadhar Back */}
                    <Index.Box gridColumn="span 12" className="grid-column">
                      <div className="input-box">
                        <Typography className="input-form-label">
                          Upload Aadhar Card Back
                        </Typography>
                        <div className="user-file-upload-btn-main">
                          <Button
                            variant="contained"
                            component="label"
                            className="user-file-upload-btn"
                          >
                         {formik.values.backDocument ?
                              <img
                              src={URL.createObjectURL(formik.values.backDocument)}
                              alt="Front Document Preview"
                             className="user-upload-profile-img"
                            /> :
                            <CloudUploadIcon className="user-upload-icon-img" />
                            }
                            <input
                              hidden
                              accept="image/*,.pdf"
                              type="file"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "backDocument",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </Button>
                          {formik.touched.backDocument &&
                            formik.errors.backDocument && (
                              <Typography color="error" fontSize={12}>
                                {formik.errors.backDocument}
                              </Typography>
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
                        Upload Passport or Driving License
                      </Typography>
                      <div className="user-file-upload-btn-main">
                        <Button
                          variant="contained"
                          component="label"
                          className="user-file-upload-btn"
                        >
                        {formik.values.singleDocument ? (
                          <>
                         <FilePreview file={formik.values.singleDocument} />
                          <ClearIcon  onClick={(e) => {
                            e.stopPropagation();
                           formik.setFieldValue("singleDocument", null);
                           }}/>
                          </>
                       ) : (
                         <CloudUploadIcon className="user-upload-icon-img" />
                       )}

                          <input
                            hidden
                            accept="image/*,.pdf"
                            type="file"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "singleDocument",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </Button>
                        {formik.touched.singleDocument &&
                          formik.errors.singleDocument && (
                            <Typography color="error" fontSize={12}>
                              {formik.errors.singleDocument}
                            </Typography>
                          )}
                      </div>
                    </div>
                  </Index.Box>
                )}
              </Index.Box>
            </Index.Box>

            <button
              className="action-btn full-width button-top-space"
              type="submit"
            >
              Submit
            </button>
          </Index.Box>
        </form>
      </Index.Box>
    </div>
  );
}
