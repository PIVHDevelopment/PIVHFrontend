const Api = {
  SIGN_IN: "user/sign-in",
  SIGN_OUT: "user/sign-out",
  
  PAYMENT_INCOMPLETE: "/payments/payment-incomplete",
  PAYMENT_APPROVE: "/payments/payment-approve",
  PAYMENT_COMPLETE: "/payments/payment-complete",
  PAYMENT_CANCEL: "/payments/payment-cancel",

  GET_TRANSACTIONS: "/payments/get-transactions",
  PAYMENT_SEND_INCOMPLETE: "/payments/payment-send-incomplete",
  PAYMENT_SEND: "/payments/payment-send",
  PAYMENT_SEND_COMPLETE: "/payments/payment-send-complete",
  PAYMENT_SEND_CANCEL: "/payments/payment-send-cancel",
  
  ADD_WALLET_ADDRESS: "/user/add-wallet-address",
};

export default Api;
