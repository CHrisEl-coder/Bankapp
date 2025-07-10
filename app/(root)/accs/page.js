
import BankCards from '@/AppComponents/BankCards'
import Hero from '@/AppComponents/Reusable/Hero'
import React from 'react'

const MyAccs = () => {


  return (
    <section className='flex'>
      <div className=' my-banks'> 

      <Hero title={"Bank Accounts"} sub={"Manange Your Bank Account Effortlessly"}/>

      <BankCards />
      </div>

    </section>
  )
}

export default MyAccs