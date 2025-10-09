import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress, TextField, Autocomplete } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Index from "../Index";
import { useParams } from "react-router-dom";

export default function AddPayRoll() {
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [initialValues, setInitialValues] = useState({
    employeeId: "",
    date: null,
    amount: "",
    loginUserId: userData._id,
  });

  // Validation schema
  const payrollSchema = Yup.object().shape({
    employeeId: Yup.string().required(t("Employee is required")),
    date: Yup.date()
      .nullable()
      .typeError(t("Select Month & Year"))
      .required(t("Select Month & Year")),
    amount: Yup.number()
      .typeError(t("Amount must be a number"))
      .positive(t("Amount must be positive or greater than zero"))
      .required(t("Amount is required")),
  });

  // Fetch employee list
  useEffect(() => {
    (async () => {
      try {
        const res = await Index.DataService.get(Index.Api.GET_USER_MANAGEMENT);
        if (res?.data?.status) {
          const filteredEmployee = res.data.data.filter((item) => {
            const loginUserId =
              typeof item.loginUserId === "object"
                ? item.loginUserId?._id || item.loginUserId?.$oid
                : item.loginUserId;
            return loginUserId === userData._id;
          });
          setUsers(filteredEmployee);
        } else {
          Index.toasterError(res?.data?.message || t("Failed to load users"));
        }
      } catch (error) {
        console.error("Fetch users error", error);
        Index.toasterError(t("An unexpected error occurred"));
      }
    })();
  }, []);

  // Fetch payroll data if editing
  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const res = await Index.DataService.get(
            `${Index.Api.GET_PAYROLL_BY_ID}/${id}`
          );
          if (res?.data?.status) {
            setInitialValues({
              ...res.data.data,
              employeeId: res.data.data.employeeId._id,
              date: res.data.data.date ? new Date(res.data.data.date) : null,
            });
          } else {
            Index.toasterError(
              res?.data?.message || t("Failed to load payroll")
            );
          }
        } catch (error) {
          console.error("Fetch payroll error", error);
          Index.toasterError(t("An unexpected error occurred"));
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: payrollSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        let res;
        if (id) {
          res = await Index.DataService.post(Index.Api.ADD_EDIT_PAYROLL, {
            id,
            ...values,
            date: values.date.toISOString(),
          });
        } else {
          res = await Index.DataService.post(Index.Api.ADD_EDIT_PAYROLL, {
            ...values,
            date: values.date.toISOString(),
          });
        }

        if (res?.data?.status) {
          Index.toasterSuccess(
            id
              ? t("Payroll updated successfully")
              : t("Payroll added successfully")
          );
          resetForm();
          navigate("/payroll");
        } else {
          Index.toasterError(res?.data?.message || t("Failed to save payroll"));
        }
      } catch (err) {
        console.log(err);
        console.error("Error saving payroll", err);
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
      <header className="receive-center">
        <Index.Box className="flex-header-title">
          <button className="back-btn" onClick={() => navigate("/payroll")}>
            <img src={Index.back} alt="Back" />
          </button>
        </Index.Box>
        <div className="app-icon">
          <img src={Index.logo} alt="PocketPi" className="logo-header" />
        </div>
      </header>

      <Index.Box className="invoice-details">
        <Index.Box className="invoices-heading">
          <Index.Typography component="p" className="title-header">
            {id ? t("Edit Payroll") : t("Add Payroll")}
          </Index.Typography>
        </Index.Box>

        <form onSubmit={formik.handleSubmit}>
          {/* Employee Autocomplete */}
          <div className="input-box">
            <Index.FormHelperText component="label" className="form-labels">
              {t("Employee")} <span className="error-star">*</span>
            </Index.FormHelperText>
            <Autocomplete
              options={users}
              getOptionLabel={(option) => option.name || ""}
              value={
                users.find((u) => u._id === formik.values.employeeId) || null
              }
              onChange={(event, value) => {
                formik.setFieldValue("employeeId", value?._id || "");
                formik.setFieldTouched("employeeId", true, true);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t("Select Employee")}
                  className="user-form-control"
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      height: "45px",
                      backgroundColor: "var(--dark-bg)",
                      borderRadius: "12px",
                      padding: "10 20px",
                      color: "var(--text-color)",
                    },
                  }}
                />
              )}
            />
            {formik.touched.employeeId && formik.errors.employeeId && (
              <p className="input-error">{formik.errors.employeeId}</p>
            )}
          </div>

          {/* Month & Year Picker */}
          <div className="input-box">
            <Index.FormHelperText component="label" className="form-labels">
              {t("Date")} <span className="error-star">*</span>
            </Index.FormHelperText>
            <div className="user-form-group picker-control">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year", "month"]}
                  minDate={new Date("2000-01-01")}
                  maxDate={new Date("2100-12-31")}
                  value={formik.values.date}
                  onChange={(newValue) => {
                    formik.setFieldValue("date", newValue);
                  }}
                  onClose={() => formik.setFieldTouched("date", true)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error:
                        (formik.touched.date || formik.submitCount > 0) &&
                        Boolean(formik.errors.date),
                      helperText:
                        (formik.touched.date || formik.submitCount > 0) &&
                        formik.errors.date,
                      className: "user-form-control",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>

          {/* Amount */}
          <div className="input-box">
            <Index.FormHelperText component="label" className="form-labels">
              {t("Amount")} <span className="error-star">*</span>
            </Index.FormHelperText>
            <div className="user-form-group">
              <input
                type="number"
                name="amount"
                className="user-form-control"
                placeholder={t("Enter Amount")}
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onWheel={(e) => e.target.blur()}
              />
            </div>
            <p className="input-error">
              {formik.touched.amount && formik.errors.amount}
            </p>
          </div>

          {/* Submit button */}
          <div className="common-btn-space-main">
            <button
              type="submit"
              className="common-btn primary-btn"
              disabled={formik.isSubmitting || loading || !formik.isValid}
            >
              {formik.isSubmitting || loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : id ? (
                t("Update Payroll")
              ) : (
                t("Add Payroll")
              )}
            </button>
          </div>
        </form>
      </Index.Box>
    </div>
  );
}
