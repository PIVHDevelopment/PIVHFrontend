import React from 'react'
import Index from '../Index'

const CommingSoon = () => {
  const navigate = Index.useNavigate();
  return (
    <>
    
     <div className="app-container">
       <Index.Box className="coming-hgt">
         <Index.Box className="app-comming-soon">
            <img src={Index.comming} alt="comming" className='coming-soon'/>
            <Index.Typography component='p'>We are going to launch very soon<br/> Stay Tune.</Index.Typography>

            <Index.Button className="action-btn"  onClick={() => navigate('/home')}>
                    Back to Dashboard
            </Index.Button>
        </Index.Box>
       </Index.Box>
     </div>
    </>
  )
}

export default CommingSoon