const Api = {
  SIGN_IN: "user/sign-in",
  SIGN_OUT: "user/sign-out",

  PAYMENT_INCOMPLETE: "/payments/payment-incomplete",
  PAYMENT_APPROVE: "/payments/payment-approve",
  PAYMENT_COMPLETE: "/payments/payment-complete",
  PAYMENT_CANCEL: "/payments/payment-cancel",

  GET_TRANSACTIONS: "/payments/get-transactions",

  PAYMENT_DEPOSITE_INCOMPLETE: "/payments/payment-deposit-incomplete",
  PAYMENT_DEPOSITE: "/payments/payment-deposit",
  PAYMENT_DEPOSITE_COMPLETE: "/payments/payment-deposit-complete",
  PAYMENT_DEPOSITE_CANCEL: "/payments/payment-deposit-cancel",

  PAYMENT_SEND: "/payments/payment-send",

  ADD_WALLET_ADDRESS: "/user/add-wallet-address",

  WITHDRAW:"/payments/withdraw",
};

export default Api;
