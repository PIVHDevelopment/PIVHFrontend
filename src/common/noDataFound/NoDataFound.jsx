import { Typography } from '@mui/material'
import React from 'react'

export default function NoDataFound() {
    return (
        <>
            <div className="no-address-book">
                {/* <img src={Index.addressbook} alt="addressbook" /> */}
                <Typography className="no-address-title">
                    No Address Data Found
                </Typography>
            </div>
        </>
    )
}
