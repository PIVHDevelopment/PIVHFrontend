const Api = {
  SIGN_IN: "user/sign-in",
  SIGN_OUT: "user/sign-out",

  SET_PIN_QUESTION: "user/add-edit-usertxn-pin",
  SET_PIN_QUESTION_BUSINESS: "user/add-edit-businesstxn-pin",

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
  GET_USERS: "/user/get-users",

  WITHDRAW: "/payments/withdraw",
  BUSINESS_DEPOSITE: "/payments/business-deposit",

  UPGRADE_BUSINESS_DETAIL: "/user/upgrade-business-details",
  GET_RECOVER_QUESTION: "/user/get-recovery-question",
  VERIFY_ANSWER: "/user/verify-answer",
  GET_BUSINESS_DETAIL: "/user/get-business-details",
};

export default Api;
