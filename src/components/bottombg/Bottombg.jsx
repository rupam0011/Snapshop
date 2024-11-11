import React from 'react'
import bottombg from '../../assets/bottombg.png'
import './Bottombg.css'
import { useNavigate } from 'react-router-dom'
const Bottombg = () => {
  let navigate = useNavigate()
  return (
    <div className='bottombg-body'>
      <div className="bottomimg-div">
        <img src={bottombg} alt="" srcset="" />
      </div>
      
      <div className="offer-content">
        <div className="offer-text">
          <div className="bold-offer">
          <p>Get <span>Flat 10% OFF</span> On</p>
          <p>Your First Purchase</p>
          </div>
          <p className='disclaimer'>sign up for our latest collections and newsletter</p>
        </div>
        <div className="signin-option">
          <input type="email" placeholder='Enter your email' />
          <button onClick={() => navigate('/login')}>Sign up now</button>
        </div>
      </div>
    </div>
  )
}

export default Bottombg