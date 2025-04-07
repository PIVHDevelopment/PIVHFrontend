import React, { useState } from "react";
import Index from "../Index";

function SignIn() {
  const [user, setUser] = useState(null);

  const onIncompletePaymentFound = (payment) => {
    console.log("onIncompletePaymentFound", payment);
    return Index.DataService.post("/payments/incomplete", { payment });
  };
  const signIn = async () => {
    const scopes = ["username", "payments"];
    const authResult = await window.Pi.authenticate(
      scopes,
      onIncompletePaymentFound
    );
    signInUser(authResult);
    setUser(authResult.user);
  };
  const signInUser = (authResult) => {
    Index.DataService.post("user/signin", { authResult });
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
