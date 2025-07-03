import FormContext from "@/context/FormContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Education = ({ id }) => {
  const { formData, setFormData, setRefreshResume } = useContext(FormContext);
  const [inputEducation, setInputEducation] = useState("");
  const navigate = useNavigate();
  const themeColor = formData?.themeColor || "#000";

  const [focused, setFocused] = useState(null);

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
    <div className="max-w-3xl mx-auto p-2">
      <div
        className="border p-6 border-t-[10px]  rounded-2xl bg-white shadow-md"
        style={{ borderColor: themeColor }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Education</h2>
        <p className="my-1 ">Add You Education</p>

        <div>
          <label htmlFor="" className="font-bold text-lg">
            Enter Your Education
          </label>
          <textarea
            placeholder="Education:BSC Com.Sci from AM Colleage Pune university"
            value={inputEducation}
            onChange={handleChange}
            onFocus={() => setFocused("firstName")}
            onBlur={() => setFocused(null)}
            className={`focus:outline-none border p-5 w-full my-2 rounded-md ${
              focused === "firstName" ? "ring-2" : ""
            }`}
            style={{
              borderColor: focused === "firstName" ? themeColor : "#ccc",
              boxShadow:
                focused === "firstName" ? `0 0 0 2px ${themeColor}55` : "none",
            }}
          ></textarea>
          <div
            onClick={handleAddEducation}
            className=" text-center cursor-pointer bg-purple-500 text-white mt-5 border p-2 rounded-md"
            style={{ background: themeColor }}
          >
            <button
              type="button"
              style={{ background: themeColor }}
              className="cursor-pointer"
            >
              Add Your Education
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
