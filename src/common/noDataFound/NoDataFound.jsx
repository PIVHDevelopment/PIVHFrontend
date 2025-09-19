import { Typography } from '@mui/material'
import React from 'react'

export default function NoDataFound({message}) {
    return (
        <>
            <div className="no-address-book">
                {/* <img src={Index.addressbook} alt="addressbook" /> */}
                <Typography className="no-address-title">
                {message}
                </Typography>
            </div>
        </>
    )
}
