import React, { useRef, useState } from "react";
import Index from "../Index";

function AddWallet() {
  const { t } = Index.useTranslation();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const formRef = useRef();
  const navigate = Index.useNavigate();
  const [text, setText] = useState(userData?.walletAddress || "");
  const handleSubmitFunction = async (values) => {
    const paymentData = {
      id: userData?.uid,
      walletAddress: values?.walletAddress,
    };
    Index.DataService.post(Index.Api.ADD_WALLET_ADDRESS, paymentData).then(
      (res) => {
        navigate("/home");
        sessionStorage.setItem(
          "pi_user_data",
          JSON.stringify({
            ...userData,
            walletAddress: res?.data?.data?.walletAddress,
          })
        );
      }
    );
  };

  return (
    <div className="app-container">
      <header className="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Index.back} alt="Back" />
        </button>
        <div className="app-icon">
          <img src={Index.pocketPi} alt={t("PocketPi")} />
        </div>
        <div className="header-right"></div>
      </header>
      <Index.Formik
        enableReinitialize
        initialValues={{
          walletAddress: text,
        }}
        onSubmit={handleSubmitFunction}
        validationSchema={Index.addWalletAddressFormSchema(t)}
        innerRef={formRef}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="input-box">
              <div className="user-form-group">
                <input
                  type="text"
                  placeholder={t("EnterWalletAddress")}
                  name="walletAddress"
                  className="user-form-control"
                  value={formik.values.walletAddress}
                  onChange={formik.handleChange}
                />
                {!formik.values.walletAddress && (
                  <button
                    className="paste-btn"
                    type="button"
                    onClick={async () => {
                      const res = await navigator.clipboard.readText();
                      setText(res);
                    }}
                  >
                    {t("Paste")}
                  </button>
                )}
              </div>
              <p className="input-error">
                {formik.errors?.walletAddress && formik.touched?.walletAddress
                  ? formik.errors?.walletAddress
                  : null}
              </p>
              {/* <button className="address-book-link">
                Select from Address Book
              </button> */}
            </div>

            <div className="common-btn-space-main">
              <button className="common-btn" type="submit">
                {t("Save")}
              </button>
            </div>
          </form>
        )}
      </Index.Formik>
    </div>
  );
}

export default AddWallet;
