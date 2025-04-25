import pocketPi from "../assets/images/PocketPi.png";
import pocketPi2 from "../assets/images/pocketPi2.png";
import profile from "../assets/images/Profile.png";
import scan from "../assets/images/Scan.png";
import logout from "../assets/images/logout.png";
import setting from "../assets/images/Setting.png";
import copy from "../assets/images/Copy.png";
import income from "../assets/images/income.png";
import expense from "../assets/images/expense.png";
import suitcase from "../assets/images/Suitcase.png";
import employee from "../assets/images/Employee.png";
import autopay from "../assets/images/Autopay.png";
import configure from "../assets/images/Configure.png";
import sendMoney from "../assets/images/send-money.png";
import receiveMoney from "../assets/images/receive-money.png";
import downArrow from "../assets/images/down-arrow.png";
import copyBtn from "../assets/images/Copy-Btn.png";
import qrCode from "../assets/images/QR-Code-Receive.png";
import downloadImg from "../assets/images/Download-Btn.png";
import Plusadd from "../assets/images/Plusadd.png";
import walletaddress from "../assets/images/walletaddress.png";
import businessaddress from "../assets/images/businessaddress.png";
import businessversion from "../assets/images/businessversion.png";
import recover from "../assets/images/recover.png";
import withdraw from "../assets/images/withdraw.png";
import deposit from "../assets/images/deposit.png";
import uparrow from "../assets/images/uparrow.png";
import subscribedIcon from "../assets/images/subscribed.png";

import wallet from "../assets/images/wallet.png";
import send from "../assets/images/send.png";
import downarrow from "../assets/images/receive.png";
import share from "../assets/images/Share.png";
import addressbook from "../assets/images/addressbook.png";
import back from "../assets/images/Back.png";
import invisibleIcon from "../assets/images/invisible.svg";
import showIcon from "../assets/images/show.svg";
import markIcon from "../assets/images/mark.svg";
import successIcon from "../assets/images/success.svg";
import scannerIcon from "../assets/images/scanner.svg";
import subscriberIcon from "../assets/images/subscribers.png";
// import pencil from "../assets/images/pencil.png";
// import delete from "../assets/images/delete.png";
import { Modal, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import DataService from "../utils/DataService";
import Api from "../utils/Api";
import { Formik } from "formik";
import {
  sendPiFormSchema,
  addWalletAddressFormSchema,
  depositPiFormSchema,
  withdrawPiFormSchema,
  addBusinessAddressFormSchema,
} from "../utils/Validation";
import moment from "moment";
import { toasterSuccess, toasterError, toasterInfo } from "../utils/toaster/Toaster";
import Loader from "../common/loader/Loader";

const Index = {
  Modal,
  TabContainer,
  successIcon,
  markIcon,
  TabContent,
  TabPane,
  pocketPi,
  pocketPi2,
  profile,
  logout,
  scan,
  toasterSuccess,
  toasterError,
  toasterInfo,
  setting,
  copy,
  income,
  expense,
  suitcase,
  employee,
  autopay,
  configure,
  useNavigate,
  useLocation,
  receiveMoney,
  sendMoney,
  downArrow,
  copyBtn,
  qrCode,
  downloadImg,
  share,
  back,
  DataService,
  Api,
  Formik,
  sendPiFormSchema,
  moment,
  addWalletAddressFormSchema,
  depositPiFormSchema,
  withdrawPiFormSchema,
  addBusinessAddressFormSchema,
  showIcon,
  invisibleIcon,
  Plusadd,
  // pencil,
  // delete,
  addressbook,
  walletaddress,
  businessaddress,
  businessversion,
  recover,
  withdraw,
  deposit,
  send,
  wallet,
  Loader,
  downarrow,
  uparrow,
  scannerIcon,
  subscribedIcon,
  subscriberIcon
};

export default Index;
