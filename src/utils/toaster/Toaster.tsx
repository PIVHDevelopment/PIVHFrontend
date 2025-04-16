import toast from "react-hot-toast";
import { ToastMessage } from "./tosterInterface";

const toasterSuccess = (msg: string) => {
  toast.success(msg);
};

const toasterError = (msg: string) => {
  if (msg) {
    toast.error(msg);
  }
};

const toasterInfo = (msg: ToastMessage) => {
  toast(() => (
    <span>
      <p>
        <b>{msg.title}</b>
      </p>
      <p>{msg.body}</p>
    </span>
  ));
};

export { toasterSuccess, toasterError, toasterInfo };
