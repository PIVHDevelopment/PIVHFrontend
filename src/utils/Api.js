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

  ADD_UPDATE_ADDRESS: "/user/add-update-address",
  GET_ADDRESS: "/user/get-address-book",
  DELETE_ADDRESS: "/user/delete-address",

  ADD_SUBSCRIPTION:"/user/update-subscription-status",
  
  FETCH_QR_CODE:"/payments/fetch-qr-code",

  ADD_UPDATE_WALLET_ADDRESS: "/user/add-update-wallet-address",
  GET_WALLET_ADDRESS: "/user/get-wallet-address-book",
  DELETE_WALLET_ADDRESS: "/user/delete-wallet-address",


  ADD_UPDATE_PAYMENT_REQUEST: "/payments/create-payment-request",
  GET_PAYMENT_REQUEST: "/payments/fetch-payment-request",
  ACCEPT_PAYMENT_REQUEST: "/payments/accept-payment-request",
  
};

export default Api;
