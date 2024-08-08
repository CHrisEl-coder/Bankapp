
import React from 'react'
import Counter from './Counter'
import DougnutChart from './DougnutChart'

const TotalBal = ({ bankAcc = [], bank, currentBal}) => {
  return (
    <section className=' total-balance'>
       <div className=' total-balance-chart'>
           <DougnutChart acc={bankAcc}/>
       </div>

       <div className=' flex flex-col gap-6'>
          <h2 className='header-2'>
             Accounts: {bank}
          </h2>

          <div className=' flex flex-col gap-2'>
             <p className=' total-balance-label'>
                Current Bal: 
             </p>

             <p className='total-balance-amount flex-center gap-2'>
                <Counter amount = {currentBal}/>
                
             </p>
          </div>
       </div>
    </section>
  )
}

export default TotalBal