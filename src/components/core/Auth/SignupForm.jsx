import React, {useState} from 'react';
import Tab from '../../common/Tab';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import  {useDispatch } from 'react-redux';
import { signUp } from '../../../services/operations/authApi';

const SignupForm = () => {

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //TAB DATA
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 1,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];


  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"", 
    password:"", 
    confirmPassword:""
  });

  //TO TARGET THE INPUT VALUES
  const handleInputChange = (e) =>{
    setFormData((prev) =>({
      ...prev,
      [e.target.name]: [e.target.value]
    }))
  }


  const handleOnSubmit = (e) =>{
    e.preventDefault()

    // if(password !== confirmPassword){
    //  toast.error("password do not match")
    //  return 
    // }
    dispatch(signUp(),navigate)
  }
  const{firstName, lastName, email, password, confirmPassword} = formData

  return (
    
    <div>
      {/* TAB */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
      {/* SIGNUP FORM */}
      <form className='w-full flex flex-col gap-y-4' onSubmit={handleOnSubmit}>
        <div className='flex flex-row gap-x-4'>
          <label>
            <p className='mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'>First Name
            <sup className='text-pink-200'>*</sup>
            </p>
            <input
            required
            type='text'
            name='firstName'
            placeholder='Enter First Name'
            value={firstName}
            onChange={handleInputChange}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            />
          </label>
          <label>
            <p className='mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'>Last Name
            <sup className='text-pink-200'>*</sup>
            </p>
            <input
            required
            type='text'
            name='lastName'
            placeholder='Enter Last Name'
            value={lastName}
            onChange={handleInputChange}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            />
          </label>
        </div>
        <label>
            <p className='mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'>Email Address
            <sup className='text-pink-200'>*</sup>
            </p>
            <input
            required
            type='email'
            name='email'
            placeholder='Enter Email Address'
            value={email}
            onChange={handleInputChange}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            />
          </label>
          <div className='flex gap-x-4'>
          <label className='relative'>
            <p className='mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'> Create Password
            <sup className='text-pink-200'>*</sup>
            </p>
            <input
            required
            type={showPassword ? "text" :"password"}
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={handleInputChange}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            />
            <span onClick={ () => setShowPassword((prev) =>(!prev))}
              className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
              {
                showPassword ? 
                (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                ) :
                  (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
              }
            </span>
          </label>
          <label className='relative'>
            <p className='mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'> Confirm Password
            <sup className='text-pink-200'>*</sup>
            </p>
            <input
            required
            type={showconfirmPassword ? "text" :"password"}
            name='confirmPassword'
            placeholder='Enter Password'
            value={confirmPassword}
            onChange={handleInputChange}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            />
            <span onClick={ () => setShowConfirmPassword((prev) =>(!prev))}
              className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
              {
                showconfirmPassword ? 
                (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                ) :
                  (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
              }
            </span>
          </label>
          </div>
          <button type="submit" className="bg-yellow-50 text-richblack-800 mt-6 rounded-[8px] py-[8px] px-[12px] font-medium font-semibold">
            Sign In
        </button>
      </form>
    </div>
  )
}

export default SignupForm