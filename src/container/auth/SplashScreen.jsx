import React from 'react'

export default function SplashScreen() {
    return (
        <>
            <div className="app-container signin-main">
                <header className="signin-header">
                    <img src={Index.pocketPi2} alt="PocketPi" className="app-logo" />
                    <button className='secondary-btn'>Continue</button>
                </header>
            </div>
        </>
    )
}
