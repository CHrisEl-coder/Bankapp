import React from "react";

import Image from "next/image"



// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {

  return (
     <main className=" flex justify-between content-center p-8 gap-4">
         {children}
         <div>
               <div className="auth-asset">

                  <Image 
                  src="/icons/bank.jpg"
                  width={600}
                  height={100}
                  alt="bank icon"
                  />
               
               </div>
         </div>
     </main>
  );
}
