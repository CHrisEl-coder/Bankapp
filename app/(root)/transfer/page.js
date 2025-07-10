import TransferFunds from '@/app/AppComponents/TransferFunds'
import Hero from '@/app/AppComponents/ui/Hero'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/userActions';
import React from 'react'

const Transfer = async () => {

  const loggedIn = await getLoggedInUser();
  
  const accounts = await getAccounts({userId: loggedIn ? loggedIn?.$id : null});
  return (
  <section className=' size-full px-8 bg-neutral-100'>
    <div className='flex flex-col gap-4'>
      <Hero title={"Transfer Funds"} sub={"Easily Send and Receive Money with our Secure Transfer Service" } />

    <section>
       <TransferFunds accounts={accounts} />
    </section>
    </div>
    
  </section>
  )
}

export default Transfer