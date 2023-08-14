import React, { useState } from 'react'
import '../../CSS/Landing.css'
import Login from './Login';
import Signup from './Signup'
export default function Landing() {

  const [loginSignupSwitch, setLoginSignup] = useState(true);
  const [negetiveResponse,setNegetiveResponse] =useState('')

  return (
    <div className='landingDiv'>
      <img src='../IMAGES/Logo.svg' alt='Not' className='langingLogo'></img>
      <p id='langingHeading'>Online Project Management</p>
      <div className='landingSubDiv1'>
      {
          loginSignupSwitch ? 
            <Login setLoginSignup={setLoginSignup} setNegetiveResponse={setNegetiveResponse} /> :
            <Signup setLoginSignup={setLoginSignup} setNegetiveResponse={setNegetiveResponse} />
      }
      </div>
      <p id='negetiveResponse'>{negetiveResponse}</p>
    </div>
  )
}
