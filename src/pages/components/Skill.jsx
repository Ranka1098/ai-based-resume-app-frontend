import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useState } from "react";

const Skill = ({ id, activeFormIndex, setActiveFormIndex }) => {
  const { formData, setFormData, setRefreshResume } = useContext(FormContext);
  const [inputSkill, setInputSkill] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputSkill(value); // show user-typed value in textarea
    const skillsArray = value.split(",").map((skill) => skill.trim()); // convert comma-separated string to array
    setFormData({
      ...formData,
      skill: skillsArray,
    });
  };

  const handleAddSkill = async () => {
    if (inputSkill.trim() === "") {
      alert("Please add your education");
      return;
    }
    try {
      const res = await axios.post(`http://localhost:8080/skill/${id}`, {
        skillInput: formData.skill,
      });

      if (res.status === 200) {
        setRefreshResume((prev) => !prev);
        alert("Skill added successfully");
        setInputSkill("");
        setActiveFormIndex(activeFormIndex + 1);
      }
    } catch (err) {
      console.error(err);
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
            value={inputSkill}
            onChange={handleChange}
            className="border-2 p-3 rounded-md  "
            placeholder="Skill => HTML,CSS,JS.."
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
