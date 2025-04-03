import React from "react";

const headerStyle = {
  padding: 8,
  backgroundColor: "gray",
  color: "white",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function Header(props) {
  return (
    <header style={headerStyle}>
      <div style={{ fontWeight: "bold" }}>Pi Bakery</div>

      <div>
        {props.user === null ? (
          <button onClick={props.onSignIn}>Sign in</button>
        ) : (
          <div>
            @{props.user.username}{" "}
            <button type="button" onClick={props.onSignOut}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
