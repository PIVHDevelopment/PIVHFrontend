import React from 'react'
import Index from '../Index'

export default function TransactionSuccess() {
    return (
        <>
            <div className="app-container p-20-0">
                <div className='success-main'>
                    <img src={Index.piCoiImg} class="character coin" />
                    <img src={Index.piWallettImg} class="character wallet" />

                    <div className='success-icon'>
                        <img src={Index.successfullIcon} alt="Success" className='success-icon' />
                    </div>
                    <div className='success-message-box'>
                        <p className='success-message'>Your transaction was successful</p>
                        <button className="action-btn  success-btn">
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
