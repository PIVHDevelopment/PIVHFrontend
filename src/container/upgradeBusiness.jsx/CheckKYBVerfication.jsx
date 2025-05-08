import React, { useEffect } from "react";
import Index from "../Index";

function CheckKYBVerfication() {
  const navigate = Index.useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
 const [loading , setLoading]= React.useState(true);
 const [data , setData]= React.useState([])
  const getKybVerification = async()=>{
    try {
      const res =  await Index.DataService.get(Index.Api.GET_KYB_VERIFICATION + "/" + userData?._id);
      if (res?.data?.status) {        
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
  }, [userData]);

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
          <img src={Index.pocketPi} alt="PocketPi" />
        </div>
        <div className="header-right"></div>
      </header>
      <div className="send-form">
        <button disabled={true} className="action-btn full-width send-pi-btn" onClick={() => navigate("/kyb-verification")}>
          KYB Verification
        </button>

        <button
          onClick={() => navigate("/upgrade-business")}
          className="action-btn full-width send-pi-btn"
        >
          Skip for now
        </button>
      </div>
    </div>
  )}
  </>
  );
}

export default CheckKYBVerfication;
