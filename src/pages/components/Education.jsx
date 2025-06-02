import FormContext from "@/context/FormContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Education = ({ id }) => {
  const { setFormData } = useContext(FormContext);
  const [inputEducation, setInputEducation] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputEducation(value);
  };

  const handleAddEducation = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/education/${id}`, {
        educationInput: inputEducation,
      });

      if (res.status === 200) {
        alert("Education added successfully");
        setInputEducation("");
        setFormData((prev) => ({
          ...prev,
          education: res.data.education,
        }));
        navigate(`/fullresume/${id}`, { state: { resumeId: id } });
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
