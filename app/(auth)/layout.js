import React from "react";

import Image from "next/image"



// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {

  return (
     <main className=" mx-auto w-full">
        <div className="mx-auto max-w-3xl flex flex-col md:flex-row items-stretch justify-center p-4 shadow-md rounded-lg">
           <div className="w-full md:w-1/2">
            {children}
           </div>
           <div className="relative w-full md:w-1/2 ">
            <Image src={"/icons/bank.jpg"} alt="Banking Asset" fill className="object-cover" />
           </div>
        </div>
     </main>
  );
}
