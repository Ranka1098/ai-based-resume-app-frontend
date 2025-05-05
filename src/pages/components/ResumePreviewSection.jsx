import React from "react";

const ResumePreviewSection = () => {
  return (
    <div className="">
      {/* Inner scrollable box */}
      <div className="overflow-y-scroll max-h-[85vh] bg-white p-5 rounded-md shadow-md">
        {/* personal info section */}
        <div className="border-t-[1rem] border-t-red-400">
          {/* Name */}
          <h1 className="pt-5 text-center text-2xl font-bold">
            Ashokkumar Vaishnav
          </h1>

          {/* Title */}
          <h2 className="text-center text-xl font-bold">Frontend Developer</h2>

          {/* Address */}
          <h2 className="text-center text-lg font-bold">Hadapsar, Pune</h2>

          {/* Contact */}
          <div className="my-1 flex justify-between border-b-[3px] py-1 border-b-red-400">
            <p className="text-lg font-bold">9156776848</p>
            <p className="text-lg font-bold">ashokranka30@gmail.com</p>
          </div>

          {/* Summary */}
          <div className="font-medium my-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
            nulla ut consequatur ea dicta doloremque corporis ipsum...
          </div>

          {/* Experience Section */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            Professional Information
          </h1>

          {/* Example Experience */}
          <div>
            <div className="flex justify-between mt-1">
              <p className="text-red-400 font-semibold flex flex-col">
                Full Stack Developer
                <span className="text-xs text-black">Amazon, New York</span>
              </p>
              <p className="font-semibold">Jan 2021 - Present</p>
            </div>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>

          {/* Repeat experiences... */}

          {/* Project Section */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            PROJECT
          </h1>
          <div>
            <div className="mt-1">
              <p className="text-red-400 font-semibold">Resume_Builder</p>
              <ul>
                <li>Authentication - OTP Based Via Authentication System</li>
              </ul>
            </div>
            <div className="mt-1">
              <p className="text-red-400 font-semibold">
                Real Time Video Calling & Chat
              </p>
              <ul>
                <li>OTP Authentication System</li>
                <li>Real-time Notification System</li>
              </ul>
            </div>
            <div className="mt-1">
              <p className="text-red-400 font-semibold">
                Doctor Appointment System
              </p>
              <ul>
                <li>OTP Authentication</li>
                <li>Real-time Calling and Notifications</li>
                <li>Patient Appointment Booking</li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            SKILL
          </h1>
          <ul className="flex gap-5 flex-wrap">
            <li className="font-semibold">HTML</li>
            <li className="font-semibold">CSS</li>
            <li className="font-semibold">JavaScript</li>
            <li className="font-semibold">React</li>
            <li className="font-semibold">Node.js</li>
            <li className="font-semibold">GitHub</li>
          </ul>

          {/* Education */}
          <h1 className="text-center font-bold text-red-400 mb-1 border-b-[2px] border-b-red-400">
            EDUCATION
          </h1>
          <p>
            BSC Computer Science from Annasaheb Magar College, Pune University
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewSection;
