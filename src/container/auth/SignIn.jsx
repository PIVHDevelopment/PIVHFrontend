import React, { useState } from "react";
import Index from "../Index";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function SignIn() {
  const navigate = Index.useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const onIncompletePaymentFound = (payment) => {
    return Index.DataService.post(Index.Api.PAYMENT_DEPOSITE_INCOMPLETE, {
      payment,
    });
  };
  const signIn = async () => {
    setIsLoading(true);
    const scopes = ["username", "payments", "wallet_address"];
    const authResult = await window.Pi.authenticate(
      scopes,
      onIncompletePaymentFound
    );
    signInUser(authResult);
    sessionStorage.setItem(
      "user_token",
      JSON.stringify(authResult.accessToken)
    );
  };
  const signInUser = (authResult) => {
    // alert("Hey : ");
    Index.DataService.post(Index.Api.SIGN_IN, { authResult })
      .then((res) => {
        let userData = res?.data?.data;
        sessionStorage.setItem("pi_user_data", JSON.stringify(userData));
        if (!userData?.userTxn?.isPin) {
          navigate("/set-txn-pin");
        } else if (!userData?.userTxn.isQuestion) {
          navigate("/set-recovery-pin-question");
        } else {
          navigate("/home");
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

  return (
    <>
      {isLoading ? (
        <Index.Loader />
      ) : (
        <div className="app-container signin-main">
          <div className="p-20">
            <header className="signin-header">
              <div
                className="app-icon"
                style={{
                  textAlign: "center",
                  flex: "0 0 33.3%",
                  height: "80px",
                }}
              >
                <img src={Index.pocketPi2} alt="PocketPi" />
              </div>
            </header>
            <div className="sigin-body">
              <button className="secondary-btn share-btn" onClick={signIn}>
                {/* {isLoading ? (
              <Spinner animation="border" role="status" size="sm" />
            ) : ( */}
                Sign In
                {/* )} */}
              </button>
            </div>
          </div>
          <div className="sigin-footer">
            <p onClick={() => navigate("/term-conditions")}>
              Terms & Conditions
            </p>
            <p onClick={() => navigate("/privacy-policy")}>Privacy Policy</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
