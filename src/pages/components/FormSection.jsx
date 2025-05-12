import React, { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import PersonalDetail from "./PersonalDetail";
import { FaArrowLeft } from "react-icons/fa6";
import Summery from "./Summery";
import ProfessionalInfo from "./ProfessionalInfo";

const FormSection = ({ id }) => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  return (
    <>
      <div>
        {/* Logo and Button */}
        <div className="flex items-center justify-between mb-10">
          <div
            className={`flex items-center gap-2 border border-gray-400 rounded-md p-2 w-[6rem]`}
          >
            <CiGrid41 className="text-xl" />
            <p className="font-medium">Theme</p>
          </div>

          <div className="flex gap-2 ">
            {activeFormIndex > 1 ? (
              <button
                onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md"
              >
                <FaArrowLeft />
              </button>
            ) : null}

            <button
              onClick={() => setActiveFormIndex(activeFormIndex + 1)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md"
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>

        {/* -------------------personal detail----------------------- */}
        {activeFormIndex === 1 && (
          <PersonalDetail
            id={id}
            setActiveFormIndex={setActiveFormIndex}
            activeFormIndex={activeFormIndex}
          />
        )}
        {/* -------------------personal detail----------------------- */}
        {/* -------------------Summery detail----------------------- */}

        {activeFormIndex === 2 && (
          <Summery
            id={id}
            setActiveFormIndex={setActiveFormIndex}
            activeFormIndex={activeFormIndex}
          />
        )}
        {/* -------------------Summery detail----------------------- */}
        {/* -------------------professional detail----------------------- */}

        {activeFormIndex === 3 && (
          <ProfessionalInfo
            id={id}
            setActiveFormIndex={setActiveFormIndex}
            activeFormIndex={activeFormIndex}
          />
        )}
        {/* -------------------professional detail----------------------- */}
      </div>
    </>
  );
};

export default FormSection;
