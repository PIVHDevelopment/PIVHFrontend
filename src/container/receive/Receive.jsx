import React, { useEffect, useRef, useState } from "react";
import Index from "../Index";
import {
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  WhatsappIcon,
  EmailIcon,
  TwitterIcon,
} from "react-share";
import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 30px)",
  maxWidth: "350px",
  bgcolor: "background.paper",
  boxShadow: 24,
};

function Receive() {
  const { t } = Index.useTranslation();
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const ImageURL = import.meta.env.VITE_IMAGE_URL;
  const navigate = Index.useNavigate();
  const location = Index.useLocation();
  const [qrData, setQrData] = useState({});
  let typeTxn = location?.state?.typeTxn;
  const shareRef = useRef();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      typeTxn == "business" ? userData?.businessUserName : userData?.userName
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  useEffect(() => {
    if (qrData?.qrCodes) {
      const url =
        typeTxn === "business"
          ? `${ImageURL}${qrData?.qrCodes?.businessQr}`
          : `${ImageURL}${qrData?.qrCodes?.userQr}`;
      setShareUrl(url);
    }
  }, [typeTxn, qrData]);

  const handleShare = () => {
    setOpen(true);
  };

  const handleFetchQrCode = async () => {
    setLoading(true);
    try {
      const res = await Index.DataService.get(
        Index.Api.FETCH_QR_CODE + `/${userData?.uid}`
      );
      if (res?.data?.status === 200) {
        setQrData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchQrCode();
  }, []);
  console.log({ qrData });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    Index.toasterSuccess(t("QRCopy"));
  };

  const shareImage = async () => {
    const imageUrl =
      typeTxn === "business"
        ? `${ImageURL}${qrData?.qrCodes?.businessQr}`
        : `${ImageURL}${qrData?.qrCodes?.userQr}`;

    const response = await fetch(imageUrl);
    console.log({ response });

    const blob = await response.blob();
    const file = new File([blob], "qr_code.png", { type: blob.type });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Share QR Code",
          text: "Scan QR Code",
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      Index.toasterError(t("SharingFiels"));
    }
  };

  return (
    <>
      {loading ? (
        <Index.Loader />
      ) : (
        <div className="app-container">
          <header className="receive-center">
            <button
              className="back-btn"
              onClick={() =>
                navigate("/home", {
                  state: { isBusiness: typeTxn == "business" ? true : false },
                })
              }
            >
              <img src={Index.back} alt="Back" />
            </button>
            <div className="app-icon" style={{ marginLeft: "-26px" }}>
              <img src={Index.pocketPi} alt="PocketPi" />
            </div>
            <div className="header-right"></div>
          </header>

          <div className="wallet-id">
            <span id="walletAddress">
              {typeTxn == "business"
                ? userData?.businessUserName
                : userData?.userName}
            </span>
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? <span>✓</span> : <img src={Index.copy} alt="Copy" />}
            </button>
          </div>

          <div className="qr-section">
            <div className="qr-code">
              <img
                src={
                  typeTxn === "business"
                    ? `${ImageURL}${qrData?.qrCodes?.businessQr}`
                    : `${ImageURL}${qrData?.qrCodes?.userQr}`
                }
                alt={t("QRCode")}
                className="generate-qr-code"
              />
            </div>
          </div>

          {/* <div className="action-buttons">
        <button className="circle-btn">
          <span className="icon">
            <img src={Index.copyBtn} alt="Copy" />
          </span>
          <span>Copy</span>
        </button>
        <button className="circle-btn" >
          <span className="icon">
            <img src={Index.downloadImg} alt="Download" />
          </span>
          <span>Download</span>
        </button>
      </div> */}

          <div className="receive-btn-share">
            <button
              className="secondary-btn share-btn"
              onClick={handleCopyLink}
            >
              <span className="icon">
                <img src={Index.copyLink} alt="Share" />
              </span>
              {t("Copy")}
            </button>
            <button className="secondary-btn share-btn" onClick={handleShare}>
              {/* <button className="secondary-btn share-btn"  onClick={shareImage}> */}
              <span className="icon">
                <img src={Index.share} alt={t("Share")} />
              </span>
              {t("Share")}
            </button>
          </div>
        </div>
      )}
      <Modal
        className="address-modal common-modall"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="common-style-modal address-style">
          <Box className="modal-header-common address-modal-header">
            <Typography className="add-title">{t("ShareQRCode")} </Typography>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </Box>
          <div className="qr-btn-share-box">
            <WhatsappShareButton url={shareUrl} title={t("ShareQRCode")}>
              <WhatsappIcon size={45} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={shareUrl}
              subject="Share QR Code"
              body="Scan QR Code:"
            >
              <EmailIcon size={45} round />
            </EmailShareButton>

            <TwitterShareButton url={shareUrl} title={t("ShareQRCode")}>
              <TwitterIcon size={45} round />
            </TwitterShareButton>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Receive;
