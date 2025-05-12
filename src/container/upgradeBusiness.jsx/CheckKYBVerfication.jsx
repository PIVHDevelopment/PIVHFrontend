import React, { useEffect } from "react";
import Index from "../Index";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";

function CheckKYBVerfication() {
  const { t } = Index.useTranslation();
  const ImageURL = import.meta.env.VITE_IMAGE_URL;
  const navigate = Index.useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const getKybVerification = async () => {
    try {
      const res = await Index.DataService.get(
        Index.Api.GET_KYB_VERIFICATION + `/${userData?._id}`
      );
      if (res?.data?.status === 200) {
        setData(res?.data?.data);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKybVerification();
  }, []);

    const FilePreview = ({ file }) => {
    if (!file) return null;
   const fileUrl = `${ImageURL?.endsWith("/") ? ImageURL : ImageURL + "/"}${file}`;
   console.log("PDF Preview URL:", fileUrl);

   if (file?.toLowerCase()?.endsWith(".pdf")) {
      return (
        <iframe
          src={fileUrl}
          title="PDF Preview"
          width="100%"
          height="200px"
          style={{ border: "1px solid #ccc", borderRadius: "8px" }}
        />
      );
    }

    return (
      <img
       src={fileUrl}
        alt="Document Preview"
        className="user-upload-profile-img"
      />
    );
  };
console.log({data});


  return (
    <>
      {loading ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          <header className="receive-center">
            <button className="back-btn" onClick={() => navigate("/home")}>
              <img src={Index.back} alt="Back" />
            </button>
            <div className="app-icon" style={{ marginLeft: "-26px" }}>
              <img src={Index.pocketPi} alt={t("PocketPi")} />
            </div>
            <div className="header-right"></div>
          </header>
          <div className="send-form check-kyb-verification-btn-box">
            {!data?.status ? (
              <button
                className="common-btn kyb-btn"
                onClick={() => navigate("/kyb-verification")}
              >
                {t("Start Process of KYB Verification")}
              </button>
            ) : (
              <>
                <button disabled className="common-btn kyb-btn">
                  {data?.status === "pending" && (
                    <>{t("KYB Verification Pending")} </>
                  )}
                  {data?.status === "approved" && (
                    <>{t("KYB Verification Approved")} </>
                  )}
                  {data?.status === "rejected" && (
                    <>{t("KYB Verification Rejected")} </>
                  )}
                </button>
              </>
            )}

            {data?.status === "approved" && (
              <button
                onClick={() => navigate("/upgrade-business")}
                className="common-btn kyb-btn"
              >
                {t("Continue to Upgrade Business")}
              </button>
            )}

            {data && data?.status === "rejected" && (
              <button
                onClick={() => navigate("/kyb-verification")}
                className="common-btn kyb-btn"
              >
                {t("Re-Upload documents")}
              </button>
            )}
          </div>
      {data &&
          <Index.Box className="address-book-details">
            <Index.Box className="address-book-head">
              <Index.Typography className="address-book-title custom-address-book-title">
               {t("KYB Verification Documents")}
              </Index.Typography>
            </Index.Box>
         
            <Index.Box className="grid-row">
              <Index.Box sx={{ width: 1 }} className="grid-main">
                <Index.Box
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={0}
                >
                  {/* Country Autocomplete */}
                  <Index.Box gridColumn="span 12" className="grid-column">
                    <div className="input-box">
                      <Typography className="input-form-label">
                        {t("Country")} : {data?.country}
                      </Typography>
                    </div>
                  </Index.Box>

                  {data?.documents && data?.documents?.length == 2 ? (<>

                  <Index.Box gridColumn="span 12" className="grid-column">
                    <div className="input-box">
                      <Typography className="input-form-label">
                       {t("Aadhar Card Front")}
                      </Typography>
                      <div className="user-file-upload-btn-main">
                        <Button
                          variant="contained"
                          component="label"
                          className="user-file-upload-btn"
                        >
                              <FilePreview file={data?.documents[0]} />
                        </Button>
                    
                      </div>
                    </div>
                  </Index.Box>

                    <Index.Box gridColumn="span 12" className="grid-column">
                    <div className="input-box">
                      <Typography className="input-form-label">
                       {t("Aadhar Card Back")}
                      </Typography>
                      <div className="user-file-upload-btn-main">
                        <Button
                          variant="contained"
                          component="label"
                          className="user-file-upload-btn"
                        >
                              <FilePreview file={data?.documents[1]} />
                        </Button>
                    
                      </div>
                    </div>
                  </Index.Box>
                    </>) : <>
                      <Index.Box gridColumn="span 12" className="grid-column">
                    <div className="input-box">
                      <Typography className="input-form-label">
                         {t("Passport or Driving License")}
                      </Typography>
                      <div className="user-file-upload-btn-main">
                        <Button
                          variant="contained"
                          component="label"
                          className="user-file-upload-btn"
                        >
                              <FilePreview file={data?.documents[0]} />
                        </Button>
                    
                      </div>
                    </div>
                  </Index.Box>
                     </>}
                </Index.Box>
              </Index.Box>

            </Index.Box> 
    
          </Index.Box>
          }
        </div>
      )}
    </>
  );
}

export default CheckKYBVerfication;
