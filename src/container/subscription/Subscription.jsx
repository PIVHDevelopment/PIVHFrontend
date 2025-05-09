import React, { useEffect, useState } from "react";
import Index from "../Index";
import { Box, Typography } from "@mui/material";
import { Spinner } from "react-bootstrap";
import VerificationPin from "../verificationPin/VerificationPin";

const Subscription = () => {
  const { t } = Index.useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  const isBusiness = location?.state?.isBusiness;
  const type = isBusiness ? "business" : "individual";
  const [setting, setSetting] = useState({});
  console.log(setting, "setting");
  const [nextPage, setNextPage] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    Index.DataService.post(Index.Api.ADD_SUBSCRIPTION, {
      uid: userData?.uid,
      subscriptionType: type,
    })
      .then((res) => {
        Index.toasterSuccess(res?.data?.message);
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
              isBusinessSubscription: true,
            };
            sessionStorage.setItem(
              "pi_user_data",
              JSON.stringify(updatedSessionData)
            );
          } else {
            const updatedSessionData = {
              ...sessionData,
              isIndividualSubscription: true,
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
        Index.toasterError(err?.response?.data?.message || t("SomethingWrong"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchData = () => {
    Index.DataService.get(Index.Api.GET_SUBS_SETTING)
      .then((res) => {
        if (res?.data?.status === 200) {
          setSetting(res?.data?.data);
        }
      })
      .catch((e) => {
        console.log("Failed to fetch question", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitFunction = async (values) => {
    const pin = values.pinFields.join("");
    setButtonLoader(true);
    try {
      const res = await Index.DataService.post(Index.Api.ADD_SUBSCRIPTION, {
        pin,
        uid: userData?.uid,
        subscriptionType: type,
      });
      if (res?.data?.status == 200) {
        navigate("/transaction-success", {
          state: { isBusiness: type == "business" ? true : false },
        });
      } else {
        Index.toasterError(res?.data?.message || t("SomethingWrong"));
      }
    } catch (error) {
      Index.toasterError(
        error?.response?.data?.message || t("AnUnexpectedErrorOccurred")
      );
    } finally {
      setButtonLoader(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          {nextPage ? (
            <VerificationPin
              handleSubmitFunction={handleSubmitFunction}
              setNextPage={setNextPage}
            />
          ) : (
            <Box className="p-20-0 set-pin-div" mx="auto">
              <header className="receive-center">
                <button className="back-btn" onClick={() => navigate(-1)}>
                  <img src={Index.back} alt={t("Back")} />
                </button>
                <div className="app-icon" style={{ marginLeft: "-26px" }}>
                  <img src={Index.pocketPi} alt="PocketPi" />
                </div>
                <div className="header-right"></div>
              </header>
              <Box className="subscription-main">
                <Box className="subscrip-heading">
                  <Typography> {t("Subscription")}</Typography>
                </Box>
                <Box className="subscrip-description">
                  {" "}
                  <Typography>
                    {type == "business"
                      ? setting?.businessContent
                      : setting?.individualContent}
                    {/* {t("PurchaseSubscription")}. */}
                  </Typography>
                </Box>
                <Box className="subscrip-amount">
                  <Typography>
                    Pay{" "}
                    <span>
                      {type == "business"
                        ? setting?.businessFee
                        : setting?.individualFee}{" "}
                    </span>
                    Pi
                    {/* {t("PurchaseSubscription")}. */}
                  </Typography>
                </Box>

                <Box textAlign="center" mt={3} className="subscription-btn">
                  {type === "business" ? (
                    <button
                      variant="contained"
                      type="submit"
                      className="action-btn full-width"
                      // onClick={handleSubmit}
                      onClick={() => setNextPage(true)}
                      disabled={isLoading || userData?.isBusinessSubscription}
                    >
                      {isLoading ? (
                        <Spinner animation="border" role="status" size="sm" />
                      ) : userData?.isBusinessSubscription ? (
                        t("Subscribed")
                      ) : (
                        t("Pay")
                      )}
                    </button>
                  ) : (
                    <button
                      variant="contained"
                      type="submit"
                      className="action-btn full-width"
                      // onClick={handleSubmit}
                      onClick={() => setNextPage(true)}
                      disabled={isLoading || userData?.isIndividualSubscription}
                    >
                      {isLoading ? (
                        <Spinner animation="border" role="status" size="sm" />
                      ) : userData?.isIndividualSubscription ? (
                        t("Subscribed")
                      ) : (
                        t("Pay")
                      )}
                    </button>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </div>
      )}
    </>
  );
};

export default Subscription;
