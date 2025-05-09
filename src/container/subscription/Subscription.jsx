import React, { useState } from "react";
import Index from "../Index";
import { Box, Typography } from "@mui/material";
import { Spinner } from "react-bootstrap";

const Subscription = () => {
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
  const [isLoading, setIsLoading] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  const isBusiness = location?.state?.isBusiness;
  const type = isBusiness ? "business" : "individual";

  const handleSubmit = () => {
    setIsLoading(true);
    Index.DataService.post(Index.Api.ADD_SUBSCRIPTION, {
      uid: userData?.uid,
      subscriptionType: type,
    })
      .then((res) => {
        Index.toasterSuccess(res?.data?.message?.[language]);
        if (res?.data?.status === 200) {
          navigate("/home", {
            state: { isBusiness: isBusiness },
          });
          const sessionData = JSON.parse(
            sessionStorage.getItem("pi_user_data")
          );
          if (isBusiness) {
            const updatedSessionData = {
              ...sessionData,
              isBusinessSubscription: true
            };
            sessionStorage.setItem(
              "pi_user_data",
              JSON.stringify(updatedSessionData)
            );
          } else {
            const updatedSessionData = {
              ...sessionData,
              isIndividualSubscription: true
            };
            sessionStorage.setItem(
              "pi_user_data",
              JSON.stringify(updatedSessionData)
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
        Index.toasterError(
          err?.response?.data?.message?.[language] || t("SomethingWrong")
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading ? (
        <Index.Loader />
      ) : (
        <Box className="app-container">
          <header className="receive-center">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <img src={Index.back} alt={t("Back")} />
            </button>
            <div className="app-icon">
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>
          <Box className="subscription-main">
            <Typography className="common-heading"> {t("Subscription")}</Typography>
            {" "}
            <Typography className="common-para">{t("PurchaseSubscription")}.</Typography>

            <Box className="common-btn-space-main">
              {type === "business" ?
                <button
                  variant="contained"
                  type="submit"
                  className="common-btn"
                  onClick={handleSubmit}
                  disabled={isLoading || userData?.isBusinessSubscription}
                >
                  {isLoading ? (
                    <Spinner animation="border" role="status" size="sm" />
                  ) : (
                    userData?.isBusinessSubscription ? t("Subscribed") : t("Oky")
                  )}
                </button>
                :
                <button
                  variant="contained"
                  type="submit"
                  className="common-btn"
                  onClick={handleSubmit}
                  disabled={isLoading || userData?.isIndividualSubscription}
                >
                  {isLoading ? (
                    <Spinner animation="border" role="status" size="sm" />
                  ) : (
                    userData?.isIndividualSubscription ? t("Subscribed") : t("Oky")
                  )}
                </button>}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Subscription;
