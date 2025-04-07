import React from "react";
import Index from "../Index";

function SignIn() {
  const navigate = Index.useNavigate();
  const onIncompletePaymentFound = (payment) => {
    return Index.DataService.post(Index.Api.PAYMENT_SEND_INCOMPLETE, {
      payment,
    });
  };
  const signIn = async () => {
    const scopes = ["username", "payments", "wallet_address"];
    const authResult = await window.Pi.authenticate(
      scopes,
      onIncompletePaymentFound
    );
    signInUser(authResult);
    sessionStorage.setItem("pi_user_data", JSON.stringify(authResult.user));
  };
  const signInUser = (authResult) => {
    Index.DataService.post(Index.Api.SIGN_IN, { authResult }).then((res) => {
      navigate("/home");
    });
  };
  return (
    <div className="app-container p-20-0">
      <div className="p-20">
        <header className="signin-header">
          <div
            className="app-icon"
            style={{ textAlign: "center", flex: "0 0 33.3%" }}
          >
            <img src={Index.pocketPi} alt="PocketPi" />
          </div>
        </header>
        <div className="sigin-body">
          <button className="secondary-btn share-btn" onClick={signIn}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
