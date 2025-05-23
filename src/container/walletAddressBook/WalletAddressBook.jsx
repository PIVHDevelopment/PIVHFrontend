import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import Index from "../Index";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 30px)",
  maxWidth: "350px",
  bgcolor: "background.paper",
  boxShadow: 24,
};

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

const WalletAddressBook = () => {
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [wallets, setWallets] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({ walletAddress: "" });
  const [id, setId] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [loading, setLoading] = React.useState(false)
  const location = Index.useLocation();
  const navigate = Index.useNavigate();
  const isBusiness = location?.state?.isBusiness;
  const type = isBusiness ? "Business" : "Individual";
  const handleOpen = () => setOpen(true);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = (id) => {
    setOpenDelete(true);
    setId(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setId("");
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedData({ walletAddress: "" });
    setId("");
  };

  const getWallets = async () => {
    setLoading(true);
    try {
      const res = await Index.DataService.get(
        `${Index.Api.GET_WALLET_ADDRESS}/${userData?._id}/${type}`
      );
      if (res?.data?.status) {
        setWallets(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setButtonLoader(true);
    try {
      const payload = {
        ...values,
        id,
        type,
        userId: userData?._id,
      };
      const res = await Index.DataService.post(
        Index.Api.ADD_UPDATE_WALLET_ADDRESS,
        payload
      );
      if (res?.data?.status) {
        Index.toasterSuccess(res.data.message?.[language]);
        getWallets();
        handleClose();
      } else {
        Index.toasterError(res.data.message?.[language]);
      }
    } catch (error) {
      Index.toasterError(
        error?.response?.data?.message?.[language] || t("SomethingWrong")
      );
    } finally {
      setButtonLoader(false);
    }
  };

  const handleDelete = async () => {
    setButtonLoader(true);
    try {
      const res = await Index.DataService.post(
        `${Index.Api.DELETE_WALLET_ADDRESS}/${id}`
      );
      if (res?.data?.status) {
        Index.toasterSuccess(res.data.message?.[language]);
        getWallets();
      } else {
        Index.toasterError(res.data.message?.[language]);
      }
    } catch (error) {
      Index.toasterError(t("SomethingWrong"));
    }
    setButtonLoader(false);
    handleCloseDelete();
  };

  useEffect(() => {
    getWallets();
  }, []);

  return (
    <>
      <div className="app-container">
        <header className="receive-center">
          <button
            className="back-btn"
            onClick={() =>
              navigate("/home", {
                state: { isBusiness },
              })
            }
          >
            <img src={Index.back} alt="Back" />
          </button>
          <div className="app-icon">
            <img src={Index.pocketPi} alt="PocketPi" />
          </div>
          <div className="header-right"></div>
        </header>

        <Box className="address-book-details">
          <Box className="address-book-head">
            <Typography className="address-book-title">
              {t("WalletAddressBook")}
            </Typography>
            <button className="icon-btn" onClick={handleOpen}>
              <img src={Index.Plusadd} alt="Add" />
            </button>
          </Box>
          <List className="list-ul-address">
            {wallets.length > 0 ? (
              wallets.map((wallet) => (
                <ListItem key={wallet._id} className="list-item-address">
                  <Box className="flex-justify-gap-add">
                    <Box className="address-left-contain cus-address-left-contain">
                      <Typography className="field-contain-address">
                        {wallet.walletAddress}
                        <button
                          className="copy-btn ms-1"
                          onClick={() => {
                            navigator.clipboard.writeText(wallet.walletAddress);
                            Index.toasterSuccess(t("CopiedToclipboard"));
                          }}
                        >
                          <img src={Index.copy} alt={t("Copy")} />
                        </button>
                      </Typography>
                    </Box>
                    <Box className="custom-address-right-contain app-btn-flex">
                      <button
                        className="btn-edit-icons app-icon-btn"
                        onClick={() => {
                          setSelectedData(wallet);
                          setId(wallet._id);
                          handleOpen();
                        }}
                      >
                        <EditOutlinedIcon className="app-icon" />
                      </button>
                      <button
                        className="btn-delete-icons app-icon-btn"
                        onClick={() => handleOpenDelete(wallet?._id)}
                      >
                        <DeleteOutlineRoundedIcon className="app-icon" />
                      </button>
                    </Box>
                  </Box>
                </ListItem>
              ))
            ) : (
              <Typography className="no-address-title">
                {t("NoWalletAddressesFound")}
              </Typography>
            )}
          </List>
        </Box>

        <Modal open={open} onClose={handleClose} className="address-modal">
          <Box sx={modalStyle} className="common-style-modal address-style">
            <Box className="modal-header-common address-modal-header">
              <Typography className="add-title">
                {id ? t("EditWalletAddress") : t("AddWalletAddress")}
              </Typography>
              <button className="btn-close" onClick={handleClose}></button>
            </Box>
            <Index.Formik
              initialValues={{
                walletAddress: selectedData.walletAddress || "",
              }}
              validationSchema={Yup.object({
                walletAddress: Yup.string()
                  .min(3, t("WalletAddressmustbeAtLeast3Characters"))
                  .required(t("WalletAddressIsRequired")),
              })}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <Box className="modal-body address-body">
                    <div className="input-box">
                      <p className="user-form-lable">
                        {t("WalletAddress")}
                      </p>
                      <div className="user-form-group">
                        <input
                          type="text"
                          className="user-form-control"
                          placeholder={t("EnterWalletAddress")}
                          name="walletAddress"
                          value={formik.values.walletAddress}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          maxLength={132}
                        />
                        <p className="input-error">
                          {formik.errors.walletAddress &&
                            formik.touched.walletAddress
                            ? formik.errors.walletAddress
                            : null}
                        </p>
                      </div>
                    </div>
                    <Box className="modal-footer">
                      <button
                        className="common-btn"
                        type="submit"
                        disabled={buttonLoader}
                      >
                        {buttonLoader ? (
                          <CircularProgress size={20} />
                        ) : (
                          t("Submit")
                        )}
                      </button>
                    </Box>
                  </Box>
                </form>
              )}
            </Index.Formik>
          </Box>
        </Modal>
      </div>
      <Modal
        className="address-modal common-modall"
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="common-style-modal address-style">
          <Box className="modal-header-common address-modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseDelete}
            ></button>
          </Box>

          <Box className="modal-body address-body">
            <Box className="delete-modal-contain">
              <Typography className="are-you-sure-title">
                {t("AreYouSure")} ?
              </Typography>
              <Typography className="are-you-sure-desc  ">
                {t("AreYouSureYouWantToDeleteWalletAddressRecords")}.
              </Typography>
            </Box>
          </Box>

          <Box className="modal-footer">
            <Box className="footer-address-center">
              <button
                className="common-btn"
                type="button"
                onClick={handleCloseDelete}
              >
                {t("Cancel")}
              </button>
              <button
                className="border-btn"
                type="button"
                onClick={(e) => handleDelete(e.target.values)}
                disabled={buttonLoader}
              >
                {buttonLoader ? <CircularProgress size={20} /> : t("Delete")}
              </button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WalletAddressBook;
