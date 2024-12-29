
import { logOut } from "@/lib/actions/userActions"
import Image from "next/image"
import PropTypes from "prop-types"
import React from "react"
import { useRouter } from "next/navigation"

export const Footer = ({user, type = 'desktop'}) => {

    const router = useRouter();

    const handleLogOut = async () => {
        const LoggedOut = await logOut();

        if(LoggedOut) router.push('/sign-up')

    }
    return(
        <>
          <footer className="footer">
            <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
                <p className="text=xl font-bold text-gray-700">
                   {user.name[0]}  
                </p>
               
            </div>

            <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>

                <h1 className=" text-14 truncate text-gray-700 font-semibold">
                    {user.name}
                </h1>

                <p className=" text-14 truncate font-normal text-gray-800">
                    {user.email}
                </p>

            </div>

            <div className="footer_image" onClick={handleLogOut}>
               <Image 
              src='/icons/logout.svg'
              alt="logout icon"
              width={20}
              height={20}
            /> 
            </div>

            
          </footer>
        </>
    )
}

Footer.propTypes = {
    user: PropTypes.string,
    type: 'mobile' | 'desktop'
}