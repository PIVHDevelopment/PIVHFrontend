import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import PrivacyPolicy from "../container/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../container/termsAndConditions/TermsAndConditions";
import Receive from "../container/receive/Receive";
import Home from "../container/home/Home";
import ReceiveMerchant from "../container/receiveMerchant/ReceiveMerchant";
import Send from "../container/send/Send";
import Shop from "../Shop";
import SignIn from "../container/auth/SignIn";
import PrivateRoutes from "./PrivateRoutes";
import AdminLayOut from "../container/adminLayout/AdminLayOut";
import PublicRoute from "./PublicRoute";
import AddWallet from "../container/addWallet/AddWallet";
import Deposit from "../container/deposit/Deposit";
import Withdraw from "../container/withdraw/Withdraw";
import UpgradeBusiness from "../container/upgradeBusiness.jsx/UpgradeBusiness";
import CheckKYBVerfication from "../container/upgradeBusiness.jsx/CheckKYBVerfication";
import SetTxnPin from "../container/auth/SetTxnPin";
import SetPinRecoveryQuestion from "../container/auth/SetPinRecoveryQuestion";
import SuccessMessage from "../container/auth/SuccessMessage";
import VerifyAnswer from "../container/upgradeBusiness.jsx/VerifyAnswer";
import VerificationPin from "../container/verificationPin/VerificationPin";
import AddressBook from "../container/addressBook/AddressBook";
import Loader from "../common/loader/Loader";
import Subscription from "../container/subscription/Subscription";
import QrScanner from "../container/send/QrScanner";
import WalletAddressBook from "../container/walletAddressBook/WalletAddressBook";
import PaymentRequest from "../container/paymentRequest/PaymentRequest";

function ErrorBoundary() {
  const error = useRouteError(); // Assuming useRouteError is defined somewhere
  return (
    <div className="container">
      <h1>Oh Dang!!</h1> <p>{error?.data}</p>
    </div>
  );
}

const Routers = () => {
  const appRoutes = [
    {
      path: "/",
      element: (
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      ),
    },
    {
      path: "/set-txn-pin",
      element: <SetTxnPin />,
    },
    {
      path: "/set-recovery-pin-question",
      element: <SetPinRecoveryQuestion />,
    },
    {
      path: "/update-pin-successfully",
      element: <SuccessMessage />,
    },
    {
      path: "/verify-answer",
      element: <VerifyAnswer />,
    },
    {
      path: "/subscription",
      element: <Subscription />,
    },
    {
      path: "/shop",
      element: <Shop />,
    },
    {
      path: "/shop",
      element: <Shop />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/term-conditions",
      element: <TermsAndConditions />,
    },
    {
      path: "",
      element: (
        <PrivateRoutes>
          <AdminLayOut />
        </PrivateRoutes>
      ),
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/deposit",
          element: <Deposit />,
        },
        {
          path: "/withdraw",
          element: <Withdraw />,
        },
        {
          path: "/send",
          element: <Send />,
        },
        {
          path: "/qr-scanner",
          element: < QrScanner/>,
        },
        {
          path: "/receive",
          element: <Receive />,
        },
        {
          path: "/receive-merchant",
          element: <ReceiveMerchant />,
        },
        {
          path: "/add-wallet",
          element: <AddWallet />,
        },
        {
          path: "/upgrade-business",
          element: <UpgradeBusiness />,
        },
        {
          path: "/check-kyb-verification",
          element: <CheckKYBVerfication />,
        },
        {
          path: "/verification-pin",
          element: <VerificationPin />,
        },

        {
          path: "/address-book",
          element: <AddressBook />,
        },
        {
          path: "/wallet-address-book",
          element: <WalletAddressBook />,
        },
        {
          path: "/payment-request",
          element: <PaymentRequest />,
        },

        {
          path: "/loader",
          element: <Loader />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(appRoutes);
  return <RouterProvider router={router} />;
};

export default Routers;
