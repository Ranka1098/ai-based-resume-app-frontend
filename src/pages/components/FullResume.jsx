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
  }, [id, refreshResume]);

  const projectData = resumeData?.projects?.length
    ? resumeData.projects
    : formData?.projects || [];

  const professionalData = resumeData?.professionalInfo?.length
    ? resumeData.professionalInfo
    : formData?.professionalInfo || [];

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
            <div className="absolute top-55 md:top-35 left-38 md:left-[40%] md:p-2 rounded-md bg-gray-400">
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
          <div
            className="border-t-[5px] border-t-red-500 mb-2"
            style={{ borderColor: themeColor }}
          >
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
            <div
              className="flex justify-between items-center border-b-4 border-b-red-400  py-1 px-2"
              style={{ borderColor: themeColor }}
            >
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
          {!resumeData?.isProfessionalInfoSkipped &&
            Array.isArray(resumeData?.professionalInfo) &&
            resumeData?.professionalInfo.length > 0 && (
              <>
                <h1
                  className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400"
                  style={{ borderColor: themeColor }}
                >
                  Work Experince
                </h1>

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
                            <p className="text-red-400 justify-center  text-sm flex gap-2 items-center">
                              {exp.city}
                              <span className="text-sm text-center text-black">
                                {exp.state}
                              </span>
                            </p>
                          </div>
                          <div className="flex gap-5">
                            <p className="font-semibold">
                              {new Date(exp.startDate).toLocaleDateString(
                                "en-GB"
                              )}{" "}
                              -{" "}
                              {exp.endDate
                                ? new Date(exp.endDate).toLocaleDateString(
                                    "en-GB"
                                  )
                                : "Present"}
                            </p>
                          </div>
                        </div>
                        <div
                          style={{ whiteSpace: "pre-line" }}
                          className=" break-words "
                        >
                          <p className="mt-2">{exp.workSummery}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}

          {/* Projects */}
          <section className="mb-8">
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
                  className="font-serif  break-words "
                >
                  <p className="font-serif font-semibold">
                    {proj.title.toUpperCase()}
                  </p>
                  <p className="font-semibold text-sm">Features</p>
                  <div
                    style={{ whiteSpace: "pre-line" }}
                    className=" break-words "
                  >
                    <p className="text-md">{proj.feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h3
              className="text-xl font-semibold text-center text-red-500 mb-2 border-b-2 pb-1 border-red-400"
              style={{ borderColor: themeColor, color: themeColor }}
            >
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
            <h3
              className="text-xl font-semibold text-center text-red-500 mb-2 border-b-2 pb-1 border-red-400"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Education
            </h3>
            <ul className="list-disc pl-6 text-gray-800 font-medium space-y-1">
              {resumeData?.education?.length > 0
                ? resumeData.education.map((edu, i) => <li key={i}>{edu}</li>)
                : "No education added."}
            </ul>
          </section>
          {/* ATS Resume Analysis */}
          {/* ATS Resume Analysis */}
          {/* {atsResumeData && (
            <section className="mb-8 mt-4 border-t pt-4 border-gray-300">
              <h3 className="text-xl font-bold text-red-500 mb-2 border-b-2 pb-1 border-red-400">
                🧠 AI Resume Feedback
              </h3>
              <div className="text-gray-800 space-y-4 text-sm leading-relaxed font-medium">
                <p>
                  <strong>👤 Name:</strong> ASHOKKUMAR VAISHNAV
                </p>
                <p>
                  <strong>📧 Email:</strong> ashokranka30@gmail.com
                </p>
                <p>
                  <strong>📍 Location:</strong> Manjri, Pune
                </p>

                <div className="bg-gray-100 p-3 rounded-lg border border-gray-300 space-y-2">
                  <p>
                    ✅ <strong>Summary:</strong> Highly motivated MERN Stack
                    Developer with foundational experience in building web
                    applications and APIs using MongoDB, Express.js, React.js,
                    and Node.js.
                  </p>
                  <p>
                    🎯 <strong>Objective:</strong> Seeking an entry-level
                    position to leverage skills and contribute to a dynamic
                    team. Eager to learn and grow professionally.
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg border border-blue-300 space-y-2">
                  <p className="font-semibold text-blue-600">
                    💡 AI Suggestions for Improvement:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      ✅ <strong>Quantify accomplishments:</strong> Add metrics
                      like “Improved page speed by 20%”.
                    </li>
                    <li>
                      ✅ <strong>Clarify responsibilities:</strong> Give details
                      like “Developed REST APIs for user auth”.
                    </li>
                    <li>
                      ✅ <strong>Use action verbs:</strong> Begin with words
                      like “Built”, “Managed”, “Integrated”.
                    </li>
                    <li>
                      ✅ <strong>Fix grammar/spelling:</strong> Watch for typos
                      like “Engginer”, “woked”.
                    </li>
                    <li>
                      ✅ <strong>Add more content:</strong> Add more projects,
                      internships, or open source work.
                    </li>
                    <li>
                      ✅ <strong>Customize for each job:</strong> Use keywords
                      from the specific job you're applying to.
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border border-green-300 space-y-2">
                  <p className="text-green-700 font-semibold">
                    📈 Final Verdict:
                  </p>
                  <p>
                    This resume has been significantly improved for ATS
                    readability and keyword optimization. With a few refinements
                    and personalization for job roles, it's ready to land
                    interviews.
                  </p>
                </div>
              </div>
            </section>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default FullResume;
