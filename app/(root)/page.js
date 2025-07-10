import React from 'react'
import PropTypes from 'prop-types'
import Hero from '@/AppComponents/Reusable/Hero'
import TotalBal from '@/AppComponents/TotalBal'
import RightSideBar from '@/AppComponents/RightSideBar'
import { getLoggedInUser } from '@/lib/actions/userActions'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import RecentTransactions from '@/AppComponents/Reusable/RecentTransactions'




const Home = async ({ searchParams }) => {

  const {id, page} = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({userId: loggedIn ? loggedIn?.$id : null});

  if (!loggedIn) {
    return (
      <section className='home'>
        <div className='home-content'>
          <header className='home-header'>
            <Hero 
              title="Welcome" 
              user="Guest" 
              sub="Please log in to manage your daily financial transactions." />
          </header>
        </div>
      </section>
    )
  }

  if(!accounts || accounts.length === 0) return;

  const accData = accounts.data;

  const itemId = (id) || accData[0]?.appwriteItemId;

  const account = await getAccount({appwriteItemId: itemId});

 

  const dummy = {
    name: "John Doe",
    email: "johnDoe@mail.com"
  }
  return (
    <section className='home'>
       <div className='home-content'>
          <header className='home-header'>
              <Hero 
                title="Welcome" 
                user={loggedIn ? loggedIn?.firstName : "Guest"} 
                sub="Manage your daily financial transation, Swiftly and with Ease." />

                <TotalBal 
                  bankAcc={accData}
                  banks={accounts?.totalBanks || 0}
                  currentBal={accounts?.totalCurrentBalance} />
          </header>

          <RecentTransactions 
            accounts={accData}
            transactions={account?.transactions || []}
            appwriteItemId={itemId}
            page={currentPage}
          />

          
         
       </div>

       <RightSideBar 
       user = {loggedIn ? loggedIn : dummy}
       banks = {accData?.slice(0, 2)}
       transaction = {account?.transactions || []}
       
       />
    </section>
  )
}
Home.propTypes = {
  searchParams: PropTypes.shape({
    id: PropTypes.any,
    page: PropTypes.any,
  }),
};

export default Home;