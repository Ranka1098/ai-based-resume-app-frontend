import axios from "axios";
import React, { useState } from "react";

const Skill = ({ id, activeFormIndex, setActiveFormIndex }) => {
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = async () => {
    if (skillInput.trim() === "") {
      alert("enter skill");
      return;
    }
    const res = await axios.post(`http://localhost:8080/skill/${id}`, {
      skill: skillInput,
    });

    if (res.status === 200) {
      alert("skill added successfully");

      setSkillInput("");
      setActiveFormIndex(activeFormIndex + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto ">
      <div className="border p-6 border-t-[6px] border-t-purple-600 rounded-2xl bg-white shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Skill</h2>
        <p className="my-1 font-bold">Add You Skill</p>

        <div className="flex flex-col gap-3 ">
          <label htmlFor="" className="font-bold text-lg">
            Enter Your Skill
          </label>
          <textarea
            value={skillInput}
            className="border-2 p-3 rounded-md  "
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <div
            onClick={handleAddSkill}
            className=" text-center cursor-pointer bg-purple-500 text-white mt-5 border p-2 rounded-md"
          >
            <button className="" type="button">
              Add Your Skill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill;
