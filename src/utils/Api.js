const Api = {
  SIGN_IN: "user/sign-in",
  SIGN_OUT: "user/sign-out",
  CLOSE_POPUP: "user/close-popup",

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

  ADD_SUBSCRIPTION: "/user/update-subscription-status",

  FETCH_QR_CODE: "/payments/fetch-qr-code",

  ADD_UPDATE_WALLET_ADDRESS: "/user/add-update-wallet-address",
  GET_WALLET_ADDRESS: "/user/get-wallet-address-book",
  DELETE_WALLET_ADDRESS: "/user/delete-wallet-address",

  ADD_UPDATE_PAYMENT_REQUEST: "/payments/create-payment-request",
  GET_PAYMENT_REQUEST: "/payments/fetch-payment-request",
  ACCEPT_PAYMENT_REQUEST: "/payments/accept-payment-request",

  ADD_FEEDBACK: "/user/add-feedback",
  GET_USER_FEEDBACK: "/user/get-feedback",

  GET_SUBS_SETTING: "/user/get-subscription-setting",
  ADD_FEEDBACK: "/user/add-feedback",
  GET_USER_FEEDBACK: "/user/get-feedback",

  ADD_KYB_VERIFICATION: "/user/add-kyb-request",
  GET_KYB_VERIFICATION: "/user/get-kyb-request",
  GET_ALL_KYB_VERIFICATION: "/admin/get-kyb-requests",
  UDATE_KYB_VERIFICATION: "/admin/update-kyb-status",

  GET_LANUGAGE: "/user/get-user-language",
  UPDATE_LANGUAGE: "/user/update-user-language",

  CREATE_INVOICE: "/user/create-invoice",
  RELEASE_PAYMENT: "/user/release-payment",
  GET_INVOICE: "/user/get-invoice-list",
  GET_ONE_INVOICE: "/user/get-invoice",

  ADD_USER_MANAGEMENT: "/user/add-edit-usermanagement",
  GET_USER_MANAGEMENT: "/user/get-user-management-list",
  DELETE_USER_MANAGEMENT: "/user/delete-user-management",
  GET_USER_BY_ID: "/user/get-user-management",
  GET_ALL_USER: "/user/get-all-user",

  ADD_EDIT_PAYROLL: "/user/add-edit-payroll",
  GET_PAYROLL: "/user/get-payroll-list",
  DELETE_PAYROLL: "/user/delete-payroll",
  GET_PAYROLL_BY_ID: "/user/get-payroll",

  ADD_EDIT_EMPLOYEE_ROLE: "/user/add-edit-employeerole",
  GET_EMPLOYEE_ROLE: "/user/get-employeerole-list",
  DELETE_EMPLOYEE_ROLE: "/user/delete-employeerole",
  GET_EMPLOYEE_ROLE_BY_ID: "/user/get-employeerole",

  ADD_EDIT_NOMINEE: "/user/add-edit-nominee",
  GET_NOMINEE: "/user/get-nominee-list",
  DELETE_NOMINEE: "/user/delete-nominee",
  GET_NOMINEE_BY_ID: "/user/get-nominee",

  GET_NOTIFICATION: "/user/get-notification-list",
};

export default Api;
