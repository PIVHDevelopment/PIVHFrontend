import React, { useRef, useState } from "react";
import Index from "../Index";

function UpgradeBusiness() {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();

  const handleSubmitFunction = async (values) => {
    const paymentData = {
      id: userData?.uid,
      businessUserName: values?.userName,
      businessName: values?.businessName,
    };

    Index.DataService.post(Index.Api.UPGRADE_BUSINESS_DETAIL, paymentData).then(
      (res) => {
        sessionStorage.setItem(
          "pi_user_data",
          JSON.stringify({
            ...userData,
            businessUserName: res?.data?.data?.businessUserName,
            businessName: res?.data?.data?.businessName,
          })
        );
        if (res.status === 200) navigate("/check-kyb-verification");
      }
    );
  };

  return (
    <div className="app-container">
      <header className="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Index.back} alt="Back" />
        </button>
        <div className="app-icon" style={{ marginLeft: "-26px" }}>
          <img src={Index.pocketPi} alt="PocketPi" />
        </div>
        <div className="header-right"></div>
      </header>
      <Index.Formik
        enableReinitialize
        initialValues={{
          userName: "",
          businessName: "",
        }}
        onSubmit={handleSubmitFunction}
        validationSchema={Index.addBusinessAddressFormSchema}
        innerRef={formRef}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="send-form">
            <h5> Upgrade to business version</h5>
            <div className="input-group">
              <div className="input-wrapper send-input-box">
                <input
                  type="text"
                  placeholder="Enter User Name"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="input-error">
                {formik.errors?.userName && formik.touched?.userName
                  ? formik.errors?.userName
                  : null}
              </div>
            </div>

            <div className="input-group">
              <div className="input-wrapper send-input-box">
                <input
                  type="text"
                  placeholder="Enter Business Name"
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

            <button className="action-btn full-width send-pi-btn" type="submit">
              Save
            </button>
          </form>
        )}
      </Index.Formik>
    </div>
  );
}

export default UpgradeBusiness;
