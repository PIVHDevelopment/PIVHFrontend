import React from 'react'
import Index from '../Index'
import { Box, Button, Typography } from '@mui/material'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function KYBVerification() {


    // for open handleChangedropdown

    const [age, setAge] = React.useState("");

    const handleChangedropdown = () => {
        setAge(event.target.value);
    };
    return (
        <>
            <div className="app-container">
                <header className="receive-center">
                    <button className="back-btn">
                        <img src={Index.back} alt="Back" />
                    </button>
                    <div className="app-icon">
                        <img src={Index.pocketPi} alt="PocketPi" />
                    </div>
                    <div className="header-right"></div>
                </header>
                <Index.Box className="address-book-details">
                    <Index.Box className="address-book-head">
                        <Index.Typography className="address-book-title">
                            KYB Verification
                        </Index.Typography>
                    </Index.Box>

                    <Index.Box className="grid-row">
                        <Index.Box sx={{ width: 1 }} className="grid-main">
                            <Index.Box
                                display="grid"
                                gridTemplateColumns="repeat(12, 1fr)"
                                gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                            >
                                <Index.Box
                                    gridColumn={{
                                        xs: "span 12",
                                        sm: "span 12",
                                        md: "span 12",
                                        lg: "span 12"
                                    }}
                                    className="grid-column"
                                >
                                    <div className="input-box">
                                        <Index.Typography className="input-form-label">
                                            Select Country
                                        </Index.Typography>
                                        <Index.Box className="user-dropdown-box">
                                            <Index.FormControl className="user-from-control">
                                                <Index.Select
                                                    className="dropdown-select "
                                                    value={age}
                                                    onChange={handleChangedropdown}
                                                    displayEmpty
                                                    MenuProps={{
                                                        disableScrollLock: true // Prevents MUI from adding body padding and overflow hidden
                                                    }}
                                                >
                                                    <Index.MenuItem value="" className="user-drop-menuitem">
                                                        USD
                                                    </Index.MenuItem>
                                                    <Index.MenuItem value={10} className="user-drop-menuitem">
                                                        USD
                                                    </Index.MenuItem>
                                                    <Index.MenuItem value={20} className="user-drop-menuitem">
                                                        USD
                                                    </Index.MenuItem>
                                                    <Index.MenuItem value={30} className="user-drop-menuitem">
                                                        USD
                                                    </Index.MenuItem>
                                                </Index.Select>
                                            </Index.FormControl>
                                        </Index.Box>
                                    </div>
                                </Index.Box>
                                <Index.Box
                                    gridColumn={{
                                        xs: "span 12",
                                        sm: "span 12",
                                        md: "span 12",
                                        lg: "span 12"
                                    }}
                                    className="grid-column"
                                >
                                    <div className="input-box">
                                        <Index.Typography className="input-form-label">
                                            Upload Document Front
                                        </Index.Typography>
                                        <div className='user-file-upload-btn-main'>
                                            {/* <img
                                    src={Index.pocketPi}
                                    className="user-upload-profile-img"
                                    alt="upload img"
                                ></img> */}

                                            <Button
                                                variant="contained"
                                                component="label"
                                                className="user-file-upload-btn"
                                            >
                                                <CloudUploadIcon className="user-upload-icon-img" />
                                                <input hidden accept="image/*" multiple type="file" />
                                            </Button>
                                        </div>
                                    </div>
                                </Index.Box>
                                <Index.Box
                                    gridColumn={{
                                        xs: "span 12",
                                        sm: "span 12",
                                        md: "span 12",
                                        lg: "span 12"
                                    }}
                                    className="grid-column"
                                >
                                    <div className="input-box">
                                        <Index.Typography className="input-form-label">
                                            Upload Document Back
                                        </Index.Typography>
                                        <div className='user-file-upload-btn-main'>
                                            {/* <img
                                    src={Index.pocketPi}
                                    className="user-upload-profile-img"
                                    alt="upload img"
                                ></img> */}

                                            <Button
                                                variant="contained"
                                                component="label"
                                                className="user-file-upload-btn"
                                            >
                                                <CloudUploadIcon className="user-upload-icon-img" />
                                                <input hidden accept="image/*" multiple type="file" />
                                            </Button>
                                        </div>
                                    </div>
                                </Index.Box>
                            </Index.Box>
                        </Index.Box>
                        <button
                            className="action-btn full-width button-top-space"
                            type="submit"
                        >
                            Submit
                        </button>
                    </Index.Box>
                </Index.Box>
            </div>

        </>
    )
}
