/* eslint-disable react/prop-types */
import React from "react";

import Image from "next/image";
import Sidebar from "@/AppComponents/Sidebar";
import MobileNav from "@/AppComponents/MobileNav";
import { getLoggedInUser } from "@/lib/actions/userActions";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";


export default async function RootLayout({ children }) {
  
  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/sign-in')


  return (
   <main className="flex h-screen font-inter w-full">
      <Sidebar user={loggedIn}/>

      <div className="w-full flex-1 overflow-y-auto bg-gray-25">

         <div className="root-layout">
            <Image 
            src='./icons/logo.svg'
            alt="logo"
            height={30}
            width={30}
            />

            <div>
               <MobileNav user={loggedIn} />
            </div>

         </div>
         
         {children} 
      </div>
     <ToastContainer />
   </main>
  );
}
