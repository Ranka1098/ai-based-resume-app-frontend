import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { IoLocationOutline } from "react-icons/io5";

const ResumePreviewSection = ({ id }) => {
  const [resumeData, setResumeData] = useState(null);
  const { formData, setFormData } = useContext(FormContext);

  const singleResume = async () => {
    const res = await axios.post(
      `http://localhost:8080/singleResumeDetail/${id}`
    );
    setResumeData(res.data);
  };
  console.log(resumeData);

  useEffect(() => {
    singleResume();
  }, [id]);

  return (
    <div className="">
      {/* Inner scrollable box */}
      <div className="overflow-y-scroll max-h-[85vh] bg-white p-5 h-full rounded-md shadow-md">
        {/* personal info section */}
        <div className="border-t-[1rem] border-t-red-400">
          {/* Name */}
          <h1 className="pt-5 text-center text-2xl font-bold">
            {resumeData?.personalInfo?.firstName ||
              formData?.personalInfo?.firstName ||
              "FirstName"}{" "}
            {resumeData?.personalInfo?.lastName ||
              formData?.personalInfo?.lastName ||
              "LastName"}
          </h1>
          {/* Title */}
          <h2 className="text-center text-xl font-bold">
            {resumeData?.personalInfo?.jobTitle ||
              formData?.personalInfo?.jobTitle ||
              "jobTitle"}
          </h2>

          {/* Address */}
          <h2 className="text-center text-lg font-bold my-2">
            <div className="flex justify-center items-center gap-1">
              <IoLocationOutline size={20} />
              {resumeData?.personalInfo?.address ||
                formData?.personalInfo?.address ||
                "address"}
            </div>
          </h2>

          {/* Contact */}
          <div className="my-1 flex justify-between border-b-[3px] py-1 border-b-red-400">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-xl">☎️</span>
              <p className="text-lg font-bold">
                {resumeData?.personalInfo?.phone ||
                  formData?.personalInfo?.phone ||
                  "Phone"}
              </p>
            </div>

            <div className="flex justify-center items-center gap-2">
              <span className="text-xl">📧</span>
              <p className="text-lg font-bold">
                {resumeData?.personalInfo?.email ||
                  formData?.personalInfo?.email ||
                  "Email"}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="font-medium my-3  w-full whitespace-pre-wrap break-words">
            {resumeData?.summery ||
              formData?.personalInfo?.summery ||
              "No summary available"}
          </div>

          {/* Experience Section */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            Work Experince
          </h1>

          {/* Example Experience */}
          <div>
            {Array.isArray(resumeData?.professionalInfo) &&
              resumeData?.professionalInfo.map((exp, index) => (
                <div key={exp._id || index} className="mb-4">
                  <div className="flex justify-between mt-1">
                    <div className="flex flex-col">
                      <p className="text-red-400 font-semibold flex gap-2 items-center">
                        {exp.designation}
                        <span className="text-sm text-center text-black">
                          {exp.companyName}
                        </span>
                      </p>
                      <p className="text-red-400 justify-center font-serif text-sm flex gap-2 items-center">
                        {exp.city}
                        <span className="text-sm text-center text-black">
                          {exp.state}
                        </span>
                      </p>
                    </div>
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
          {Array.isArray(resumeData?.projects) &&
            resumeData?.projects.map((proj, index) => (
              <div key={index} className="mb-4">
                <p className="font-serif font-bold">{proj.title}</p>
                <p className="font-semibold">Features</p>
                <p>{proj.feature}</p>
              </div>
            ))}

          {/* Skills */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            SKILL
          </h1>
          <ul
            style={{ whiteSpace: "pre-line" }}
            className="font-mono break-words "
          >
            {resumeData?.skill.length > 0
              ? resumeData.skill.map((sk, index) => <li key={index}>{sk}</li>)
              : "No skills yet"}
          </ul>
          {/* Education */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            EDUCATION
          </h1>
          <ul
            style={{ whiteSpace: "pre-line" }}
            className="font-semibold  break-words "
          >
            {resumeData?.education?.length > 0
              ? resumeData?.education?.map((sk, index) => (
                  <li key={index}>{sk}</li>
                ))
              : "No education yet"}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewSection;
