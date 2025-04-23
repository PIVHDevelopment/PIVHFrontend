import React, { useEffect } from "react";
import * as Yup from "yup"; // For validation
import Index from "../Index";
import {
  Box,
  FormControlLabel,
  List,
  ListItem,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId("");
    setSelectedData(initialValues);
  };

  const [openDelete, setOpenDelete] = React.useState(false);
  const [address, setAddress] = React.useState([]);
  const [selectedData, setSelectedData] = React.useState(initialValues);
  const [id, setId] = React.useState("");
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
    try {
      if (id) {
        values.id = id;
      }
      const res = await Index.DataService.post(Index.Api.ADD_UPDATE_ADDRESS, {
        ...values,
        userId: userData?._id,
      });
      if (res?.data?.status === 200 || res?.data?.status === 201) {
        Index.toasterSuccess(res?.data?.message);
        getAddress();
      } else {
        Index.toasterError(res?.data?.message);
      }
    } catch (error) {
      Index.toasterError(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    }
    handleClose();
  };
  const getAddress = async () => {
    Index.DataService.get(Index.Api.GET_ADDRESS + "/" + userData?._id).then(
      (res) => {
        if (res?.data?.status) {
          setAddress(res.data.data);
        }
      }
    );
  };
  const handleDelete = async () => {
    Index.DataService.post(Index.Api.DELETE_ADDRESS + "/" + id).then((res) => {
      if (res?.data?.status) {
        Index.toasterSuccess(res.data.message);
        getAddress();
      } else {
        Index.toasterError(res.data.message);
      }
    });
    handleCloseDelete();
  };
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <>
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

        <Box className="address-book-details">
          <Box className="address-book-head">
            <Typography className="address-book-title">Address Book</Typography>
            <button className="icon-btn" onClick={handleOpen}>
              <img src={Index.Plusadd} alt="Setting" />
            </button>
          </Box>
          {address.length ? (
            address.map((item) => {
              return (
                <Box className="address-book-listing">
                  <List className="list-ul-address">
                    <ListItem className="list-item-address">
                      <Box className="flex-justify-gap-add">
                        <Box className="address-left-contain">
                          <Box className="list-field-show">
                            <Typography className="label-contain-address">
                              Type :
                            </Typography>
                            <Typography className="field-contain-address">
                              {item?.type}
                            </Typography>
                          </Box>
                          <Box className="list-field-show">
                            <Typography className="label-contain-address">
                              Name :
                            </Typography>
                            <Typography className="field-contain-address">
                              {item?.name}
                            </Typography>
                          </Box>
                          <Box className="list-field-show">
                            <Typography className="label-contain-address">
                              Username :
                            </Typography>
                            <Typography className="field-contain-address">
                              {item?.userName}
                              <button
                                className="copy-btn ms-1"
                                onClick={() => {
                                  navigator.clipboard.writeText(item?.userName);
                                  Index.toasterSuccess(
                                    "Username copied to clipboard!"
                                  );
                                }}
                              >
                                <img src={Index.copy} alt="Copy" />
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
                  </List>
                </Box>
              );
            })
          ) : (
            <div className="no-address-book">
              {/* <img src={Index.addressbook} alt="addressbook" /> */}
              <Typography className="no-address-title">
                No Address Data Found
              </Typography>
            </div>
          )}
        </Box>
      </div>

      <Modal
        className="address-modal common-modall"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="common-style-modal address-style">
          <Box className="modal-header-common address-modal-header">
            <Typography className="add-title">Add Address </Typography>
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
              type: Yup.string().required("Type is required"),
              name: Yup.string().required("Name is required"),
              userName: Yup.string().required("Username is required"),
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
                          <Typography className="label-field">Type</Typography>
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
                              label="Individual"
                            />
                            <FormControlLabel
                              className="radio-label"
                              value="Business"
                              control={<Radio />}
                              label="Business"
                            />
                          </RadioGroup>
                          {/* {formik.errors.type && formik.touched.type && (
                            <Typography className="error-text">
                              {formik.errors.type}
                            </Typography>
                          )} */}
                        </div>
                      </Box>

                      <Box className="common-grid">
                        <div className="input-wrapper">
                          <Typography className="label-field">Name</Typography>
                          <input
                            type="text"
                            className="notes-input"
                            placeholder="Enter Name"
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
                            Username
                          </Typography>
                          <input
                            type="text"
                            className="notes-input"
                            placeholder="Enter Username"
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

                <Box className="modal-footer modal-footer-address">
                  <Box className="footer-address-center">
                    <button
                      className="action-btn full-width send-pi-btn"
                      type="submit"
                    >
                      Submit
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
                Are you sure ?
              </Typography>
              <Typography className="are-you-sure-desc  ">
                Are you sure you want to delete address records.
              </Typography>
            </Box>
          </Box>

          <Box className="modal-footer modal-footer-address">
            <Box className="footer-address-center delete-flex">
              <button
                className="action-btn-border  send-pi-btn"
                type="button"
                onClick={handleCloseDelete}
              >
                Cancel
              </button>
              <button
                className="action-btn full-width send-pi-btn"
                type="button"
                onClick={(e) => handleDelete(e.target.values)}
              >
                Delete
              </button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddressBook;
