import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useState } from "react";

const Skill = ({ id, activeFormIndex, setActiveFormIndex }) => {
  const { setFormData } = useContext(FormContext);
  const [inputSkill, setInputSkill] = useState("");
  console.log(inputSkill);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputSkill(value);
  };

  const handleAddSkill = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/skill/${id}`, {
        skillInput: inputSkill,
      });

      if (res.status === 200) {
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
