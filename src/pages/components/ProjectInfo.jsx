import axios from "axios";
import React, { useState } from "react";

const ProjectInfo = ({ id, activeFormIndex, setActiveFormIndex }) => {
  const [projectList, setProjectList] = useState([
    {
      title: "",
      feature: "",
    },
  ]);

  const handleChange = (e, index, field) => {
    const copyProjectList = [...projectList];
    copyProjectList[index][field] = e.target.value;
    setProjectList(copyProjectList);
  };

  const addProject = () => {
    setProjectList([...projectList, { title: "", feature: "" }]);
  };

  const removeProject = () => {
    if (projectList.length > 1) {
      setProjectList(projectList.slice(0, -1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation: check if any project has empty title or feature
    const isEmpty = projectList.some(
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
        projects: projectList.map((proj) => ({
          title: proj.title,
          features: proj.feature,
        })),
      });

      if (res.status === 200) {
        alert("project added successfully");
        setActiveFormIndex(activeFormIndex + 1);
      }
    } catch (error) {}
  };
  return (
    <div className="max-w-3xl mx-auto ">
      <div className="border p-6 border-t-[6px] border-t-purple-600 rounded-2xl bg-white shadow-md">
        <p className="text-3xl font-bold ">Projects</p>
        <h2 className="my-1 text-xl font-bold">Add your Projects</h2>

        {/* project */}
        {projectList.map((project, index) => (
          <div key={index} className="mt-5">
            <h1 className="font-bold">
              {"Project  -> "}
              <span className="mx-2">{index + 1}</span>
            </h1>
            <div className="flex flex-col gap-1 my-2">
              <label className="font-semibold ">Title Of Project</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleChange(e, index, "title")}
                placeholder="Ai Based Resume Builder App"
                className="border p-1 px-2 rounded-md focus:outline-purple-500"
              />
            </div>
            <div className="flex flex-col gap-1 my-2">
              <label className="font-semibold ">Features Are You Build</label>
              <textarea
                type="text"
                value={project.feature}
                onChange={(e) => handleChange(e, index, "feature")}
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

        {/* project */}
      </div>
    </div>
  );
};

export default ProjectInfo;
