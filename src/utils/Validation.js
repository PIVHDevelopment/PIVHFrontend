import * as Yup from "yup";

export const sendPiFormSchema = Yup.object({
  userName: Yup.string()
    .required("Please enter user name")
    .test("check username", "You can't send pi coins to own account", (val) => {
      const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
      return val !== userData?.userName;
    }),
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
    .test("min-amount", "Amount must be at least 0.001", (value) => {
      const num = parseFloat(value || "0");
      return num >= 0.0001;
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
