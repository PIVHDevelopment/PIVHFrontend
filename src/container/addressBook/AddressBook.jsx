import React from 'react'
import Index from '../Index'
import { Box, FormControlLabel, List, ListItem, Modal, Radio, RadioGroup, Typography } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'calc(100% - 30px)',
      maxWidth: '350px',
      bgcolor: 'background.paper',
      boxShadow: 24,
};

const AddressBook = () => {
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      const [openDelete, setOpenDelete] = React.useState(false);
      const handleOpenDelete = () => setOpenDelete(true);
      const handleCloseDelete = () => setOpenDelete(false);

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
                              <div className="header-right">

                              </div>
                        </header>

                        <Box className="address-book-details">
                              <Box className="address-book-head">
                                    <Typography className="address-book-title">Address Book</Typography>
                                    <button
                                          className="icon-btn"
                                          onClick={handleOpen}
                                    >
                                          <img src={Index.Plusadd} alt="Setting" />
                                    </button>
                              </Box>
                              <Box className="address-book-listing">
                                    <List className="list-ul-address">
                                          <ListItem className="list-item-address">
                                                <Box className="flex-justify-gap-add">
                                                      <Box className="address-left-contain">
                                                            <Box className="list-field-show">
                                                                  <Typography className="label-contain-address">Type :</Typography>
                                                                  <Typography className="field-contain-address">Individual</Typography>
                                                            </Box>
                                                            <Box className="list-field-show">
                                                                  <Typography className="label-contain-address">Name :</Typography>
                                                                  <Typography className="field-contain-address">Admin</Typography>
                                                            </Box>
                                                            <Box className="list-field-show">
                                                                  <Typography className="label-contain-address">Username :</Typography>
                                                                  <Typography className="field-contain-address">Admin123      <button className="copy-btn ms-1" >
                                                                        <img src={Index.copy} alt="Copy" />
                                                                  </button></Typography>
                                                            </Box>
                                                      </Box>

                                                      <Box className="address-right-contain">
                                                            <Box className="address-auth-details">
                                                                  <button className='btn btn-edit-icons'>
                                                                        <EditOutlinedIcon />
                                                                  </button>
                                                                  <button className='btn btn-delete-icons' onClick={handleOpenDelete}>
                                                                        <DeleteOutlineRoundedIcon />
                                                                  </button>
                                                            </Box>
                                                      </Box>
                                                </Box>
                                          </ListItem>
                                    </List>
                              </Box>
                        </Box>
                  </div>

                  <Modal
                        className='address-modal common-modall'
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                  >
                        <Box sx={style} className="common-style-modal address-style">
                              <Box className="modal-header-common address-modal-header">
                                    <Typography className="add-title">Add Address </Typography>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                              </Box>

                              <Box className="modal-body address-body">
                                    <Box className="address-details">
                                          <Box className="grid-row">
                                                <Box className="common-grid">
                                                      <div className="flex-filed-details">
                                                            <Typography className="label-field">Type</Typography>

                                                            <RadioGroup
                                                                  className='radio-group-flex'
                                                                  aria-labelledby="demo-radio-buttons-group-label"
                                                                  defaultValue="female"
                                                                  name="radio-buttons-group"
                                                            >
                                                                  <FormControlLabel className="radio-label" value="female" control={<Radio />} label="Individual" />
                                                                  <FormControlLabel className="radio-label" value="male" control={<Radio />} label="Business" />
                                                            </RadioGroup>
                                                      </div>
                                                </Box>
                                                <Box className="common-grid">
                                                      <div className="input-wrapper">
                                                            <Typography className="label-field">Name</Typography>
                                                            <input
                                                                  type="text"
                                                                  className="notes-input"
                                                                  placeholder="Enter Name"
                                                                  name="amount"
                                                            />
                                                      </div>
                                                </Box>
                                                <Box className="common-grid">
                                                      <div className="input-wrapper">
                                                            <Typography className="label-field">Username</Typography>
                                                            <input
                                                                  type="text"
                                                                  className="notes-input"
                                                                  placeholder="Enter Username"
                                                                  name="amount"
                                                            />
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
                        </Box>
                  </Modal>

                  <Modal
                        className='address-modal common-modall'
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                  >
                        <Box sx={style} className="common-style-modal address-style">
                              <Box className="modal-header-common address-modal-header">
                                    {/* <Typography className="add-title">Add Address </Typography> */}
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                              </Box>

                              <Box className="modal-body address-body">
                                    <Box className="delete-modal-contain">
                                          <Typography className="are-you-sure-title">Are you sure ?</Typography>
                                          <Typography className="are-you-sure-desc  ">Are you sure you want to delete address records.</Typography>
                                    </Box>

                              </Box>

                              <Box className="modal-footer modal-footer-address">
                                    <Box className="footer-address-center delete-flex">
                                          <button
                                                className="action-btn-border  send-pi-btn"
                                                type="submit"
                                          >
                                                Cancel
                                          </button>
                                          <button
                                                className="action-btn full-width send-pi-btn"
                                                type="submit"
                                          >
                                                Delete
                                          </button>
                                    </Box>
                              </Box>
                        </Box>
                  </Modal>
            </>
      )
}

export default AddressBook
