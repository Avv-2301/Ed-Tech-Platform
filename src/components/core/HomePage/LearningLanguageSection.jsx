import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <div className="mt-[100px]">
      <div className="flex flex-col gap-5">
        <div className="text-4xl font-semibold text-center my-10">
          Your Swiss Knife For
          <HighlightText text={"learning any language"} />
        </div>
        <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
          <img
            src={Know_your_progress}
            alt="Know_your_progress"
            className="object-contain  lg:-mr-32 "
          />
          <img
            src={Compare_with_others}
            alt="Compare_with_others"
            className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
          />
          <img
            src={Plan_your_lessons}
            alt="Plan_your_lessons"
            className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
          />
        </div>

        <div  className="w-fit mx-auto lg:mb-20 mb-8 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
                <div>
                    Learn More
                </div>
            </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
