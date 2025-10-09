import React, { useEffect, useState } from "react";
import Index from "../Index";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function SignIn() {
  const language = localStorage.getItem("language");
  const { t, i18n } = Index.useTranslation();
  const navigate = Index.useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState(language || "En");

  // Disclaimer popup states
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loggedUserData, setLoggedUserData] = useState(null);

  const onIncompletePaymentFound = (payment) => {
    console.log("Incomplete payment found:", payment);
    return Index.DataService.post(Index.Api.PAYMENT_DEPOSITE_INCOMPLETE, {
      payment,
    });
  };

  useEffect(() => {
    if (selectedLang == "Ar") {
      document.body.classList.add("direction-rtl");
    } else {
      document.body.classList.remove("direction-rtl");
    }
    i18n.changeLanguage(selectedLang);
  }, [selectedLang]);

  const signIn = async () => {
    setIsLoading(true);
    const scopes = ["username", "payments", "wallet_address"];
    const authResult = await window.Pi.authenticate(
      scopes,
      onIncompletePaymentFound
    );
    console.log("authResult", authResult);
    signInUser(authResult);
    sessionStorage.setItem(
      "user_token",
      JSON.stringify(authResult.accessToken)
    );
  };

  const signInUser = (authResult) => {
    const payload = {
      accessToken: authResult?.accessToken,
      user: authResult?.user,
      language: selectedLang,
    };

    Index.DataService.post(Index.Api.SIGN_IN, payload)
      .then((res) => {
        console.log("Backend response:", res);
        let userData = res?.data?.data;
        setLoggedUserData(userData);
        // let userData = res?.data?.data.user;
        // let userToken = res?.data?.data.token;
        // localStorage.setItem("user_token", JSON.stringify(userToken));
        sessionStorage.setItem("pi_user_data", JSON.stringify(userData));
        // if (!userData?.userTxn?.isPin) {
        //   navigate("/set-txn-pin");
        // } else if (!userData?.userTxn.isQuestion) {
        //   navigate("/set-recovery-pin-question");
        // } else {
        //   navigate("/home");
        // }
        if (!userData?.disclaimerPopup) {
          setShowDisclaimer(true);
          setUserId(userData?._id);
        } else {
          navigateAfterLogin(userData);
        }
      })
      .catch((err) => {
        sessionStorage.removeItem("user_token");
        sessionStorage.removeItem("pi_user_data");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Navigation after sign-in or popup close
  const navigateAfterLogin = (userData) => {
    if (!userData?.userTxn?.isPin) {
      navigate("/set-txn-pin");
    } else if (!userData?.userTxn.isQuestion) {
      navigate("/set-recovery-pin-question");
    } else {
      navigate("/home");
    }
  };

   // Cancel button handler
  const handleCancel = () => {
    setShowDisclaimer(false);
    navigateAfterLogin(loggedUserData);
  };

  const handleDoNotShowAgain = async () => {
    try {
      await Index.DataService.post(Index.Api.CLOSE_POPUP, { id: userId });
      setShowDisclaimer(false);
      navigateAfterLogin(loggedUserData);
    } catch (err) {
      console.error("Error closing popup:", err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Index.Loader />
      ) : (
        <div className="app-container signin-main">
          <header className="signin-header">
            <img src={Index.logo} alt="PocketPi" className="auth-logo" />
          </header>
          <div className="sigin-body">
            <button className="secondary-btn" onClick={() => signIn()}>
              {/* {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : ( */}
              {t("Sign In")}
              {/* )} */}
            </button>
          </div>

          {/* Language Switcher */}
          <div className="sigin-lang-footer" style={{ display: "none" }}>
            {[
              { code: "En", label: "English" },
              { code: "Ar", label: "Arabic" },
              { code: "Hi", label: "Hindi" },
            ].map((lang) => (
              <p
                key={lang.code}
                className={selectedLang === lang.code ? "active-lang" : ""}
                onClick={() => {
                  setSelectedLang(lang.code);
                  localStorage.setItem("language", lang.code);
                  localStorage.setItem("i18nextLng", lang.code);
                }}
              >
                {lang.label}
              </p>
            ))}
          </div>
          <div className="sigin-footer">
            <p onClick={() => navigate("/term-conditions")}>
              {t("Terms & Conditions")}
            </p>
            <p onClick={() => navigate("/privacy-policy")}>
              {t("Privacy Policy")}
            </p>
          </div>
        </div>
      )}

      {/* Disclaimer Popup */}
      {showDisclaimer && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h4 className="popup-title">{t("Pocket Pi")}</h4>
            <p className="popup-text">
              {t(
                "Please read the note carefully before using the application."
              )}
            </p>
            <div className="popup-actions">
              <button className="close-btn" onClick={handleCancel}>
                {t("Cancel")}
              </button>
              <button className="close-btn" onClick={handleDoNotShowAgain}>
                {t("Do Not Show Again")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
