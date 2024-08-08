import React from 'react'
import Hero from '../Components/ui/Hero'
import TotalBal from '../Components/ui/TotalBal'
import RightSideBar from '../Components/ui/RightSideBar'




const Home = () => {
const loggedIn = { firstName: "Chris", lastName: "Codes", email: "edwinchristian97@gmail"}
  return (
    <section className='home'>
       <div className='home-content'>
          <header className='home-header'>
              <Hero 
                title="Welcome" 
                user={loggedIn.firstName || "Guest" } 
                sub="Manage your daily financial transation, Swiftly and with Ease." />

                <TotalBal 
                  bankAcc={[]}
                  bank={1}
                  currentBal={42000.771} />
          </header>

          
         
       </div>

       <RightSideBar 
       user = {loggedIn}
       banks = {[{}, {}]}
       transaction = {[]}
       
       />
    </section>
  )
}

export default Home