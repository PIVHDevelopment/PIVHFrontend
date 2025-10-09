import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress, TextField, Autocomplete } from "@mui/material";
import Index from "../Index";
import { useParams } from "react-router-dom";

function AddUser() {
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [employeeRolls, setEmployeeRolls] = useState([]);
  const [users, setUsers] = useState([]);
  const [initialValues, setInitialValues] = useState({
    employeeRole: "",
    name: "",
    userId: "",
    phoneNumber: "",
    loginUserId: userData._id,
  });

  // Validation schema
  const userSchema = Yup.object().shape({
    employeeRole: Yup.string().required(t("please select employee role")),
    name: Yup.string()
      .required(t("name is required"))
      .matches(/^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/, t("nameInvalid")),
    userId: Yup.string().required(t("please select userName")),
    phoneNumber: Yup.string()
    .nullable()
    .test(
      "is-valid-phone",
      t("phoneNumber invalid"),
      (value) => !value || /^[0-9]+$/.test(value)
    )
    .test(
      "length-check",
      t("phoneNumber must be 10 digits"),
      (value) => !value || value.length === 10
    ),
  });

  // Fetch employee list
  useEffect(() => {
    (async () => {
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
          Index.toasterError(res?.data?.message || t("Failed to load users"));
        }
      } catch (error) {
        console.error("Fetch users error", error);
        Index.toasterError(t("An unexpected error occurred"));
      }
    })();
  }, []);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const res = await Index.DataService.get(
            `${Index.Api.GET_USER_BY_ID}/${id}`
          );
          if (res?.data?.status) {
            const emp = res.data.data;
            setInitialValues({
              employeeRole: emp.employeeRole?._id || "",
              name: emp.name || "",
              userId: emp.userId?._id || "",
              phoneNumber: emp.phoneNumber || "",
            });
          } else {
            Index.toasterError(res?.data?.message || t("Failed to load user"));
          }
        } catch (error) {
          console.error("Fetch user error", error);
          Index.toasterError(t("anUnexpectedErrorOccurred"));
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  // Fetch user list
  useEffect(() => {
    (async () => {
      try {
        const res = await Index.DataService.get(Index.Api.GET_ALL_USER);
        if (res?.data?.status) {
          const filteredUsers = res.data.data.filter((item) => {
            const loginUserId =
              typeof item.loginUserId === "object"
                ? item.loginUserId?._id || item.loginUserId?.$oid
                : item.loginUserId;
            return loginUserId !== userData._id && item._id !== userData._id;
          });

          setUsers(filteredUsers);
        } else {
          Index.toasterError(res?.data?.message || t("Failed to load users"));
        }
      } catch (error) {
        console.error("Fetch users error", error);
        Index.toasterError(t("An unexpected error occurred"));
      }
    })();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        let res;
        if (id) {
          res = await Index.DataService.post(Index.Api.ADD_USER_MANAGEMENT, {
            id,
            ...values,
          });
        } else {
          res = await Index.DataService.post(
            Index.Api.ADD_USER_MANAGEMENT,
            values
          );
        }

        if (res?.data?.status) {
          Index.toasterSuccess(
            id
              ? t("Employee updated successfully")
              : t("Employee added successfully")
          );
          resetForm();
          navigate("/user-management");
        } else {
          Index.toasterError(res?.data?.message || t("Failed to save user"));
        }
      } catch (err) {
        console.error("Error saving user", err);
        const errorMsg =
          err?.response?.data?.message || t("Something went wrong");

        Index.toasterError(errorMsg);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="app-container">
      {/* Header same as SendInvoice */}
      <header className="receive-center">
        <Index.Box className="flex-header-title">
          <button
            className="back-btn"
            onClick={() => navigate("/user-management")}
          >
            <img src={Index.back} alt="Back" />
          </button>
        </Index.Box>
        <div className="app-icon">
          <img src={Index.logo} alt="PocketPi" className="logo-header" />
        </div>
        <div className="header-right"></div>
      </header>

      {/* White panel same as invoice */}
      <Index.Box className="invoice-details">
        <Index.Box className="invoices-heading">
          <Index.Typography component="p" className="title-header">
            {id ? t("Edit Employee") : t("Add Employee")}
          </Index.Typography>
        </Index.Box>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          {/* Employee Roll Autocomplete */}
          <div className="input-box">
            <Index.FormHelperText component="label" className="form-labels">
              {t("Employee Role")} <span className="error-star">*</span>
            </Index.FormHelperText>
            <Autocomplete
              options={employeeRolls}
              getOptionLabel={(option) => option.name || ""}
              value={
                employeeRolls.find(
                  (u) => u._id === formik.values.employeeRole
                ) || null
              }
              onChange={(event, value) => {
                formik.setFieldValue("employeeRole", value?._id || "");
                formik.setFieldTouched("employeeRole", true, true);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t("Select Employee Role")}
                  className="user-form-control"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      height: "45px",
                      borderRadius: "12px",
                      padding: "10 20px",
                      color: "var(--text-color)",
                    },
                  }}
                  inputProps={{
                    ...params.inputProps,
                    style: {
                      fontSize: "14px",
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-input::placeholder": {
                      fontSize: "14px",
                      opacity: 0.6,
                    },
                  }}
                />
              )}
            />
            {formik.touched.employeeRole && formik.errors.employeeRole && (
              <p className="input-error">{formik.errors.employeeRole}</p>
            )}
          </div>

          {/* Name */}
          <div className="input-box">
            <Index.FormHelperText component="label" className="form-labels">
              {t("Name")} <span className="error-star">*</span>
            </Index.FormHelperText>
            <div className="user-form-group">
              <input
                type="text"
                className="user-form-control"
                name="name"
                placeholder={t("Enter Name")}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <p className="input-error">
              {formik.touched.name && formik.errors.name}
            </p>
          </div>

          {/* Username */}
          <div className="input-box">
            <Index.FormHelperText component="label" className="form-labels">
              {t("User Name")} <span className="error-star">*</span>
            </Index.FormHelperText>
            <Autocomplete
              options={users}
              getOptionLabel={(option) => option.userName || ""}
              value={users.find((u) => u._id === formik.values.userId) || null}
              onChange={(event, value) => {
                formik.setFieldValue("userId", value?._id || "");
                formik.setFieldTouched("userId", true, true);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t("Select User Name")}
                  className="user-form-control"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      height: "45px",
                      borderRadius: "12px",
                      padding: "10 20px",
                      color: "var(--text-color)",
                    },
                  }}
                  inputProps={{
                    ...params.inputProps,
                    style: {
                      fontSize: "14px",
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-input::placeholder": {
                      fontSize: "14px",
                      opacity: 0.6,
                    },
                  }}
                />
              )}
            />
            {formik.touched.userId && formik.errors.userId && (
              <p className="input-error">{formik.errors.userId}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="input-box">
            <Index.FormHelperText component="label" className="form-labels">
              {t("Phone Number")}
            </Index.FormHelperText>
            <div className="user-form-group">
              <input
                type="text"
                className="user-form-control"
                name="phoneNumber"
                placeholder={t("Enter Phone Number")}
                value={formik.values.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    formik.setFieldValue("phoneNumber", value);
                  }
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            <p className="input-error">
              {formik.touched.phoneNumber && formik.errors.phoneNumber}
            </p>
          </div>

          {/* Submit button same as invoice */}
          <div className="common-btn-space-main">
            <button
              type="submit"
              className="common-btn primary-btn"
              disabled={formik.isSubmitting || loading || !formik.isValid}
            >
              {formik.isSubmitting || loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : id ? (
                t("Update Employee")
              ) : (
                t("Add Employee")
              )}
            </button>
          </div>
        </form>
      </Index.Box>
    </div>
  );
}

export default AddUser;
