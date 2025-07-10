import Hero from '@/app/AppComponents/ui/Hero'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/userActions';
import React from 'react'
import PropTypes from 'prop-types';
import Transactions from '@/app/AppComponents/ui/Transactions';
import { formatAmount } from '@/lib/utils';
import { Pagination } from '@/app/AppComponents/ui/Pagination';

const History = async ({searchParams}) => {

  const {id, page} = searchParams

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
   const displayedRows = 10;
  const totalPages = Math.ceil(account?.transactions.length / displayedRows);
  const lastTransactionIndex = page * displayedRows;
  const firstTransactionIndex = lastTransactionIndex - displayedRows;

  const currentRows = account?.transactions.slice(
    firstTransactionIndex,
    lastTransactionIndex
  );

  return (
       <section className='transactions'>
          <div className='transactions-header'>
    <Hero
           title="Transaction History"
           sub="View your transaction history and deails."
           />
          </div>
           <div>
            <div className='space-y-6'>
              <div className='transactions-account'>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-14 text-white font-semibold'>
                     {account?.data?.name}
                  </h2>
                  <p className='text-12 text-blue-100 font-medium'> {account?.data?.officialName}</p>
                   <p className="text-14 font-semibold text-white tracking-[1.1px]">
              ●●●● ●●●● ●●●●
              <span className="text-16"> {account?.data?.mask} </span>
            </p>
                </div>

                <div className='transactions-account-balance'>

                  <p className='text-14 font-medium text-blue-100'>
                    Current Balance
                  </p>
                  <p className='text-16 font-bold text-white'>
                    {account?.data?.currentBalance ? `${ formatAmount(account?.data?.currentBalance) }` : 'N/A'}
                  </p>

                </div>
    
              </div>

              <section>
                <Transactions 
                className="w-full flex flex-col gap-6"
                 transactions={currentRows} />

                  {totalPages > 1 && (
                         <div className="my-4 w-full">
                           <Pagination totalPages={totalPages} page={currentPage} />
                         </div>
                       )}
              </section>
    
            </div>
           </div>
        </section>
  )
}
History.propTypes = {
  searchParams: PropTypes.object,
  currentPage: PropTypes.number
};

export default History
