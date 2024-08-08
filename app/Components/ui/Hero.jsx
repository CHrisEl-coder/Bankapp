import React from 'react'

const Hero = ({ user, sub, title } ) => {
  return (
    <div className='header-box'>
       <h1 className='header-box-title'>
          {title},
          <span className=' text-amber-600'> &nbsp;{user} </span>
          <p className='header-box-subtext'> {sub} </p>
       </h1>
    </div>
  )
}

export default Hero