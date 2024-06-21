import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import {getPasswordResetToken} from '../services/operations/authApi';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("")
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {
            loading ? 
            (<div className='spinner'>Loading</div>) 
            : 
            (<div className='max-w-[500px] p-4 lg:p-8'>
                <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                    {
                        !emailSent ? "Reset Your Password" : "Check Your Email"
                    }
                </h1>
                <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                    {
                        !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                        : 
                        `We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit}>
                    {
                        !emailSent && (
                            <label className='w-full'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>E-mail Address
                                    <sup className='text-pink-200'>*</sup>
                                </p>
                                <input
                                required
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your E-mail Address'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"/>
                            </label>
                        )
                    }
                    <button type='submit' className='mt-5 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                        {
                            !emailSent ? "Reset Password" : "Resend Email"
                        }
                    </button>
                </form>
                <div className='mt-6 flex items-center justify-between'>
                    <Link to='/login'>
                    
                        <p className="flex items-center gap-x-2 text-richblack-5 text-bold">
                        <FaArrowLeft/>Back To Login</p>
                    </Link>
                </div>
            </div>)
        }
    </div>
  )
}

export default ForgotPassword