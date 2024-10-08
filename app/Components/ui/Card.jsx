import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ownerName, showBal, accounts}) => {
  return (
    <div className=' flex flex-col'>
        <Link href="/" className='bank-card'>

            <div className='bank-card_content'>
                <div>
                    <h1 className='text-16 font-semibold text-white' >
                        {accounts.name || ownerName}
                    </h1>

                    <p className='font-ibm-plex-serif font-black text-white'>
                        {formatAmount(accounts.currBal)}
                    </p>
                </div>

                <article className=' flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h1 className='text-12 font-semibold text-white'>
                           {ownerName}
                        </h1>

                        <h2 className='text-14 text-white font-semibold'>
                        ●● / ●●
                        </h2>
                    </div>
                    
                    <p className='text-14 font-semibold text-white tracking-[1.1px]'>
                    ●●●● ●●●● ●●●● 
                        <span className='text-16'> {1234} </span>
                    </p>

                   
                </article>
            </div>
            
            <div className='bank-card_icon'>
                <Image 
                src="/icons/Paypass.svg"
                height={24}
                width={20}
                alt='pay'
                />

                <Image 
                src='/icons/mastercard.svg'
                width={45}
                height={32}
                alt='master'
                className='ml-4'
                />

             
            </div>

            <Image 
            src='/icons/lines.png/'
            width={316}
            height={192}
            alt='lines'
            className='absolute top-0 left-0'
            />
        </Link>

        
    </div>
  )
}

export default Card