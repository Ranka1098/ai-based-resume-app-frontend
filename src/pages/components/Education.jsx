import axios from "axios";
import { useState } from "react";

const Education = ({ id }) => {
  const [education, setEducation] = useState("");

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleSubmit = async () => {
    if (!education.trim()) {
      alert("Please enter your education details");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/education/${id}`, {
        education: education,
      });

      if (res.status === 200) {
        alert("edication Added successfully");
        setEducation("");
      }
    } catch (error) {}
  };
  return (
    <div className="max-w-3xl mx-auto ">
      <div className="border p-6 border-t-[6px] border-t-purple-600 rounded-2xl bg-white shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Education</h2>
        <p className="my-1 ">Add You Education</p>

        <div>
          <label htmlFor="" className="font-bold text-lg">
            Enter Your Education
          </label>
          <textarea
            className="border p-5 w-full my-2 rounded-md focus:outline-purple-600"
            placeholder="Education:BSC Com.Sci from AM Colleage Pune university"
            value={education}
            onChange={handleEducationChange}
          ></textarea>
          <div
            onClick={handleSubmit}
            className=" text-center cursor-pointer bg-purple-500 text-white mt-5 border p-2 rounded-md"
          >
            <button type="button">Add Your Skill</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
