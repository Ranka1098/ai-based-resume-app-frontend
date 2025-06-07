import FormContext from "@/context/FormContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Education = ({ id }) => {
  const { formData, setFormData, setRefreshResume } = useContext(FormContext);
  const [inputEducation, setInputEducation] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputEducation(value);

    const educationArray = value
      .split(",")
      .map((education) => education.trim()); // convert comma-separated string to array
    setFormData({
      ...formData,
      education: educationArray,
    });
  };

  const handleAddEducation = async () => {
    if (inputEducation.trim() === "") {
      alert("Please add your education");
      return;
    }
    try {
      const res = await axios.post(
        `https://ai-based-resume-app-backend.onrender.com/education/${id}`,
        {
          educationInput: formData.education,
        }
      );

      if (res.status === 200) {
        setRefreshResume((prev) => !prev);
        alert("Education added successfully");
        setInputEducation("");
        setFormData((prev) => ({
          ...prev,
          education: res.data.education,
        }));

        navigate(`/fullresume/${id}`);
      }
    } catch (err) {
      console.error(err);
    }
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
            value={inputEducation}
            onChange={handleChange}
          ></textarea>
          <div
            onClick={handleAddEducation}
            className=" text-center cursor-pointer bg-purple-500 text-white mt-5 border p-2 rounded-md"
          >
            <button type="button">Add Your Education</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
