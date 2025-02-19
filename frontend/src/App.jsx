// Importing necessary React functions and modules  
import React from 'react'  
import { Route, Routes } from 'react-router-dom' // Importing routing components  

// Importing different page components for navigation  
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper' // Protects user routes  
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper' // Protects captain routes  
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

// Importing Remix Icons for UI icons  
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <div>
      <Routes> 
        {/* Route for the start page */}
        <Route path='/' element={<Start />} />  

        {/* Routes for user login and signup */}
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />

        {/* Routes for captain login and signup */}
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

        {/* User's main home page (protected route) */}
        <Route path='/home' 
          element={
            <UserProtectWrapper> 
              <Home /> 
            </UserProtectWrapper>
          } 
        />

        {/* User logout route (protected) */}
        <Route path='/user/logout'
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          } 
        />

        {/* Captain's main home page (protected route) */}
        <Route path='/captain-home' 
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          } 
        />

        {/* Captain logout route (protected) */}
        <Route path='/captain/logout' 
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          } 
        />

        {/* Routes for ride screens */}
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
      </Routes>
    </div>
  )
}

// Exporting the App component so it can be used in other parts of the project  
export default App
