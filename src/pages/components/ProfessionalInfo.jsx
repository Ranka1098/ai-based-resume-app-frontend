import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useState } from "react";

const ProfessionalInfo = ({ id, activeFormIndex, setActiveFormIndex }) => {
  const { formData, setFormData, setRefreshResume } = useContext(FormContext);
  const themeColor = formData?.themeColor || "#000";
  const [focused, setFocused] = useState(null);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProfessionalInfo = [...formData.professionalInfo];
    updatedProfessionalInfo[index][name] = value;

    setFormData({
      ...formData,
      professionalInfo: updatedProfessionalInfo,
    });
  };

  const hadndleAddExp = () => {
    setFormData({
      ...formData,
      professionalInfo: [
        ...formData.professionalInfo,
        {
          designation: "",
          companyName: "",
          city: "",
          state: "",
          startDate: "",
          endDate: "",
          workSummery: "",
        },
      ],
    });
  };

  const hadndleRmvExp = () => {
    const updatedInfo = [...formData.professionalInfo];
    if (updatedInfo.length > 1) {
      updatedInfo.pop();

      setFormData({
        ...formData,
        professionalInfo: updatedInfo,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = formData.professionalInfo.some(
      (proj) =>
        proj.designation.trim() === "" ||
        proj.companyName.trim() === "" ||
        proj.city.trim() === "" ||
        proj.state.trim() === "" ||
        proj.startDate.trim() === "" ||
        proj.workSummery.trim() === ""
    );

    if (isEmpty) {
      alert(
        "Please fill in all project titles and features before submitting."
      );
      return;
    }

    // api call

    try {
      const res = await axios.post(
        `https://ai-based-resume-app-backend.onrender.com/professionalDetail/${id}`,
        {
          professionalInfo: formData.professionalInfo,
        }
      );

      if (res.status === 200) {
        setRefreshResume((prev) => !prev);

        alert("professional infromation added successfully");
        setFormData((prev) => ({
          ...prev,
          professionalInfo: [
            {
              designation: "",
              companyName: "",
              city: "",
              state: "",
              startDate: "",
              endDate: "",
              workSummery: "",
            },
          ],
        }));

        setActiveFormIndex(activeFormIndex + 1);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSkip = () => {
    setFormData({
      ...formData,
      isProfessionalInfoSkipped: true,
    });
    setActiveFormIndex(activeFormIndex + 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-2">
      <div
        className="border p-6 border-t-[10px]  rounded-2xl bg-white shadow-md "
        style={{ borderColor: themeColor }}
      >
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Professional Experince
          </h2>

          <button
            type="button"
            onClick={handleSkip}
            className="px-3 md:px-6 md:py-2 text-sm md:text-md text-white rounded-md  transition-all"
            style={{ background: themeColor }}
          >
            Skip
          </button>
        </div>
        <p className="text-gray-600 mb-5">Add your previous job experience</p>

        {formData.professionalInfo.map((item, index) => (
          <div key={index}>
            <p>
              {"Experince "} {index + 1}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Designation</label>
                <input
                  type="text"
                  name="designation"
                  required
                  value={item.designation}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="e.g., Software Engineer"
                  onFocus={() => setFocused("designation")}
                  onBlur={() => setFocused(null)}
                  className={`p-2 border rounded-md focus:outline-none ${
                    focused === "designation" ? "ring-2" : ""
                  }`}
                  style={{
                    borderColor:
                      focused === "designation" ? themeColor : "#ccc",
                    boxShadow:
                      focused === "designation"
                        ? `0 0 0 2px ${themeColor}55`
                        : "none",
                  }}
                />
              </div>
              {/* ------------------ */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={item.companyName}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="e.g., Google"
                  onFocus={() => setFocused("companyName")}
                  onBlur={() => setFocused(null)}
                  className={`p-2 border rounded-md focus:outline-none ${
                    focused === "companyName" ? "ring-2" : ""
                  }`}
                  style={{
                    borderColor:
                      focused === "companyName" ? themeColor : "#ccc",
                    boxShadow:
                      focused === "companyName"
                        ? `0 0 0 2px ${themeColor}55`
                        : "none",
                  }}
                />
              </div>
              {/* --------------------------------- */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={item.city}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="e.g., Mumbai"
                  onFocus={() => setFocused("city")}
                  onBlur={() => setFocused(null)}
                  className={`p-2 border rounded-md focus:outline-none ${
                    focused === "city" ? "ring-2" : ""
                  }`}
                  style={{
                    borderColor: focused === "city" ? themeColor : "#ccc",
                    boxShadow:
                      focused === "city" ? `0 0 0 2px ${themeColor}55` : "none",
                  }}
                />
              </div>
              {/* --------------------------------- */}

              <div className="flex flex-col gap-1">
                <label className="font-semibold">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={item.state}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="e.g., Maharashtra"
                  onFocus={() => setFocused("state")}
                  onBlur={() => setFocused(null)}
                  className={`p-2 border rounded-md focus:outline-none ${
                    focused === "state" ? "ring-2" : ""
                  }`}
                  style={{
                    borderColor: focused === "state" ? themeColor : "#ccc",
                    boxShadow:
                      focused === "state"
                        ? `0 0 0 2px ${themeColor}55`
                        : "none",
                  }}
                />
              </div>
              {/* --------------------------------- */}

              <div className="flex flex-col gap-1">
                <label className="font-semibold">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={item.startDate}
                  onChange={(e) => handleChange(e, index)}
                  onFocus={() => setFocused("startDate")}
                  onBlur={() => setFocused(null)}
                  className={`p-2 border rounded-md focus:outline-none ${
                    focused === "startDate" ? "ring-2" : ""
                  }`}
                  style={{
                    borderColor: focused === "startDate" ? themeColor : "#ccc",
                    boxShadow:
                      focused === "startDate"
                        ? `0 0 0 2px ${themeColor}55`
                        : "none",
                  }}
                />
              </div>
              {/* --------------------------------- */}

              <div className="flex flex-col gap-1">
                <label className="font-semibold">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handleChange(e, index)}
                  onFocus={() => setFocused("endDate")}
                  onBlur={() => setFocused(null)}
                  className={`p-2 border rounded-md focus:outline-none ${
                    focused === "endDate" ? "ring-2" : ""
                  }`}
                  style={{
                    borderColor: focused === "endDate" ? themeColor : "#ccc",
                    boxShadow:
                      focused === "endDate"
                        ? `0 0 0 2px ${themeColor}55`
                        : "none",
                  }}
                />
              </div>
              {/* --------------------------------- */}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Work Summary</label>
              <textarea
                required
                value={item.workSummery}
                name="workSummery"
                onChange={(e) => handleChange(e, index)}
                onFocus={() => setFocused("workSummery")}
                onBlur={() => setFocused(null)}
                className={`p-2 border rounded-md focus:outline-none ${
                  focused === "workSummery" ? "ring-2" : ""
                }`}
                style={{
                  borderColor: focused === "workSummery" ? themeColor : "#ccc",
                  boxShadow:
                    focused === "workSummery"
                      ? `0 0 0 2px ${themeColor}55`
                      : "none",
                }}
              />
            </div>
            <hr className="my-5 h-[1rem]" />
          </div>
        ))}

        <div className="my-3">
          <div className="flex justify-between items-center ">
            <button
              type="button"
              onClick={hadndleAddExp}
              className="px-4 py-2 border-2 border-green-500 text-green-700 rounded-md hover:bg-green-500 hover:text-white transition-all"
            >
              + Add More Exp.
            </button>
            <button
              type="button"
              onClick={hadndleRmvExp}
              className="px-4 py-2 border-2 border-red-500 text-red-700 rounded-md hover:bg-red-500 hover:text-white transition-all"
            >
              - Remove Exp.
            </button>
          </div>
        </div>
        <div className="flex justify-center ">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 w-full py-2  text-white rounded-md  transition-all"
            style={{ background: themeColor }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo;
