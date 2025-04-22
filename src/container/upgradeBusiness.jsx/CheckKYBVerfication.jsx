import React, { useRef, useState } from "react";
import Index from "../Index";

function CheckKYBVerfication() {
  const businessData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();

  const handleSubmitFunction = async (values) => {
    console.log(values);

    const paymentData = {
      id: businessData?.uid,
      userName: values?.userName,
      businessName: values?.businessName,
    };

    // Index.DataService.post(Index.Api.ADD_WALLET_ADDRESS, paymentData).then(
    //   (res) => {
    //     navigate("/home");
    //     sessionStorage.setItem(
    //       "pi_user_data",
    //       JSON.stringify({
    //         ...businessData,
    //         walletAddress: res?.data?.data?.walletAddress,
    //       })
    //     );
    //   }
    // );
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
          <form
            //   onSubmit={formik.handleSubmit}
            className="send-form"
          >
            <button className="action-btn full-width send-pi-btn">
              KYB Verification
            </button>
            <button
            //   onClick={() => navigate("/")}
              className="action-btn full-width send-pi-btn"
            >
              Skip for now
            </button>
          </form>
        )}
      </Index.Formik>
    </div>
  );
}

export default CheckKYBVerfication;
