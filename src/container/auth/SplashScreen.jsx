import React, { useState, useEffect } from 'react'
import Index from '../Index'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
    const navigate = useNavigate()
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const handleSendSignin = () => {
        navigate('/signin')
    }

    return (
        <div className="app-container signin-main">
            <div className="splash-box fade-in">
                <img src={Index.pocketPi2} alt="PocketPi" className="app-logo logo-animate" />
                {showButton && (
                    <div className='common-btn-space-main splash-btn-main fade-in-button'>
                        <button className='secondary-btn' onClick={handleSendSignin}>Continue</button>
                    </div>
                )}
            </div>
        </div>
    )
}
