import React from 'react'
import Index from '../Index'

const SuccessMessage = () => {
    const navigate = Index.useNavigate();
  return (
    <div className="app-container p-20-0 signin-main">
      <div className="p-26">
        <div className='pin-success-message-div'>
         <div className="logo-box">
            <img src={Index.successIcon} alt="Success" />
         </div>
         <div className='success-message'>
            <p>
            Your account is setup successfully, you can now perform transactions securely.
     </p>
         </div>
         <div className='button-box'>
            <button onClick={() => navigate("/home")}>Go to home page</button>
         </div>
        </div>
        
        </div>
        </div>
  )
}

export default SuccessMessage