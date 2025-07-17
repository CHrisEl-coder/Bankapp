import PaymentTransferForm from '@/AppComponents/TransferFunds';
import Hero from '@/AppComponents/Reusable/Hero';
import { getAccounts } from '@/lib/actions/bank.actions';

import React from 'react'
import { redirectIfNotLoggedIn } from '@/lib/auth/redirect';


const Transfer = async () => {

  const loggedIn = await redirectIfNotLoggedIn();

  
  const accounts = await getAccounts({userId: loggedIn ? loggedIn?.$id : null});
  return (
  <section className='w-full px-8 bg-neutral-100'>
    <div className='flex flex-col gap-4'>
      <Hero title={"Transfer Funds"} sub={"Easily Send and Receive Money with our Secure Transfer Service" } />

    <section>
       <PaymentTransferForm accounts={accounts} />
    </section>
    </div>
    
  </section>
  )
}

export default Transfer