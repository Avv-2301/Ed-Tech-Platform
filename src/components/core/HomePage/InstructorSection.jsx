import React from "react";
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";

const InstructorSection = () => {
  return (
    <div className="mt-10">
      <div className="flex flex-row gap-20 items-center">
        <div className="lg:w-[50%]">
          <img
            src={Instructor}
            alt="Instructor"
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>

        <div className="w-[50%] gap-10 flex flex-col ">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighlightText text={"instructor"} />
          </div>

          <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight/>
                </div>
            </CTAButton>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstructorSection;
