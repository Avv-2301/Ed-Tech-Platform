import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import './App.css';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard'
import OpenRoute from './components/core/Auth/OpenRoute';
import PrivateRoute from './components/core/Auth/PrivateRoute'
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import MyProfile from './components/core/Dashboard/MyProfile';
import Error from './pages/Error';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/Cart/index';
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from 'react-redux';
import Settings from "./components/core/Dashboard/Settings";

const App = () => {

  const { user } = useSelector((state) => state.profile)



  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/update-password/:id' element={<UpdatePassword/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/> */}
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        
        

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        /> 
        
        <Route 
        element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
        
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
            <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
            <Route path="dashboard/cart" element={<Cart />} />
            </>
          )
        }

        <Route path="dashboard/settings" element={<Settings />} />


        </Route>

      <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App;
