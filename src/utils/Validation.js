import * as Yup from "yup";

export const sendPiFormSchema = Yup.object({
  userName: Yup.string().required("Please enter username"),
  // .test("check username", "You can't send pi coins to own account", (val) => {
  //   const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  //   return val !== userData?.userName;
  // }),
  amount: Yup.string()
    .required("Please enter amount")
    .test("min-amount", "Amount must be at least 0.001", (value) => {
      const num = parseFloat(value || "0");
      return num >= 0.001;
    }),
  memo: Yup.string().required("Please enter memo"),
});
export const depositPiFormSchema = Yup.object({
  amount: Yup.string()
    .required("Please enter amount")
    .test("min-amount", "Amount must be at least 0.05", (value) => {
      const num = parseFloat(value || "0");
      return num >= 0.05;
    }),
});
export const withdrawPiFormSchema = Yup.object({
  amount: Yup.string()
    .required("Please enter amount")
    .test("min-amount", "Amount must be at least 0.01", (value) => {
      const num = parseFloat(value || "0");
      return num >= 0.01;
    }),
  address: Yup.string().required("Please enter wallet address"),
});
export const addWalletAddressFormSchema = Yup.object({
  walletAddress: Yup.string().required("Please enter wallet address"),
});

export const addBusinessAddressFormSchema = Yup.object({
  userName: Yup.string().required("Please enter user name"),
  businessName: Yup.string().required("Please enter business name"),
});


export const addFeedbackFormSchema = Yup.object({
  email: Yup.string()
  .email("Enter a valid email")
  .matches(
    /^(([^<>()[\]\\.,;:-\s@#"]+(\.[^<>()[\]\\.,;:-\s@#"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Enter the valid email"
  )
  .required("Email is required"),
  description: Yup.string().required("Description is required"),
})


export const addPaymentRequestSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  amount: Yup.string().required("Amount is required"),
  description: Yup.string().required("Description is required"),
})

  export const addVerificationPinSchema = Yup.object().shape({
    pinFields: Yup.array()
      .of(Yup.string().matches(/^\d$/, "Only digits allowed"))
      .test("pin-required", "Please enter PIN", (arr) =>
        arr.some((val) => val && val.trim() !== "")
      )
      .test(
        "pin-length",
        "PIN must be 5 digits",
        (arr) => arr.filter((val) => val && val.trim() !== "").length === 5
      ),
  });

  export const addWalletAddressBookSchema = Yup.object({
    walletAddress: Yup.string()
      .min(3, "Wallet Address must be at least 3 characters")
      .required("Wallet Address is required")
  })

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