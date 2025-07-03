import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useState } from "react";

const Skill = ({ id, activeFormIndex, setActiveFormIndex }) => {
  const { formData, setFormData, setRefreshResume } = useContext(FormContext);
  const [inputSkill, setInputSkill] = useState("");
  const themeColor = formData?.themeColor || "#000";

  const [focused, setFocused] = useState(null);

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
      const res = await axios.post(
        `https://ai-based-resume-app-backend.onrender.com/skill/${id}`,
        {
          skillInput: formData.skill,
        }
      );

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
    <div className="max-w-3xl mx-auto p-2">
      <div
        className="border p-6 border-t-[10px] rounded-2xl bg-white shadow-md"
        style={{ borderColor: themeColor }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Skill</h2>
        <p className="my-1 font-bold">Add You Skill</p>

        <div className="flex flex-col gap-3 ">
          <label htmlFor="" className="font-bold text-lg">
            Enter Your Skill
          </label>
          <textarea
            name="inputSkill"
            value={inputSkill}
            onChange={handleChange}
            placeholder="Skill => HTML,CSS,JS.."
            onFocus={() => setFocused("inputSkill")}
            onBlur={() => setFocused(null)}
            className={`p-2 border rounded-md focus:outline-none ${
              focused === "inputSkill" ? "ring-2" : ""
            }`}
            style={{
              borderColor: focused === "inputSkill" ? themeColor : "#ccc",
              boxShadow:
                focused === "inputSkill" ? `0 0 0 2px ${themeColor}55` : "none",
            }}
          />
          <div
            onClick={handleAddSkill}
            className=" text-center cursor-pointer bg-purple-500 text-white mt-5 border p-2 rounded-md"
            style={{ background: themeColor }}
          >
            <button type="button" className="cursor-pointer">
              Add Your Skill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill;
