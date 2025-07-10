'use client';

import React from 'react'
import CountUp from 'react-countup'

const Counter = ({amount}) => {
  return (
    <CountUp 
      end={amount}
      prefix='$'
      decimal=','
      duration={2.5}
      />
  )
}

export default Counter