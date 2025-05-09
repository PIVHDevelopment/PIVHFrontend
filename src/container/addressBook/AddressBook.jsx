import React, { useEffect } from "react";
import Index from "../Index";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  List,
  ListItem,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useLocation } from "react-router-dom";

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
const initialValues = {
  type: "",
  name: "",
  userName: "",
  id: "",
};
const AddressBook = () => {
  const { t } = Index.useTranslation();
  const language = localStorage.getItem("language");
  let isRtl = language === "Ar" ? true : false;
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId("");
    setSelectedData(initialValues);
  };
 const [loading , setLoading]= React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false);
  const [address, setAddress] = React.useState([]);
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(initialValues);
  const [id, setId] = React.useState("");
  const location = useLocation();
  const isBusiness = location?.state?.isBusiness;
  const type = isBusiness ? "Business" : "Individual";
  const handleOpenDelete = (id) => {
    setOpenDelete(true);
    setId(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setId("");
  };
  const navigate = Index.useNavigate();
  const handleSubmit = async (values) => {
    setButtonLoader(true);
    try {
      if (id) {
        values.id = id;
      }
      const res = await Index.DataService.post(Index.Api.ADD_UPDATE_ADDRESS, {
        ...values,
        tabType: type,
        userId: userData?._id,
      });
      if (res?.data?.status === 200 || res?.data?.status === 201) {
        Index.toasterSuccess(res?.data?.message);
        getAddress();
        handleClose();
      } else {
        Index.toasterError(res?.data?.message);
      }
    } catch (error) {
      Index.toasterError(
        error?.response?.data?.message || t("AnUnexpectedErrorOccurred")
      );
    } finally {
      setButtonLoader(false);
    }
  };
  const getAddress = async () => {
    setLoading(true);
    Index.DataService.get(
      Index.Api.GET_ADDRESS + "/" + userData?._id + "/" + type
    ).then((res) => {
      if (res?.data?.status) {
        setAddress(res.data.data);
      }
    });
    setTimeout(() => {
      setLoading(false);
    },300);
  };
  const handleDelete = async () => {
    setButtonLoader(true);
    Index.DataService.post(Index.Api.DELETE_ADDRESS + "/" + id).then((res) => {
      if (res?.data?.status) {
        Index.toasterSuccess(res.data.message);
        getAddress();
      } else {
        Index.toasterError(res.data.message);
      }
    });
    setButtonLoader(false);
    handleCloseDelete();
  };
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <>
       {loading ? (
       <Index.Loader />
       ) : (
      <div className="app-container">
        <header className="receive-center">
        <button className="back-btn" onClick={() => navigate("/home", {
                 state: { isBusiness },
                   })}>
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
              {t("AddressBook")}
            </Typography>
            <button className="icon-btn" onClick={handleOpen}>
              <img src={Index.Plusadd} alt="Setting" />
            </button>
          </Box>
          <Box className="address-book-listing">
            <List className="list-ul-address">
              {address.length ? (
                address.map((item) => {
                  return (
                    <ListItem 
                    className={`list-item-address ${
                      isRtl ? "text-align-right" : ""
                    }`}
                    >
                      <Box className="flex-justify-gap-add">
                        <Box className="address-left-contain">
                          <Box className="list-field-show">
                            <Typography className="label-contain-address">
                              {t("Type")} :
                            </Typography>
                            <Typography className="field-contain-address">
                              {item?.type}
                            </Typography>
                          </Box>
                          <Box className="list-field-show">
                            <Typography className="label-contain-address">
                              {t("Name")} :
                            </Typography>
                            <Typography className="field-contain-address">
                              {item?.name}
                            </Typography>
                          </Box>
                          <Box className="list-field-show">
                            <Typography className="label-contain-address">
                              {t("Username")} :
                            </Typography>
                            <Typography className="field-contain-address">
                              {item?.userName}
                              <button
                                className="copy-btn ms-1"
                                onClick={() => {
                                  navigator.clipboard.writeText(item?.userName);
                                  Index.toasterSuccess(
                                    t("UsernameCopiedToClipboard")
                                  );
                                }}
                              >
                                <img src={Index.copy} alt={t("Copy")} />
                              </button>
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="address-right-contain">
                          <Box className="address-auth-details">
                            <button
                              className="btn btn-edit-icons"
                              onClick={() => {
                                setSelectedData(item);
                                handleOpen();
                                setId(item?._id);
                              }}
                            >
                              <EditOutlinedIcon />
                            </button>
                            <button
                              className="btn btn-delete-icons"
                              onClick={() => handleOpenDelete(item?._id)}
                            >
                              <DeleteOutlineRoundedIcon />
                            </button>
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                  );
                })
              ) : (
                <div className="no-address-book">
                  {/* <img src={Index.addressbook} alt="addressbook" /> */}
                  <Typography className="no-address-title">
                    {t("NoAddressDataFound")}
                  </Typography>
                </div>
              )}
            </List>
          </Box>
        </Box>
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
            <Typography className="add-title">{t("AddAddress")} </Typography>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </Box>
          <Index.Formik
            initialValues={{
              type: "Individual",
              name: selectedData?.name || "",
              userName: selectedData?.userName || "",
            }}
            validationSchema={Yup.object({
              type: Yup.string().required(t("TypeRequired")),
              name: Yup.string()
                .required(t("NameRequired"))
                .matches(/^\S.*\S$|^\S$/, t("NameSpace")),
              userName: Yup.string()
                .required(t("UsernameRequired"))
                .matches(/^\S+$/, t("UsernameSpace")),
            })}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Box className="modal-body address-body">
                  <Box className="address-details">
                    <Box className="grid-row">
                      <Box className="common-grid">
                        <div className="flex-filed-details">
                          <Typography className="label-field">
                            {t("Type")}
                          </Typography>
                          <RadioGroup
                            className="radio-group-flex"
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                          >
                            <FormControlLabel
                              className="radio-label"
                              value="Individual"
                              control={<Radio />}
                              label={t("Individual")}
                            />
                            <FormControlLabel
                              className="radio-label"
                              value="Business"
                              control={<Radio />}
                              label={t("Business")}
                            />
                          </RadioGroup>
                        </div>
                      </Box>

                      <Box className="common-grid">
                        <div className="input-wrapper">
                          <Typography className="label-field">
                            {t("Name")}
                          </Typography>
                          <input
                            type="text"
                            className="notes-input"
                            placeholder={t("EnterName")}
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div className="input-error">
                            {formik.errors?.name && formik.touched?.name
                              ? formik.errors?.name
                              : null}
                          </div>
                        </div>
                      </Box>

                      <Box className="common-grid">
                        <div className="input-wrapper">
                          <Typography className="label-field">
                            {t("Username")}
                          </Typography>
                          <input
                            type="text"
                            className="notes-input"
                            placeholder={t("EnterUserName")}
                            name="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <div className="input-error">
                            {formik.errors?.userName && formik.touched?.userName
                              ? formik.errors?.userName
                              : null}
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="modal-footer">
                  <Box className="footer-address-center">
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
                {t("AreYouSure")}?
              </Typography>
              <Typography className="are-you-sure-desc  ">
                {t("DeleteRecords")}
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

export default AddressBook;
