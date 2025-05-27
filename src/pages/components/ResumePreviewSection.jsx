import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { IoLocationOutline } from "react-icons/io5";

const ResumePreviewSection = ({ id }) => {
  const { formData } = useContext(FormContext);

  const [resumeData, setResumeData] = useState(null);

  const singleResume = async () => {
    const res = await axios.post(
      `http://localhost:8080/singleResumeDetail/${id}`
    );
    setResumeData(res.data);
  };

  console.log(resumeData);
  useEffect(() => {
    singleResume();
  }, [id, formData]);

  const personalInfo = resumeData?.personalInfo || formData?.personalInfo || {};
  const summery = resumeData?.summery || formData?.summery || "";
  const professionalInfo =
    resumeData?.professionalInfo || formData?.professionalInfo || [];
  const projects = resumeData?.projects || formData?.projects || [];
  const skill = resumeData?.skill || formData?.skill || [];
  const education = resumeData?.education || formData?.education || "";

  return (
    <div className="">
      {/* Inner scrollable box */}
      <div className="overflow-y-scroll max-h-[85vh] bg-white p-5 rounded-md shadow-md">
        {/* personal info section */}
        <div className="border-t-[1rem] border-t-red-400">
          {/* Name */}
          <h1 className="pt-5 text-center text-2xl font-bold">
            {personalInfo?.firstName || "FirstName"}{" "}
            {personalInfo?.lastName || "lastName"}
          </h1>

          {/* Title */}
          <h2 className="text-center text-xl font-bold">
            {personalInfo?.jobTitle || "jobTitle"}
          </h2>

          {/* Address */}
          <h2 className="text-center text-lg font-bold my-2">
            <div className="flex justify-center items-center gap-1">
              <IoLocationOutline size={20} />
              {personalInfo?.address || "address"}
            </div>
          </h2>

          {/* Contact */}
          <div className="my-1 flex justify-between border-b-[3px] py-1 border-b-red-400">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-xl">☎️</span>
              <p className="text-lg font-bold">
                {personalInfo?.phone || "9156776848"}
              </p>
            </div>

            <div className="flex justify-center items-center gap-2">
              <span className="text-xl">📧</span>
              <p className="text-lg font-bold">
                {personalInfo?.email || "ashokranka@gmail.com"}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="font-medium my-3  w-full whitespace-pre-wrap break-words">
            {summery || "No summary available"}
          </div>

          {/* Experience Section */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            Experince
          </h1>

          {/* Example Experience */}
          <div>
            {Array.isArray(professionalInfo) &&
              professionalInfo.map((exp, index) => (
                <div key={exp._id || index} className="mb-4">
                  <div className="flex justify-between mt-1">
                    <p className="text-red-400 font-semibold flex gap-2 items-center">
                      {exp.designation}
                      <span className="text-sm text-center text-black">
                        {exp.companyName}
                      </span>
                    </p>
                    <div className="flex gap-5">
                      <p className="font-semibold">
                        {new Date(exp.startDate).toLocaleDateString("en-GB")} -{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-GB")
                          : "Current"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2">{exp.workSummery}</p>
                </div>
              ))}
          </div>

          {/* Repeat experiences... */}

          {/* Project Section */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            PROJECT
          </h1>
          {Array.isArray(projects) &&
            projects.map((proj, index) => (
              <div key={index} className="mb-4">
                <p>{proj.title}</p>
                <p>{proj.features}</p>
              </div>
            ))}

          {/* Skills */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            SKILL
          </h1>
          <ul className="flex gap-5 flex-wrap">{skill}</ul>

          {/* Education */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            EDUCATION
          </h1>
          <p>{education}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewSection;
