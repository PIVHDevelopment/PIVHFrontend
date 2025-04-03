import React from "react";

const modalStyle = {
  background: "white",
  position: "absolute",
  left: "15vw",
  top: "40%",
  width: "70vw",
  height: "25vh",
  border: "1px solid black",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default function SignIn(props) {
  return (
    <div style={modalStyle}>
      <p style={{ fontWeight: "bold" }}>You need to sign in first.</p>
      <div>
        <button onClick={props.onSignIn} style={{ marginRight: "1em" }}>
          Sign in
        </button>
        <button onClick={props.onModalClose}>Close</button>
      </div>
    </div>
  );
}
