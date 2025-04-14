import * as Yup from "yup";

export const sendPiFormSchema = Yup.object({
  userName: Yup.string()
    .required("Please enter user name")
    .test("check username", "You can't send pi coins to own account", (val) => {
      const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
      return val !== userData?.userName;
    }),
  amount: Yup.string().required("Please enter amount"),
  memo: Yup.string().required("Please enter memo"),
});
export const depositPiFormSchema = Yup.object({
  amount: Yup.string().required("Please enter amount"),
});
export const addWalletAddressFormSchema = Yup.object({
  walletAddress: Yup.string().required("Please enter wallet address"),
});
