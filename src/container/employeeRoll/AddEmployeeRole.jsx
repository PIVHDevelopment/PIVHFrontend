import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import Index from "../Index";
import { useParams } from "react-router-dom";

function AddEmployeeRole() {
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    loginUserId: userData._id,
  });

  // Validation schema
  const employeeRoleSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("name is required"))
      .matches(/^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/, t("name is invalid")),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const res = await Index.DataService.get(
            `${Index.Api.GET_EMPLOYEE_ROLE_BY_ID}/${id}`
          );
          if (res?.data?.status) {
            setInitialValues(res.data.data);
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: employeeRoleSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        let res;
        if (id) {
          res = await Index.DataService.post(Index.Api.ADD_EDIT_EMPLOYEE_ROLE, {
            id,
            ...values,
          });
        } else {
          res = await Index.DataService.post(
            Index.Api.ADD_EDIT_EMPLOYEE_ROLE,
            values
          );
        }

        if (res?.data?.status) {
          Index.toasterSuccess(
            id ? t("Employee Roll updated successfully") : t("Employee Roll added successfully")
          );
          resetForm();
          navigate("/employee-roll");
        } else {
          Index.toasterError(res?.data?.message || t("Failed to save employee roll"));
        }
      } catch (err) {
        console.error("Error saving user", err);
        const errorMsg =
          err?.response?.data?.message || t("Something went wrong");

        Index.toasterError(errorMsg);
        Index.toasterError(
          t(AxiosError?.response?.data?.message || "Something went wrong")
        );
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
            onClick={() => navigate("/employee-roll")}
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
            {id ? t("Edit Employee Roll") : t("Add Employee Roll")}
          </Index.Typography>
        </Index.Box>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
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
                t("Update Employee Roll")
              ) : (
                t("Add Employee Roll")
              )}
            </button>
          </div>
        </form>
      </Index.Box>
    </div>
  );
}

export default AddEmployeeRole;

