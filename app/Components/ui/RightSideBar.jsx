import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Card from './Card'

const RightSideBar = ({banks, user, transaction}) => {
  return (
    <aside className='right-sidebar'>
       <section className='flex flex-col pb-8'>
          <div className='profile-banner' />
          <div className='profile'>
            <div className='profile-img'>
               <span className='text-5xl font-bold text-amber-900'>
               {user.firstName[0]}  
               </span>
            </div>

            <div className='profile-details'>
              <h1 className='profile-name'>
                 {user.firstName} {user.lastName}
              </h1>
               
              <p className='profile-email'>
                 {user.email}
              </p>
            </div>
          </div>
       </section>

       <section className='banks'>
          <div className='flex w-full justify-between'>
             <h2 className='header-2'> My Banks</h2>
             <Link href='/' className='flex gap-2'>
               <Image 
                src="/icons/plus.svg"
                width={20}
                height={20}
                alt='add'
                />
               <h2 className='text-14 font-semibold text-gray-600'>add bank</h2>
             </Link>
             
          </div>

          {banks.length > 0 && (
            <div className=' relative flex flex-1 flex-col items-center justify-between gap-5'>
              <div className='relative z-10'>
                <Card 
                key={banks[0].id}
                accounts={banks[0]}
                ownerName={`${user.firstName} ${user.lastName}`}
                showBal={false}
                />
              </div>
              {banks[1] && (
                <div className=' absolute top-8 right-0 z-0 w-[90%]'>
                  <Card 
                  key={banks[1].id}
                  accounts={banks[1]}
                  ownerName={`${user.firstName} ${user.lastName}`}
                  showBal={false}/>
                </div>
              )}
            </div>
          )}
       </section>
    </aside>
  )
}

export default RightSideBar