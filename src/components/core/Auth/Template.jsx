import React from "react";
import { useSelector } from "react-redux";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import frame from '../../../assets/Images/frame.png'

const Template = ({ title, description, description2, image, formType }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse gap-y-12 justify-between py-12 md:flex-row  md:gap-y-0 md:gap-x-12">
            <div className="max-auto w-11/12 max-w-[450px] md:mx-0">
              <h1 className="text-richblack-5 text-[1.875rem] font-semibold leading-[2.375rem]">
                {title}
              </h1>
              <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                <span className="text-richblack-100">{description}</span>{" "}
                <span className="font-edu-sa font-bold italic text-blue-100">
                  {description2}
                </span>
              </p>
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
            <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                <img 
                src={frame}
                alt="frame"
                height={558}
                width={504}
                loading="lazy"/>
                <img 
                src={image}
                alt="frame"
                height={558}
                width={504}
                loading="lazy"
                className="absolute -top-4 z-10 right-4"/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
