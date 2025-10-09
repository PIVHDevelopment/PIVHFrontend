import React from "react";
import Index from "../../Index";
import { Link } from "react-router-dom";

function Business({ balance }) {
  const { t } = Index.useTranslation();
  const navigate = Index.useNavigate();
  return (
    <>
      {/* <div className="action-buttons">
        <button
          className="action-btn send-btn"
          id="sendBtn"
          disabled={balance <= 0}
          onClick={() =>
            navigate("/send", {
              state: { balance: balance, typeTxn: "business" },
            })
          }
        >
          <span className="btn-icon">
            <img src={Index.send} alt={`${t("Send")} ${t("Money")}`} />
          </span>
          {t("Send")}
        </button>

        <button
          className="action-btn send-btn"
          id="sendBtn"
          onClick={() =>
            navigate("/receive", {
              state: { balance: balance, typeTxn: "business" },
            })
          }
        >
          <span className="btn-icon">
            <img src={Index.downarrow} alt={`${t("Receive")} ${t("Money")}`} />
          </span>
          {t("Receive")}
        </button>
      </div> */}

      <Index.Box className="business-home-details">
        <Index.Box className="business-flex">
          <Link to="/invoice" className=" business-box-main">
            <img src={Index.bill} alt="bill" className="business-icons" />
            <Index.Typography className="business-title">Invoices / Billing</Index.Typography>
          </Link>
          <Link to="/user-management" className=" business-box-main">
            <img src={Index.employeetask} alt="bill" className="business-icons" />
            <Index.Typography className="business-title">Employee Management</Index.Typography>
          </Link>
           <Link to="/payroll"  className=" business-box-main">
            <img src={Index.salary} alt="bill" className="business-icons" />
            <Index.Typography className="business-title">Payroll</Index.Typography>
          </Link>
          <Link to="/employee-roll"  className=" business-box-main">
            <img src={Index.employeetask} alt="bill" className="business-icons" />
            <Index.Typography className="business-title">Employee Roll</Index.Typography>
          </Link>
        </Index.Box>
      </Index.Box>
    </>
  );
}

export default Business;
