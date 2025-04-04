import * as Yup from "yup";

export const sendPiFormSchema = Yup.object({
  userName: Yup.string()
    .required("Please enter user name")
    .test("check username", "You can't send pi coins to own account", (val) => {
      const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
      return val !== userData?.username;
    }),
  amount: Yup.string().required("Please enter amount"),
  memo: Yup.string().required("Please enter memo"),
});
