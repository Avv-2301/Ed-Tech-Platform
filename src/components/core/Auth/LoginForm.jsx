import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import { login } from "../../../services/operations/authApi";


const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    //TO TARGET THE INPUT BOX VALUE
  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //TO TOGGLE THE PASSWORD VISIBLITY
  const [showPassword, setShowPassword] = useState(false)

  const {email, password} = formData;

  //DISPATCH LOGIN API
  const handleOnSubmit = (e) =>{
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }


  return (
    <div>
      <form onSubmit={handleOnSubmit} className="flex flex-col mt-6 w-full gap-y-4">
        <label className="w-full">
          <p className="mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]">
            Email Address
            <sup className="text-pink-200">*</sup>
          </p>
          <input
          required
          type="text"
          placeholder="Enter E-mail Address"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="text-richblack-5 bg-richblack-800 w-full p-[12px] rounded-[0.5rem]"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        </label>
        <label className="relative">
          <p className="mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]">
            Password
            <sup className="text-pink-200">*</sup>
          </p>
          <input
          required
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="text-richblack-5 bg-richblack-800 w-full p-[12px] rounded-[0.5rem]"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        <span onClick={() =>setShowPassword((prev) => (!prev))}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer">
          {
            showPassword ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
            ) :
                (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
          }
        </span>
        <Link to={"/forgot-password"}>
          <p className="text-blue-100 text-xs mt-2 ml-auto max-w-max"> 
            Forget Password
          </p>
        </Link>
        </label>
        <button type="submit" className="bg-yellow-50 text-richblack-800 mt-6 rounded-[8px] py-[8px] px-[12px] font-medium font-semibold">
            Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
