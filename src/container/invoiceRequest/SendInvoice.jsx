import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, getIn } from "formik";
import VerificationPin from "../verificationPin/VerificationPin";

function SendInvoice() {
  const { t } = Index.useTranslation();
  const [userList, setUserList] = useState([]);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const [checkUser, setCheckUser] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);

  const handleGetData = () => {
    Index.DataService.get(`${Index.Api.GET_USERS}`).then((res) => {
      let filter = res?.data?.data?.filter((ele) => ele?._id !== userData?._id);
      setUserList(filter);
    });
  };

  const [txnData, setTxnData] = useState({});

  const location = Index.useLocation();
  const type = location?.state?.typeTxn;
  const data = location?.state?.data;
  let scannerResult = location?.state?.scannerResult;
  console.log({ scannerResult });
  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
  });

  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();

  const balance = location?.state?.balance;
  let typeTxn = location?.state?.typeTxn;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const capitalizedType = type?.charAt(0)?.toUpperCase() + type?.slice(1);
        const res = await Index.DataService.get(
          Index.Api.GET_ADDRESS + "/" + userData?._id + "/" + capitalizedType
        );
        const resAllData = await Index.DataService.get(Index.Api.GET_USERS);

        const checkUsers = resAllData?.data?.data;
        if (res?.data?.status && Array.isArray(res?.data?.data)) {
          const rawUsers = res?.data?.data;
          const filteredUsers = rawUsers.filter((user) => {
            const match = checkUsers.find(
              (cu) => cu.userName === user.userName
            );
            return !(match && match.isBlocked);
          });
          setCheckUser(checkUsers);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    getUsers();
  }, []);

  const handleSubmitFunction = async (values) => {
    const pin = values.pinFields.join("");
    setButtonLoader(true);
    const paymentData = {
      amount: txnData?.amount,
      title: txnData?.title,
      pin,
      typeTxn,
      metadata: {
        userName: txnData?.userName,
        uid: userData?.uid,
        type: "Invoice",
      },
    };

    try {
      const res = await Index.DataService.post(
        Index.Api.PAYMENT_SEND,
        paymentData
      );
      if (res?.data?.status) {
        Index.toasterSuccess(res?.data?.message);
        navigate("/transaction-success", {
          state: { isBusiness: type == "business" ? true : false },
        });
      } else {
        Index.toasterError(res?.data?.message || "SomethingWrong");
      }
    } catch (error) {
      Index.toasterError(
        error?.response?.data?.message || "AnUnexpectedErrorOccurred"
      );
    } finally {
      setButtonLoader(false);
    }
  };

  const handleSubmit = async (values) => {
    const invoiceData = {
      sendReqUserId: userData?._id,
      receiveReqUserId: values?.userId,
      items:
        values?.items?.map((item) => ({
          title: item.title,
          amount: item.amount,
        })) || [],
    };

    try {
      const res = await Index.DataService.post(
        Index.Api.CREATE_INVOICE,
        invoiceData
      );
      if (res?.data?.status) {
        Index.toasterSuccess(res?.data?.message);
        navigate("/home");
      } else {
        Index.toasterError(res?.data?.message || "SomethingWrong");
      }
    } catch (error) {
      Index.toasterError(
        error?.response?.data?.message || "AnUnexpectedErrorOccurred"
      );
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <>
      {buttonLoader ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          {nextPage ? (
            <VerificationPin
              handleSubmitFunction={handleSubmitFunction}
              setNextPage={setNextPage}
            />
          ) : (
            <>
              <header className="receive-center">
                <Index.Box className="flex-header-title">
                  <button
                    className="back-btn"
                    onClick={() =>
                      navigate("/home", {
                        state: {
                          isBusiness: type == "business" ? true : false,
                        },
                      })
                    }
                  >
                    <img src={Index.back} alt="Back" />
                  </button>
                </Index.Box>
                <div className="app-icon">
                  <img
                    src={Index.logo}
                    alt={"PocketPi"}
                    className="logo-header"
                  />
                </div>
                <div className="header-right"></div>
              </header>

              <Index.Box className="invoice-details">
                <Index.Box className="invoices-heading">
                  <Index.Typography component="p" className="title-header">
                    Create Bill / Invoice
                  </Index.Typography>
                </Index.Box>
{console.log("ddddddddd", data)}
                <Index.Box className="invoices-details-content">
                  <Index.Box className="invoices-flex-space">
                    <Index.Box className="invoices-content">
                      <Index.Typography
                        component="p"
                        className="invoices-heading-num"
                      >
                        Invoice #{data + 1}
                      </Index.Typography>
                      <Index.Typography
                        component="p"
                        className="invoices-heading-date"
                      >
                        08 sept 2025 <span>- 7 day(s) to due</span>
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Formik
                  enableReinitialize
                  initialValues={{
                    userId: formValues?.userId || "",
                    userName: formValues?.userName || text, // keep this if you need to show selected username
                    items: formValues?.items?.length
                      ? formValues.items
                      : [
                          {
                            title: "",
                            amount: "",
                          },
                        ],
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={Index.sendPiFormSchema(t)}
                  innerRef={formRef}
                >
                  {(formik) => {
                    useEffect(() => {
                      if (scannerResult && !formik.values.userName) {
                        formik.setFieldValue("userName", scannerResult);
                        setInputValue(scannerResult);
                      }
                    }, [scannerResult]);

                    return (
                      <form onSubmit={formik.handleSubmit}>
                        {/* Party Name */}
                        <Index.Box className="input-bg-white-party">
                          <div className="input-box">
                            <div className="user-form-group">
                              <Index.FormHelperText
                                component="label"
                                className="form-labels"
                              >
                                Party Name <span className="error-star">*</span>
                              </Index.FormHelperText>

                              <Autocomplete
                                options={userList}
                                getOptionLabel={(option) => option.userName}
                                className="kyb-autocomplete-input user-form-control"
                                value={
                                  userList.find(
                                    (u) => u._id === formik.values.userId
                                  ) || null
                                }
                                onChange={(e, value) =>
                                  formik.setFieldValue(
                                    "userId",
                                    value?._id || ""
                                  )
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="userId"
                                    className="dropdown-select"
                                    placeholder="Select User"
                                  />
                                )}
                              />

                              <p className="input-error">
                                {formik.touched.userId && formik.errors.userId}
                              </p>
                            </div>
                          </div>

                          {/* Items Section */}
                          <Index.Box className="input-item-box">
                            <Index.Box className="title-items-details">
                              <Index.Typography className="heading-items">
                                ITEMS
                              </Index.Typography>
                            </Index.Box>

                            <FieldArray name="items">
                              {({ push, remove }) => (
                                <>
                                  {formik?.values?.items?.map((_, index) => {
                                    const titleError = getIn(
                                      formik.errors,
                                      `items[${index}].title`
                                    );
                                    const titleTouched = getIn(
                                      formik.touched,
                                      `items[${index}].title`
                                    );
                                    const amountError = getIn(
                                      formik.errors,
                                      `items[${index}].amount`
                                    );
                                    const amountTouched = getIn(
                                      formik.touched,
                                      `items[${index}].amount`
                                    );

                                    return (
                                      <Index.Box
                                        key={index}
                                        className="items-show-multiple"
                                      >
                                        {/* Title */}
                                        <div className="input-box">
                                          <Index.FormHelperText
                                            component="label"
                                            className="form-labels"
                                          >
                                            Enter Title{" "}
                                            <span className="error-star">
                                              *
                                            </span>
                                          </Index.FormHelperText>
                                          <div className="user-form-group">
                                            <input
                                              type="text"
                                              className="user-form-control"
                                              placeholder="Enter Title"
                                              name={`items[${index}].title`}
                                              value={
                                                formik.values.items[index].title
                                              }
                                              onChange={formik.handleChange}
                                            />
                                          </div>
                                          <p className="input-error">
                                            {titleTouched && titleError
                                              ? titleError
                                              : null}
                                          </p>
                                        </div>

                                        {/* Amount */}
                                        <div className="input-box">
                                          <Index.FormHelperText
                                            component="label"
                                            className="form-labels"
                                          >
                                            Enter Amount{" "}
                                            <span className="error-star">
                                              *
                                            </span>
                                          </Index.FormHelperText>
                                          <div className="user-form-group">
                                            <input
                                              type="text"
                                              className="user-form-control"
                                              placeholder="Enter Amount"
                                              name={`items[${index}].amount`}
                                              value={
                                                formik.values.items[index]
                                                  .amount
                                              }
                                              onChange={(e) => {
                                                const value = e.target.value;
                                                if (
                                                  /^\d*\.?\d{0,5}$/.test(value)
                                                ) {
                                                  formik.setFieldValue(
                                                    `items[${index}].amount`,
                                                    value
                                                  );
                                                }
                                              }}
                                            />
                                          </div>
                                          <p className="input-error">
                                            {amountTouched && amountError
                                              ? amountError
                                              : null}
                                          </p>
                                        </div>

                                        {/* Remove Button */}
                                        {formik.values.items.length > 1 && (
                                          <Index.Button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="remove-btn"
                                          >
                                            Remove
                                          </Index.Button>
                                        )}
                                      </Index.Box>
                                    );
                                  })}

                                  {/* Add Items Button */}
                                  <Index.Box className="button-add-items">
                                    <Index.Button
                                      type="button"
                                      className="btn-items"
                                      onClick={() =>
                                        push({ title: "", amount: "" })
                                      }
                                    >
                                      Add Items
                                    </Index.Button>
                                  </Index.Box>
                                </>
                              )}
                            </FieldArray>
                          </Index.Box>
                        </Index.Box>

                        {/* Total Pi Amount */}
                        <div className="amount-section">
                          <label>EnterPiAmount</label>
                          <p className="amount-display">
                            {formik?.values?.items?.reduce(
                              (sum, item) =>
                                sum + parseFloat(item.amount || "0"),
                              0
                            ) || "0"}{" "}
                            Pi
                          </p>
                        </div>

                        {/* Submit */}
                        <div className="common-btn-space-main">
                          <button
                            className="common-btn primary-btn"
                            type="submit"
                            disabled={buttonLoader}
                          >
                            Create Invoice
                          </button>
                        </div>
                      </form>
                    );
                  }}
                </Index.Formik>
              </Index.Box>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SendInvoice;
