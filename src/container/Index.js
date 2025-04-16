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
import share from "../assets/images/Share.png";
import back from "../assets/images/Back.png";
import { Modal, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataService from "../utils/DataService";
import Api from "../utils/Api";
import { Formik } from "formik";
import {
  sendPiFormSchema,
  addWalletAddressFormSchema,
  depositPiFormSchema,
  withdrawPiFormSchema,
} from "../utils/Validation";
import moment from "moment";
import { toasterSuccess, toasterError, toasterInfo } from "../utils/toaster/Toaster";

const Index = {
  Modal,
  TabContainer,
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
};

export default Index;
