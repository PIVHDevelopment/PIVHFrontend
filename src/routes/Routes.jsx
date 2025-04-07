import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivacyPolicy from "../container/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../container/termsAndConditions/TermsAndConditions";
import Receive from "../container/receive/Receive";
import Home from "../container/home/Home";
import ReceiveMerchant from "../container/receiveMerchant/ReceiveMerchant";
import Send from "../container/send/Send";
import Shop from "../Shop";
import SignIn from "../container/auth/SignIn";

function ErrorBoundary() {
  const error = PagesIndex.useRouteError(); // Assuming useRouteError is defined somewhere
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
      element: <SignIn />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/shop",
      element: <Shop />,
    },
    {
      path: "/send",
      element: <Send />,
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
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/term-conditions",
      element: <TermsAndConditions />,
    },
  ];

  const router = createBrowserRouter(appRoutes);
  return <RouterProvider router={router} />;
};

export default Routers;
