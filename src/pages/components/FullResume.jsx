import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FcShare } from "react-icons/fc";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const FullResume = () => {
  const [resumeData, setResumeData] = useState(null);
  const { formData, refreshResume } = useContext(FormContext);
  const themeColor = formData?.themeColor || "#000";

  const { id } = useParams();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;
  const title = `this is my ${resumeData?.title} resume see it`;

  const navigate = useNavigate();

  const singleResume = async () => {
    const res = await axios.get(
      `https://ai-based-resume-app-backend.onrender.com/singleResumeDetail/${id}`
    );
    setResumeData(res.data);
  };
  const handleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  useEffect(() => {
    singleResume();
  }, [id, refreshResume]);

  const projectData = resumeData?.projects?.length
    ? resumeData.projects
    : formData?.projects || [];

  const professionalData = (
    resumeData?.professionalInfo?.length
      ? resumeData.professionalInfo
      : formData?.professionalInfo || []
  ).filter(
    (item) => item?.designation || item?.companyName || item?.workSummery
  );

  const skill = resumeData?.skill?.length
    ? resumeData.skill
    : formData?.skill || [];

  const education = resumeData?.education?.length
    ? resumeData.education
    : formData?.education || [];

  return (
    <div className="flex items-center justify-center  relative">
      <div className="absolute top-6 left-6 flex gap-3 print:hidden">
        <button
          onClick={() => navigate("/")}
          className="bg-white border border-gray-300 px-4  rounded-md hover:bg-gray-200 transition-all font-medium shadow-sm print:hidden "
        >
          ⬅️ Back
        </button>
      </div>

      <div className="mt-15 print:mt-0 p-2">
        <div className="w-full max-w-[750px] mx-auto px-4 sm:px-6 print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none my-5 bg-white py-4 rounded-xl shadow-xl border border-gray-300  print:hidden">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 text-center">
            🎉 Congratulations! Your AI-Generated Resume is Ready!
          </h1>

          <p className="text-sm sm:text-lg text-gray-600 mb-6 text-center">
            You can now download your resume or share a unique link.
          </p>
        </div>

        <div className="relative w-full sm:w-auto  print:hidden">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleDownload}
              className="bg-white  border flex items-center justify-center  border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 transition-all font-medium shadow-sm w-full sm:w-auto"
            >
              <FcShare size={20} />
              Download
            </button>

            <button
              onClick={handleShare}
              className="bg-white border flex items-center justify-center gap-2 border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 transition-all font-medium shadow-sm w-full sm:w-auto"
            >
              <FcShare size={20} />
              Share
            </button>
          </div>
          {showShareOptions && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white p-3 rounded-md shadow-md z-50">
              <div
                className="flex gap-4 justify-center items-center"
                onClick={() => setShowShareOptions(false)}
              >
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  onClick={() => setShowShareOptions(false)}
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>

                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  onClick={() => setShowShareOptions(false)}
                >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>

                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  onClick={() => setShowShareOptions(false)}
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>

                <LinkedinShareButton
                  url={shareUrl}
                  title={title}
                  onClick={() => setShowShareOptions(false)}
                >
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
              </div>
            </div>
          )}
        </div>

        <div className="">
          {/* Inner scrollable box */}
          <div className="bg-white p-5 h-full rounded-md shadow-md print:overflow-visible print:max-h-full print:shadow-none print:rounded-none print:p-0 print:m-0">
            {/* personal info section */}
            <div
              className="border-t-[1rem] border-t-red-400"
              style={{ borderColor: themeColor }}
            >
              {/* Name */}
              <h1
                className="pt-5 text-center text-2xl font-bold"
                style={{ borderColor: themeColor }}
              >
                {resumeData?.personalInfo?.firstName?.toUpperCase() ||
                  formData?.personalInfo?.firstName?.toUpperCase() ||
                  "FirstName"}{" "}
                {resumeData?.personalInfo?.lastName?.toUpperCase() ||
                  formData?.personalInfo?.lastName?.toUpperCase() ||
                  "LastName"}
              </h1>
              {/* Title */}
              <h2 className="text-center text-xl font-bold">
                {resumeData?.personalInfo?.jobTitle?.toUpperCase() ||
                  formData?.personalInfo?.jobTitle?.toUpperCase() ||
                  "jobTitle"}
              </h2>

              {/* Address */}
              <h2 className="text-center text-lg font-bold my-2">
                <div className="flex justify-center items-center gap-1">
                  <IoLocationOutline size={20} />
                  {resumeData?.personalInfo?.address?.toUpperCase() ||
                    formData?.personalInfo?.address?.toUpperCase() ||
                    "address"}
                </div>
              </h2>

              {/* Contact */}
              <div
                className="my-1 flex justify-between border-b-[3px] py-1 border-b-red-400"
                style={{ borderColor: themeColor }}
              >
                <div className="flex flex-col sm:flex-row justify-start  sm:flex-1">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-xl">☎️</span>
                    <p className="text-lg font-bold">
                      {resumeData?.personalInfo?.phone ||
                        formData?.personalInfo?.phone ||
                        "Phone"}
                    </p>
                  </div>

                  <div className="flex  items-center gap-2 justify-end  sm:flex-1">
                    <span className="text-xl">📧</span>
                    <p className="text-lg font-bold">
                      {resumeData?.personalInfo?.email ||
                        formData?.personalInfo?.email ||
                        "Email"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className=" my-3  w-full whitespace-pre-wrap break-words">
                {resumeData?.summery ||
                  formData?.summery ||
                  "No summary available"}
              </div>

              {/* Experience Section */}
              {professionalData.length > 0 && (
                <>
                  <h1
                    className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400 "
                    style={{ borderColor: themeColor, color: themeColor }}
                  >
                    Work Experience
                  </h1>

                  <div>
                    {professionalData.map((exp, index) => (
                      <div key={exp._id || index} className="mb-4">
                        <div className="flex justify-between gap-5 mt-1">
                          <div className="flex flex-col sm:flex-row">
                            <p
                              className="text-sm md:text-md"
                              style={{ color: themeColor }}
                            >
                              {exp.designation}{" "}
                              <span className="text-black ml-10">
                                {exp.companyName}
                              </span>
                            </p>
                            <p
                              className="text-red-400 justify-start text-sm flex gap-2 items-center md:ml-5"
                              style={{ borderColor: themeColor }}
                            >
                              {exp.city}
                              <span className="text-sm text-center text-black ">
                                {exp.state}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm">
                              {new Date(exp.startDate).toLocaleDateString(
                                "en-GB"
                              )}{" "}
                              -{" "}
                              {exp.endDate
                                ? new Date(exp.endDate).toLocaleDateString(
                                    "en-GB"
                                  )
                                : "Current"}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2">{exp.workSummery}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Repeat experiences... */}

              {/* Project Section */}
              <h1
                className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                PROJECT
              </h1>
              <div className="flex gap-5 flex-col">
                {projectData.map((proj, index) => (
                  <div
                    key={index}
                    style={{ whiteSpace: "pre-line" }}
                    className=" break-words "
                  >
                    <p className="font-serif font-medium underline underline-offset-4  leading-[1.2]">
                      {proj.title.toUpperCase()}
                    </p>
                    <p className="font-medium text-sm">Features</p>
                    <div>
                      <p className="tracking-wide ">{proj.feature}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <h1
                className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                SKILL
              </h1>
              <p className="text-sm font-sans tracking-wide">
                {skill?.length > 0
                  ? skill.map((sk, index) => (
                      <span key={index}>
                        {sk.toUpperCase()}
                        {index !== skill.length - 1 && ", "}
                      </span>
                    ))
                  : "No skills yet"}
              </p>
              {/* Education */}
              <h1
                className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                EDUCATION
              </h1>
              <p style={{ whiteSpace: "pre-line" }} className=" break-words ">
                {education?.length > 0
                  ? education?.map((ed, index) => (
                      <span key={index}>{ed?.toUpperCase()}</span>
                    ))
                  : "No education yet"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullResume;
