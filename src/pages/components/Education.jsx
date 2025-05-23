import JoditEditor from "jodit-react";
import React from "react";

const Education = () => {
  return (
    <div className="max-w-3xl mx-auto ">
      <div className="border p-6 border-t-[6px] border-t-purple-600 rounded-2xl bg-white shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Education</h2>
        <p className="my-1 ">Add You Education</p>

        <form action="">
          <div>
            <label htmlFor="" className="font-bold text-lg">
              Enter Your Education
            </label>
            <JoditEditor />
            <div className=" text-center bg-purple-500 text-white mt-5 border p-2 rounded-md">
              <button className="" type="button">
                Add Your Skill
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Education;
