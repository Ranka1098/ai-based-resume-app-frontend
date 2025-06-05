import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useState } from "react";
import { LuBrain } from "react-icons/lu";

const ProjectInfo = ({ id, activeFormIndex, setActiveFormIndex }) => {
  const { formData, setFormData, setRefreshResume } = useContext(FormContext);

  const [aiDailougeBox, setAiDilougeBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiFeature, setAiFeature] = useState("");
  const [aiFeatureOutput, setAiFeatureOutPut] = useState(null);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const copyProjectList = [...formData.projects];
    copyProjectList[index][name] = value;

    setFormData({
      ...formData,
      projects: copyProjectList,
    });
  };

  const addProject = () => {
    const updatedProjects = [...formData.projects, { title: "", feature: "" }];

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const removeProject = () => {
    if (formData.projects.length > 1) {
      const updatedProjects = formData.projects.slice(0, -1);
      setFormData({
        ...formData,
        projects: updatedProjects,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = formData.projects.some(
      (proj) => proj.title.trim() === "" || proj.feature.trim() === ""
    );

    if (isEmpty) {
      alert(
        "Please fill in all project titles and features before submitting."
      );
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/projects/${id}`, {
        projects: formData.projects,
      });

      if (res.status === 200) {
        setRefreshResume((prev) => !prev);
        alert("projects added successfully");
        setFormData((prev) => ({
          ...prev,
          projects: [
            {
              title: "",
              feature: "",
            },
          ],
        }));

        setActiveFormIndex(activeFormIndex + 1);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleFeatureAi = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/ai", {
        prompt: aiFeature,
      });
      setAiFeatureOutPut(res.data.summary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };
  return (
    <div className="max-w-3xl mx-auto ">
      <div className="border p-6 border-t-[6px] border-t-purple-600 rounded-2xl bg-white shadow-md">
        <p className="text-3xl font-bold ">Projects</p>
        <div className="flex justify-between items-center">
          <h2 className="my-1 text-xl font-bold">Add your Projects</h2>
          <button
            onClick={() => setAiDilougeBox(true)}
            className="px-5 cursor-pointer py-1 border-[2px] border-purple-400 rounded-md hover:border-purple-600 flex gap-2 justify-between items-center"
            type="button"
          >
            <span>
              <LuBrain />
            </span>
            Feature Ask To AI
          </button>
        </div>

        {/* project */}
        {formData.projects.map((project, index) => (
          <div key={index} className="mt-5">
            <h1 className="font-bold">
              {"Project  -> "}
              <span className="mx-2">{index + 1}</span>
            </h1>
            <div className="flex flex-col gap-1 my-2">
              <label className="font-semibold ">Title Of Project</label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleChange(e, index)}
                placeholder="Ai Based Resume Builder App"
                className="border p-1 px-2 rounded-md focus:outline-purple-500"
              />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <label className="font-semibold ">Features Are You Build</label>
              <textarea
                type="text"
                name="feature"
                rows={6}
                value={project.feature}
                onChange={(e) => handleChange(e, index)}
                placeholder="Ai Based Resume Builder App"
                className="border p-1 px-2 rounded-md focus:outline-purple-500"
              />
            </div>
            <hr className="my-5" />
            {/* button */}
          </div>
        ))}
        <div className="flex justify-between">
          {/* add project */}
          <div>
            <button
              type="button"
              onClick={addProject}
              className="p-2 border-2 border-green-500 rounded-md text-green-500 hover:bg-green-500 hover:text-white hover:scale-105 cursor-pointer"
            >
              Add More Project
            </button>
          </div>
          {/* add project */}
          {/* rmv project */}
          <div>
            <button
              type="button"
              onClick={removeProject}
              className="p-2 border-2 border-red-500 rounded-md text-red-500 hover:bg-red-500 hover:text-white hover:scale-105 cursor-pointer"
            >
              remove Project
            </button>
          </div>
          {/* rmv project */}
        </div>
        <div className="my-2 ">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full border p-2 rounded-md bg-purple-500 text-white "
          >
            Submit
          </button>
        </div>

        {aiDailougeBox && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-5xl p-6 relative">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-red-500 font-bold text-xl"
                onClick={() => {
                  setAiDilougeBox(false);
                  setAiFeature("");
                  setAiFeatureOutPut("");
                }}
              >
                ×
              </button>

              <h2 className="text-xl font-bold text-purple-600 mb-4">
                AI Feature Assistant
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left: Ask Question */}
                <div className="border border-purple-500 rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Tell To Ai Which Feature Are You Build
                  </h3>
                  <textarea
                    className="w-full border rounded-md p-3 focus:outline-purple-500"
                    placeholder="Ask what features to build in an eCommerce App..."
                    rows={10}
                    value={aiFeature}
                    onChange={(e) => setAiFeature(e.target.value)}
                  ></textarea>
                  <button
                    onClick={handleFeatureAi}
                    className="mt-3 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                  >
                    {loading ? "Generating..." : " Get Answer from AI"}
                  </button>
                </div>

                {/* Right: AI Output */}
                <div className="border border-green-500 rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Copy Answer And Add In Project Feature Section{" "}
                  </h3>
                  <div className="whitespace-pre-wrap text-gray-800 min-h-[150px] ">
                    <textarea
                      className="w-full h-full p-2"
                      name=""
                      id=""
                      rows={20}
                      value={
                        aiFeatureOutput || "AI response will appear here..."
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;
