import * as Yup from "yup";

export const sendPiFormSchema = (t) =>
  Yup.object({
    userName: Yup.string().required(t("PleaseEnterUserName")),
    // .test("check username", "You can't send pi coins to own account", (val) => {
    //   const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
    //   return val !== userData?.userName;
    // }),
    amount: Yup.string()
      .required(t("PleaseEnterAmount"))
      .test("min-amount", t("PleaseEnterAmountAtLeast"), (value) => {
        const num = parseFloat(value || "0");
        return num >= 0.001;
      }),
    memo: Yup.string().required(t("PleaseEnterMemo")),
  });
export const depositPiFormSchema = (t) =>
  Yup.object({
    amount: Yup.string()
      .required(t("PleaseEnterAmount"))
      .test("min-amount", t("PleaseEnterAmountAtLeaseMust"), (value) => {
        const num = parseFloat(value || "0");
        return num >= 0.05;
      }),
  });
export const withdrawPiFormSchema = (t) =>
  Yup.object({
    amount: Yup.string()
      .required(t("PleaseEnterAmount"))
      .test("min-amount", t("PleaseEnterAmountAtLeaseMust1"), (value) => {
        const num = parseFloat(value || "0");
        return num >= 0.01;
      }),
    address: Yup.string().required(t("PleaseEnterWallet")),
  });
export const addWalletAddressFormSchema = (t) =>
  Yup.object({
    walletAddress: Yup.string().required(t("PleaseEnterWalletAddress")),
  });

export const addBusinessAddressFormSchema = (t) =>
  Yup.object({
    userName: Yup.string().required(t("PleaseEnterUserName")),
    businessName: Yup.string().required(t("PleaseEnterBusinessName")),
  });

export const addFeedbackFormSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .matches(
      /^(([^<>()[\]\\.,;:-\s@#"]+(\.[^<>()[\]\\.,;:-\s@#"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter a valid email"
    )
    .required("Email is required"),
  description: Yup.string().required("Description is required"),
});

export const addPaymentRequestSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  amount: Yup.string().required("Amount is required"),
  description: Yup.string().required("Description is required"),
});

export const addVerificationPinSchema=(t) => Yup.object().shape({
  pinFields: Yup.array()
    .of(Yup.string().matches(/^\d$/, "Only digits allowed"))
    .test("pin-required", t("PleaseEnterPin"), (arr) =>
      arr.some((val) => val && val.trim() !== "")
    )
    .test(
      "pin-length",
      t("PINDigits"),
      (arr) => arr.filter((val) => val && val.trim() !== "").length === 5
    ),
});

export const addWalletAddressBookSchema = Yup.object({
  walletAddress: Yup.string()
    .min(3, "Wallet Address must be at least 3 characters")
    .required("Wallet Address is required"),
});

  export const addAddressBookSchema =Yup.object({
    type: Yup.string().required("Type is required"),
    name: Yup.string()
      .required("Name is required")
      .matches(
        /^\S.*\S$|^\S$/,
        "Name cannot start or end with a space"
      ),
    userName: Yup.string()
      .required("Username is required")
      .matches(/^\S+$/, "Username cannot contain spaces"),
  })

  export const addKybVerificationSchema =  Yup.object({
    country: Yup.object().nullable().required("Country is required"),
    frontDocument: Yup.mixed().when("country", {
      is: (val) => val?.name === "India",
      then: (schema) =>
        schema
          .required("Aadhar card front is required")
          .test(
            "fileSize",
            "File too large, please upload less than 5MB",
            (value) => !value || value.size <= 5 * 1024 * 1024
          )
          .test(
            "fileType",
            "Unsupported file format",
            (value) =>
              !value ||
              ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              )
          ),
      otherwise: (schema) => schema.nullable(),
    }),
    backDocument: Yup.mixed().when("country", {
      is: (val) => val?.name === "India",
      then: (schema) =>
        schema
          .required("Aadhar card back is required")
          .test(
            "fileSize",
            "File too large",
            (value) => !value || value.size <= 5 * 1024 * 1024
          )
          .test(
            "fileType",
            "Unsupported file format",
            (value) =>
              !value ||
              ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              )
          ),
      otherwise: (schema) => schema.nullable(),
    }),
    singleDocument: Yup.mixed().when("country", {
      is: (val) => val?.name !== "India",
      then: (schema) =>
        schema
          .required("Document is required")
          .test(
            "fileSize",
            "File too large",
            (value) => !value || value.size <= 5 * 1024 * 1024
          )
          .test(
            "fileType",
            "Unsupported file format",
            (value) =>
              !value ||
              ["application/pdf", "image/jpeg", "image/png"].includes(
                value.type
              )
          ),
      otherwise: (schema) => schema.nullable(),
    }),
  })
