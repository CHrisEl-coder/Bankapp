import Image from "next/image";
import Sidebar from "../Components/ui/Sidebar";
import MobileNav from "../Components/ui/MobileNav";


export default function RootLayout({ children }) {
  
  const loggedIn = {
    firstName: "Christian",
    lastName: "Codes"
  }
  return (
   <main className=" flex h-screen font-inter w-full">
      <Sidebar user={loggedIn}/>

      <div className=" flex size-full flex-col">

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
    
   </main>
  );
}
