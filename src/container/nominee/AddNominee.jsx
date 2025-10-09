import React, { useEffect, useState } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  CircularProgress,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import Index from "../Index";
import { useParams } from "react-router-dom";

function AddNominee() {
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  // Validation schema
  const nomineeSchema = Yup.object().shape({
    nominees: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .matches(
              /^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/,
              t("Nominee name invalid")
            )
            .required(t("Nominee name required")),
          percentage: Yup.number()
            .min(1, t("at least 1%"))
            .max(100, t("max 100%"))
            .required(t("percentage required")),
        })
      )
      .test(
        "total-100",
        t("Total percentage cannot exceed 100%"),
        (nominees) => {
          const total = nominees.reduce(
            (sum, n) => sum + (Number(n.percentage) || 0),
            0
          );
          return total <= 100;
        }
      ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nominees: [{ name: "", percentage: "" }],
      loginUserId: userData?._id,
    },
    validationSchema: nomineeSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const payload = id ? { id, ...values } : values;
        const res = await Index.DataService.post(
          Index.Api.ADD_EDIT_NOMINEE,
          payload
        );

        if (res?.data?.status) {
          Index.toasterSuccess(
            id
              ? t("Nominee updated successfully")
              : t("Nominee added successfully")
          );
          resetForm();
          navigate("/nominee");
        } else {
          Index.toasterError(res?.data?.message || t("Failed to save nominee"));
        }
      } catch (err) {
        console.error("Error saving nominee", err);
        Index.toasterError(
          err?.response?.data?.message || t("Something went wrong")
        );
      } finally {
        setLoading(false);
      }
    },
  });

  // Fetch employees
  useEffect(() => {
    (async () => {
      try {
        const res = await Index.DataService.get(Index.Api.GET_USER_MANAGEMENT);
        if (res?.data?.status) setEmployees(res.data.data);
        else
          Index.toasterError(
            res?.data?.message || t("Failed to load employees")
          );
      } catch (err) {
        console.error("Fetch employees error", err);
        Index.toasterError(t("An unexpected error occurred"));
      }
    })();
  }, []);

  // Fetch nominee by ID
  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const res = await Index.DataService.get(
          `${Index.Api.GET_NOMINEE_BY_ID}/${id}`
        );
        if (res?.data?.status)
          formik.setValues({ nominees: res.data.data.nominees });
        else
          Index.toasterError(res?.data?.message || t("Failed to load nominee"));
      } catch (err) {
        console.error("Fetch nominee error", err);
        Index.toasterError(t("An unexpected error occurred"));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="receive-center">
        <Index.Box className="flex-header-title">
          <button className="back-btn" onClick={() => navigate("/nominee")}>
            <img src={Index.back} alt="Back" />
          </button>
        </Index.Box>
        <div className="app-icon">
          <img src={Index.logo} alt="PocketPi" className="logo-header" />
        </div>
      </header>

      {/* White panel */}
      <Index.Box className="invoice-details">
        <Index.Box className="invoices-heading">
          <Index.Typography component="p" className="title-header">
            {id ? t("Edit Nominee") : t("Add Nominee")}
          </Index.Typography>
        </Index.Box>

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <FieldArray
              name="nominees"
              render={(arrayHelpers) => (
                <>
                  {formik.values.nominees.map((nominee, index) => (
                    <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                      {/* Name */}
                      <Grid item xs={4}>
                        <Index.FormHelperText
                          component="label"
                          className="form-labels"
                        >
                          {t("Name")}{" "}
                          <span
                            className="error-star"
                            style={{ marginRight: "50px" }}
                          >
                            *
                          </span>
                        </Index.FormHelperText>
                        <input
                          type="text"
                          className="user-form-control"
                          value={nominee.name}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `nominees[${index}].name`,
                              e.target.value ? String(e.target.value) : ""
                            )
                          }
                          placeholder="Enter name"
                          style={{
                            height: 45,
                            borderRadius: 12,
                            padding: "0 10px",
                          }}
                        />
                        {formik.touched.nominees?.[index]?.name &&
                          formik.errors.nominees?.[index]?.name && (
                            <p className="input-error">
                              {formik.errors.nominees[index].name}
                            </p>
                          )}
                      </Grid>

                      {/* Percentage input */}
                      <Grid item xs={4}>
                        <Index.FormHelperText
                          component="label"
                          className="form-labels"
                        >
                          {t("Percentage")}{" "}
                          <span
                            className="error-star"
                            style={{ marginRight: "15px" }}
                          >
                            *
                          </span>
                        </Index.FormHelperText>
                        <input
                          type="number"
                          className="user-form-control"
                          value={nominee.percentage}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `nominees[${index}].percentage`,
                              e.target.value ? Number(e.target.value) : ""
                            )
                          }
                          placeholder="Enter %"
                          style={{
                            height: 45,
                            borderRadius: 12,
                            padding: "0 10px",
                          }}
                          onWheel={(e) => e.target.blur()}
                        />
                        {formik.touched.nominees?.[index]?.percentage &&
                          formik.errors.nominees?.[index]?.percentage && (
                            <p className="input-error">
                              {formik.errors.nominees[index].percentage}
                            </p>
                          )}
                      </Grid>

                      {/* Remove button */}
                      {formik.values.nominees.length > 1 && (
                        <Grid item xs={2}>
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={() => arrayHelpers.remove(index)}
                            style={{ marginLeft: "350px" }}
                          >
                            {t("Remove")}
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  ))}

                  {/* Add Nominee Button */}
                  <Button
                    variant="outlined"
                    onClick={() =>
                      arrayHelpers.push({ nomineeId: "", percentage: "" })
                    }
                  >
                    {t("Add")}
                  </Button>

                  {/* Total percentage error */}
                  {typeof formik.errors.nominees === "string" && (
                    <Typography color="error" sx={{ mt: 1 }}>
                      {formik.errors.nominees}
                    </Typography>
                  )}
                </>
              )}
            />

            {/* Submit button */}
            <div className="common-btn-space-main" style={{ marginTop: 20 }}>
              <button
                type="submit"
                className="common-btn primary-btn"
                disabled={formik.isSubmitting || loading || !formik.isValid}
              >
                {formik.isSubmitting || loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : id ? (
                  t("Update")
                ) : (
                  t("Save")
                )}
              </button>
            </div>
          </form>
        </FormikProvider>
      </Index.Box>
    </div>
  );
}

export default AddNominee;
