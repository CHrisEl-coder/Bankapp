'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { sideBarLinks } from "@/constants"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"


const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>

      <SheetTrigger>
        <Image 
        src='/icons/hamburger.svg'
        height={20}
        width={20}
        alt="menu" 
        />
      </SheetTrigger>


      <SheetContent side='left' className=' bg-white flex flex-col gap-6'>
    
          <div className=" flex gap-2">
              <Image 
                src='/icons/logo.svg'
                width={25}
                height={25}
                alt="logo"
              />

              <h2 className=" text-lg font-bold font-ibm-plex-serif mt-0"> Transact </h2>
          </div>

          <SheetClose asChild>
             <nav>
                {sideBarLinks.map((item) => {

                  const isAtcive = pathname === item.url || pathname.startsWith(`${item.url}/`);

                  return (
                    
                    <SheetClose asChild key={item.label}>
                      <Link 
                        href={item.url} 
                        key={item.label} 
                        className={
                          cn('mobilenav-sheet_close w-full ',
                          {'bg-amber-900': isAtcive }
                            )
                            } >
                      
                        <Image 
                            src={item.icon}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn({
                                'brightness-[3] invert-0' : isAtcive
                            })}
                        />

                        <p className={cn('text-16 font-semibold text-amber-800', {
                              "text-white" : isAtcive
                        })}>
                          {item.label}
                        </p>
                      </Link>  
                    </SheetClose> 
                    
                  )
                  
                })}
               User
            </nav>

          </SheetClose>

          FOOTER
          
      </SheetContent>
</Sheet>

  )
}

export default MobileNav