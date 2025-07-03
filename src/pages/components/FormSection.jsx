import React, { useContext, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import PersonalDetail from "./PersonalDetail";
import { FaArrowLeft } from "react-icons/fa6";
import Summery from "./Summery";
import ProfessionalInfo from "./ProfessionalInfo";
import ProjectInfo from "./ProjectInfo";
import Skill from "./Skill";
import Education from "./Education";
import FullResume from "./FullResume";
import ThemeColor from "./ThemeColor";
import FormContext from "@/context/FormContext";

const FormSection = ({ id }) => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const { formData } = useContext(FormContext);
  const themeColor = formData?.themeColor || "#000";

  return (
    <>
      <div className="">
        {/* Logo and Button */}
        <div className="flex items-center justify-between  m-2">
          <div style={{ border: themeColor }}>
            <ThemeColor />
          </div>

          <div className="flex gap-2 ">
            {activeFormIndex > 1 ? (
              <button
                onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                style={{ background: themeColor }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md"
              >
                <FaArrowLeft />
              </button>
            ) : null}

            {activeFormIndex === 6 ? (
              ""
            ) : (
              <button
                onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                style={{ background: themeColor }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-md"
              >
                Next <FaArrowRight />
              </button>
            )}
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
        {/* -------------------project detail----------------------- */}

        {activeFormIndex === 4 && (
          <ProjectInfo
            id={id}
            setActiveFormIndex={setActiveFormIndex}
            activeFormIndex={activeFormIndex}
          />
        )}
        {/* -------------------project detail----------------------- */}
        {/* -------------------skill detail----------------------- */}

        {activeFormIndex === 5 && (
          <Skill
            id={id}
            setActiveFormIndex={setActiveFormIndex}
            activeFormIndex={activeFormIndex}
          />
        )}
        {/* -------------------skill detail----------------------- */}
        {/* -------------------education detail----------------------- */}

        {activeFormIndex === 6 && (
          <Education
            id={id}
            setActiveFormIndex={setActiveFormIndex}
            activeFormIndex={activeFormIndex}
          />
        )}
        {/* -------------------education detail----------------------- */}

        {activeFormIndex === 7 && <FullResume id={id} />}
      </div>
    </>
  );
};

export default FormSection;
