import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
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
  const { formData } = useContext(FormContext);
  const location = useLocation();
  const id = location.state?.resumeId;
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareUrl = window.location.href;
  const title = "this is my resume see it.";

  const navigate = useNavigate();

  const singleResume = async () => {
    const res = await axios.post(
      `http://localhost:8080/singleResumeDetail/${id}`
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
  }, [id]);

  return (
    <div className="flex items-center justify-center  p-5 relative">
      <div className="absolute top-6 left-6 flex gap-3 print:hidden">
        <button
          onClick={() => navigate("/")}
          className="bg-white border border-gray-300 px-4  rounded-md hover:bg-gray-200 transition-all font-medium shadow-sm"
        >
          ⬅️ Back
        </button>
      </div>

      <div>
        <div className="w-full max-w-[750px] print:hidden">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
            🎉 Congratulations! Your AI-Generated Resume is Ready!
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center">
            You can now download your resume or share a unique link with your
            friends and family.
          </p>
        </div>
        <div className="flex justify-between my-2 print:hidden">
          <button
            onClick={handleDownload}
            className="bg-white border border-gray-300 px-4  rounded-md hover:bg-gray-200 transition-all font-medium shadow-sm"
          >
            ⬇️ Download
          </button>

          <button
            onClick={handleShare}
            className="bg-white border flex items-center gap-2 border-gray-300 px-4  rounded-md hover:bg-gray-200 transition-all font-medium shadow-sm"
          >
            <FcShare size={20} />
            Share
          </button>
        </div>

        <div>
          {showShareOptions && (
            <div className="absolute top-35 left-[40%] p-2 rounded-md bg-gray-400">
              <div className="flex gap-4">
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  onClick={() => {
                    setShowShareOptions(false);
                  }}
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>

                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  onClick={() => {
                    setShowShareOptions(false);
                  }}
                >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>

                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  onClick={() => {
                    setShowShareOptions(false);
                  }}
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>

                <LinkedinShareButton
                  url={shareUrl}
                  title={title}
                  onClick={() => {
                    setShowShareOptions(false);
                  }}
                >
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-[750px] print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none my-5 bg-white py-2 px-4 rounded-xl shadow-xl border border-gray-300 ">
          {/* Header */}
          <div className="border-t-[5px] border-t-red-500 mb-2">
            {/* Name */}
            <h1 className="pt-2 text-center text-3xl font-extrabold text-gray-800">
              {resumeData?.personalInfo?.firstName.toUpperCase() || "FirstName"}{" "}
              {resumeData?.personalInfo?.lastName.toUpperCase() || "LastName"}
            </h1>
            {/* Title */}
            <h2 className="text-center text-xl  font-semibold mt-1">
              {resumeData?.personalInfo?.jobTitle.toUpperCase() || "Job Title"}
            </h2>

            {/* Address */}
            <div className="flex justify-center items-center font-semibold  mt-1 gap-2">
              <IoLocationOutline size={20} />
              <span>
                {resumeData?.personalInfo?.address.toUpperCase() ||
                  "Your Address Here"}
              </span>
            </div>

            {/* Contact Info */}
            <div className="flex justify-between items-center border-b-4 border-b-red-400  py-1 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">☎️</span>
                <p className="text-md font-semibold text-gray-700">
                  {resumeData?.personalInfo?.phone || "Phone"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📧</span>
                <p className="text-md font-semibold text-gray-700">
                  {resumeData?.personalInfo?.email || "Email"}
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <section className="mb-2">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {resumeData?.summery || "No summary available"}
            </p>
          </section>

          {/* Work Experience */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-red-500 mb-2 border-b-2 pb-1 border-red-400">
              Work Experience
            </h3>
            {resumeData?.professionalInfo?.length > 0 ? (
              resumeData.professionalInfo.map((exp, index) => (
                <div key={exp._id || index} className="mb-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {exp.designation}
                      </h4>
                      <p className="text-gray-600">{exp.companyName}</p>
                      <p className="text-sm text-gray-500">
                        {exp.city}, {exp.state}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {new Date(exp.startDate).toLocaleDateString("en-GB")} -{" "}
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString("en-GB")
                        : "Current"}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{exp.workSummery}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No experience available.</p>
            )}
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-red-500 mb-2 border-b-2 pb-1 border-red-400">
              Projects
            </h3>
            {resumeData?.projects?.length > 0 ? (
              resumeData.projects.map((proj, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg font-bold text-gray-800">
                    {proj.title}
                  </p>
                  <p className="font-semibold text-gray-700">Features:</p>
                  <p className="text-gray-700">{proj.feature}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No projects listed.</p>
            )}
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-red-500 mb-2 border-b-2 pb-1 border-red-400">
              Skills
            </h3>
            <ul className="list-disc pl-6 text-gray-800 font-medium space-y-1">
              {resumeData?.skill?.length > 0
                ? resumeData.skill.map((sk, i) => <li key={i}>{sk}</li>)
                : "No skills added."}
            </ul>
          </section>

          {/* Education */}
          <section className="mb-2">
            <h3 className="text-xl font-semibold text-red-500 mb-2 border-b-2 pb-1 border-red-400">
              Education
            </h3>
            <ul className="list-disc pl-6 text-gray-800 font-medium space-y-1">
              {resumeData?.education?.length > 0
                ? resumeData.education.map((edu, i) => <li key={i}>{edu}</li>)
                : "No education added."}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FullResume;
