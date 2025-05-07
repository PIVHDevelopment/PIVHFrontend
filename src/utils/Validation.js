import * as Yup from "yup";

export const sendPiFormSchema = (t) => Yup.object({
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
export const depositPiFormSchema = (t) => Yup.object({
  amount: Yup.string()
    .required(t("PleaseEnterAmount"))
    .test("min-amount", t("PleaseEnterAmountAtLeaseMust"), (value) => {
      const num = parseFloat(value || "0");
      return num >= 0.05;
    }),
});
export const withdrawPiFormSchema=(t) => Yup.object({
  amount: Yup.string()
    .required(t("PleaseEnterAmount"))
    .test("min-amount", t("PleaseEnterAmountAtLeaseMust1"), (value) => {
      const num = parseFloat(value || "0");
      return num >= 0.01;
    }),
  address: Yup.string().required(t("PleaseEnterWallet")),
});
export const addWalletAddressFormSchema = (t) => Yup.object({
  walletAddress: Yup.string().required(t("PleaseEnterWalletAddress")),
});

export const addBusinessAddressFormSchema = (t) => Yup.object({
  userName: Yup.string().required(t("PleaseEnterUserName")),
  businessName: Yup.string().required(t("PleaseEnterBusinessName")),
});
