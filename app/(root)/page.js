import React from 'react'
import Hero from '../Components/ui/Hero'
import TotalBal from '../Components/ui/TotalBal'
import RightSideBar from '../Components/ui/RightSideBar'
import { getLoggedInUser } from '@/lib/actions/userActions'




const Home = async () => {

  const loggedIn = await getLoggedInUser();
  const dummy = {
    name: "John Doe",
    email: "johnDoe@mail.com"
  }
  return (
    <section className='home'>
       <div className='home-content'>
          <header className='home-header'>
              <Hero 
                title="Welcome" 
                user={loggedIn ? loggedIn.name : "Guest"} 
                sub="Manage your daily financial transation, Swiftly and with Ease." />

                <TotalBal 
                  bankAcc={[]}
                  bank={1}
                  currentBal={42000.771} />
          </header>

          
         
       </div>

       <RightSideBar 
       user = {loggedIn ? loggedIn : dummy}
       banks = {[{
        currBal: 1234.50
      }, {
        currBal: 2223.79
      }]}
       transaction = {[]}
       
       />
    </section>
  )
}

export default Home