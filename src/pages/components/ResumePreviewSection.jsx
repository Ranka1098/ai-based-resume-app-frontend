import React from "react";

const ResumePreviewSection = () => {
  return (
    <>
      {/* personal info secton */}
      <div className="border-t-[1rem] border-t-red-400">
        <div>
          {/* name */}
          <h1 className="pt-5 text-center text-2xl font-bold">
            Ashokkumar Vaishnav
          </h1>
          {/* title */}
          <h2 className="text-center text-xl font-bold">Frontend Developer</h2>
          {/* Address */}
          <h2 className="text-center text-lg font-bold">Hadapsar,Pune</h2>

          {/* phone number or email */}
          <div className="my-1 flex justify-between border-b-[3px] py-1 border-b-red-400">
            {/* phone */}
            <p className="text-center text-lg font-bold">9156776848</p>
            {/* email */}
            <p className="text-center text-lg font-bold">
              ashokranka30@gmail.com
            </p>
          </div>
          {/* personal info secton */}
          {/* ---------------------------------------------------------------------- */}

          {/* summary section  */}
          <div className="font-medium">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
            nulla ut consequatur ea dicta doloremque corporis ipsum, eos alias
            odit optio minus placeat temporibus doloribus earum porro amet
            adipisci id consequuntur eum explicabo reprehenderit sunt velit rem?
          </div>
          {/* summary section  */}
          {/* ---------------------------------------------------------------------- */}
          {/* ---------------------------------------------------------------------- */}
          {/* professional experince ya project */}

          <h1 className="text-center font-bold  text-red-400 mb-1 border-b-[2px] border-b-red-400">
            Professional Information
          </h1>
          <div>
            {/* designation joining date */}
            <div className="flex justify-between mt-1">
              <p className=" text-red-400 font-semibold flex flex-col">
                Full Stack Developer
                <span className="font-semibold text-xs text-black">
                  Amazon,New York
                </span>
              </p>
              <p className="font-semibold">Jan 2021 Present</p>
            </div>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut odio
              explicabo incidunt enim reiciendis sapiente ab eius fuga ratione
              distinctio quis voluptates sequi, accusantium eligendi.
            </p>
          </div>
          <div>
            {/* designation joining date */}
            <div className="flex justify-between mt-1">
              <p className=" text-red-400 font-semibold flex flex-col">
                Mern Stack Developer
                <span className="font-semibold text-xs text-black">
                  Google,Chorlotte,NC
                </span>
              </p>
              <p className="font-semibold">Jan 2021 Present</p>
            </div>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut odio
              explicabo incidunt enim reiciendis sapiente ab eius fuga ratione
              distinctio quis voluptates sequi, accusantium eligendi.
            </p>
          </div>
          {/* professional experince ya project */}
          {/* ---------------------------------------------------------------------- */}
          {/* ---------------------------------------------------------------------- */}
          {/* education */}
          <h1 className="text-center font-bold  text-red-400 mb-1 border-b-[2px] border-b-red-400">
            PROJECT
          </h1>
          <div>
            {/* designation joining date */}
            <div className="flex justify-between mt-1">
              <p className=" text-red-400 font-semibold flex flex-col">
                Resume_Builder
              </p>
            </div>
            <ul>
              <li className="">
                Authentication - OTP Based Via Authentication System
              </li>
            </ul>
            {/* ---------------------------------------------------------------- */}
            <div className="flex justify-between mt-1">
              <p className=" text-red-400 font-semibold flex flex-col">
                Real Time video caling and Chat
              </p>
            </div>
            <ul>
              <li className="">
                Authentication - OTP Based Via Authentication System
              </li>
              <li>notification - realtime notifcation System</li>
            </ul>
            {/* ---------------------------------------------------------------- */}
            <div className="flex justify-between mt-1">
              <p className=" text-red-400 font-semibold flex flex-col">
                Doctor Appoinent ment System
              </p>
            </div>
            <ul>
              <li className="">
                Authentication - OTP Based Via Authentication System
              </li>
              <li>
                notification - realtime notifcation System calling -real time
              </li>
              <li>calling to paitent appointment booking system</li>
            </ul>
          </div>
          {/* education */}
          {/* ---------------------------------------------------------------------- */}
        </div>
        {/* -------------------Skill--------------------------- */}
        <h1 className="text-center font-bold  text-red-400 mb-1 border-b-[2px] border-b-red-400">
          SKILL
        </h1>
        <ul className="flex gap-5 flex-wrap   ">
          <li className="font-semibold text-md">HTML</li>
          <li className="font-semibold text-md">CSS</li>
          <li className="font-semibold text-md">JAVASCRIPT</li>
          <li className="font-semibold text-md">REACT</li>
          <li className="font-semibold text-md">NODE JS</li>
          <li className="font-semibold text-md">GITHUB</li>
        </ul>
        {/* -------------------Skill--------------------------- */}
        <h1 className="text-center font-bold  text-red-400 mb-1 border-b-[2px] border-b-red-400">
          EDUCATION
        </h1>
        <p>
          BSC computer Science from Annasaheb magar colleage pune University
        </p>
      </div>
    </>
  );
};

export default ResumePreviewSection;
