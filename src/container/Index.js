

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TablePagination,
  List,
  ListItem,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  ListItemButton,
  TextField,
  Tabs,
  Tab,
  Switch,
  CircularProgress,
  Drawer,
  Select,
  // CircularProgress,
  Grid,
  InputLabel,
  ListItemText,
  Collapse,
  TextareaAutosize,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from "@mui/material";
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
import copyLink from "../assets/images/copy-link.png";

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
import verify from "../assets/images/verify.png";
import walletAddressBook from "../assets/images/phone-book.png";
import paymentRequestIcon from "../assets/images/paymentRequestIcon.png";
import paymentRequestIcon2 from "../assets/images/payementRequestIcon2.png";
import successfullIcon from "../assets/images/succes-icon.svg";
import piWallettImg from "../assets/images/pi-wallet.png"; 
import complainIcon from "../assets/images/complain.png"; 
import languageImg from "../assets/images/vector.png";
import downblackAarrow from "../assets/images/down-black-arrow.svg";
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
  addFeedbackFormSchema,
  addPaymentRequestSchema,
  addVerificationPinSchema,
  addWalletAddressBookSchema,
  addAddressBookSchema,
  addKybVerificationSchema,
} from "../utils/Validation";
import moment from "moment";
import {
  toasterSuccess,
  toasterError,
  toasterInfo,
} from "../utils/toaster/Toaster";
import Loader from "../common/loader/Loader";
import piCoiImg from "../assets/images/pi-coin.png";
import NoDataFound from "../common/noDataFound/NoDataFound";
import { useTranslation } from "react-i18next";


const Index = {
  Modal,
  TabContainer,
  successIcon,
  markIcon,
  TabContent,
  TabPane,
  pocketPi,
  copyLink,
  pocketPi2,
  profile,
  logout,
  scan,
  toasterSuccess,
  toasterError,
  toasterInfo,
  setting,
  useTranslation,
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
  languageImg,
  downblackAarrow,
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
  subscriberIcon,
  verify,
  walletAddressBook,
  paymentRequestIcon,
  paymentRequestIcon2,
  successfullIcon,
  piCoiImg,
  piWallettImg,
  complainIcon,
  NoDataFound,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TablePagination,
  List,
  ListItem,
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  ListItemButton,
  TextField,
  Tabs,
  Tab,
  Switch,
  CircularProgress,
  Drawer,
  Select,
  // CircularProgress,
  Grid,
  InputLabel,
  ListItemText,
  Collapse,
  TextareaAutosize,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  addFeedbackFormSchema,
  addPaymentRequestSchema,
  addVerificationPinSchema,
  addWalletAddressBookSchema,
  addAddressBookSchema,
  Autocomplete,
  addKybVerificationSchema,
};

export default Index;
