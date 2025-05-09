import React, { useEffect } from "react";
import Index from "../Index";

function CheckKYBVerfication() {
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
 const [loading , setLoading]= React.useState(true);
 const [data , setData]= React.useState([])
  const getKybVerification = async()=>{
    try {
      const res =  await Index.DataService.get(Index.Api.GET_KYB_VERIFICATION + `/${userData?._id}`);
      if (res?.data?.status === 200) {        
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error,"error")
    } finally{
      setLoading(false)
    }
  }


  useEffect(() => {
    getKybVerification();
  }, []);

  console.log({data});
  
  return (
    <>
          {loading ? (
           <Index.Loader />
           ) : (
    <div className="app-container">
      <header className="receive-center">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Index.back} alt="Back" />
        </button>
        <div className="app-icon" style={{ marginLeft: "-26px" }}>
          <img src={Index.pocketPi} alt={t("PocketPi")} />
        </div>
        <div className="header-right"></div>
      </header>
      <div className="send-form">
        {/* <button disabled={data?.status === "pending" || data?.status === "approved"} className="common-btn kyb-btn" onClick={() => navigate("/kyb-verification")}>
          {data?.status === "pending" && <>{t("KYB Verification Pending")} </>}  
          {data?.status === "approved" && <>{t("KYB Verification Approved")} </>}
          {data?.status === "rejected" && <>{t("KYB Verification Rejected Kindly Try Again")} </>}
          {!data?.status && <>{t("Start Process of KYB Verification")} </>}
        </button> */}
      {/* {data?.status === "approved" && */}
        <button
          // onClick={() => navigate("/upgrade-business")}
          className="common-btn"
        >
          {/* {t("Upgrade Business")} */}
          Upgrade Business
        </button>
         {/* } */}
      </div>
    </div>
  )}
  </>
  );
}

export default CheckKYBVerfication;
