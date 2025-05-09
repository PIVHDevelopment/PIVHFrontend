import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";

function UpgradeBusiness() {
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();
  const [businessData, setBusinessData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmitFunction = async (values) => {
    const paymentData = {
      id: userData?.uid,
      businessUserName: values?.userName,
      businessName: values?.businessName,
    };
    setLoading(true);

    Index.DataService.post(Index.Api.UPGRADE_BUSINESS_DETAIL, paymentData)
      .then((res) => {
        sessionStorage.setItem(
          "pi_user_data",
          JSON.stringify({
            ...userData,
            businessUserName: res?.data?.data?.businessUserName,
            businessName: res?.data?.data?.businessName,
            // roleType: "User_Merchant",
          })
        );

        if (!userData?.businessTxn?.isPin) {
          // Index.toasterSuccess(res?.data?.message?.[language]);
          navigate("/set-txn-pin", { state: { isBusiness: true } });
        } else if (!userData?.businessTxn?.isQuestion) {
          navigate("/set-recovery-pin-question", {
            state: { isBusiness: true },
          });
        } else {
          // Index.toasterSuccess("Your business details updated successfully");
          navigate("/home", { state: { isBusiness: true } });
        }
        setLoading(false);
      })
      .catch((e) => {
        Index.toasterError(
          e?.response?.data?.message?.[language] || t("SomethingWrong")
        );
        setLoading(false);
      });
  };

  const handleGetData = () => {
    Index.DataService.get(
      Index.Api.GET_BUSINESS_DETAIL + `?uid=${userData?.uid}`
    )
      .then((res) => {
        if (res?.data?.status === 200) {
          setBusinessData(res?.data?.data || "");
        }
      })
      .catch((err) => {
        console.log("Failed to fetch question", err);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      {loading ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          <header className="receive-center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <img src={Index.back} alt={t("Back")} />
            </button>
            <div className="app-icon">
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>
          <Index.Formik
            enableReinitialize
            initialValues={{
              userName: businessData?.businessUserName || "",
              businessName: businessData?.businessName || "",
            }}
            onSubmit={handleSubmitFunction}
            validationSchema={Index.addBusinessAddressFormSchema(t)}
            innerRef={formRef}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <h5 className="common-heading">{t("UpgradeVersion")}</h5>
                <div className="input-box">
                  <div className="user-form-group">
                    <input
                      type="text"
                      placeholder={t("EnterUserName")}
                      name="userName"
                      className="user-form-control"
                      value={formik.values.userName}
                      onChange={(e) => {
                        const noSpaces = e.target.value.replace(/\s/g, "");
                        formik.setFieldValue("userName", noSpaces);
                      }}
                      disabled={businessData?.businessUserName}
                    />
                  </div>
                  <div className="input-error">
                    {formik.errors?.userName && formik.touched?.userName
                      ? formik.errors?.userName
                      : null}
                  </div>
                </div>

                <div className="input-box">
                  <div className="user-form-group">
                    <input
                      type="text"
                      className="user-form-control"
                      placeholder={t("EnterBusinessName")}
                      name="businessName"
                      value={formik.values.businessName}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="input-error">
                    {formik.errors?.businessName && formik.touched?.businessName
                      ? formik.errors?.businessName
                      : null}
                  </div>
                </div>

                <div className="common-btn-space-main">
                  <button
                    className="common-btn"
                    type="submit"
                  >
                    {t("Save")}
                  </button>
                </div>
              </form>
            )}
          </Index.Formik>
        </div>
      )}
    </>
  );
}

export default UpgradeBusiness;
