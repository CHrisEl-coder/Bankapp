'use client'

import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

    const pathname = usePathname();

   

  return (
    <section className='sidebar'>
       <nav className=' flex flex-col gap-4'>
          <Link href='/' className=' mb-12 items-center  cursor-pointer gap-2'>
              <Image 
                src='/icons/logo.svg'
                width={34}
                height={34}
                alt='Banking app logo'
                className=' size-[24px] max-xl:size-14'
                />

                <h1 className='sidebar-logo'>
                   Transact
                </h1>
          </Link>

          {sideBarLinks.map((item) => {
            const isAtcive = pathname === item.url || pathname.startsWith(`${item.url}/`);

            return (

              <Link href={item.url} key={item.label} className={cn('sidebar-link', {
                'bg-amber-900': isAtcive
            })}>
               <div className=' relative size-5'>
                  <Image 
                    src={item.icon}
                    alt={item.label}
                    fill
                    className={cn({
                        'brightness-[3] invert-0' : isAtcive
                    })}
                  />
               </div>

               <p className={cn('sidebar-label', {
                    "!text-white" : isAtcive
               })}>
                 {item.label}
               </p>
            </Link>  
            )
            
          })}

          USER
       </nav>

       FOOTER
    </section>
  )
}

export default Sidebar