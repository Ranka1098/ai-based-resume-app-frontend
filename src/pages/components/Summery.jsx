import axios from "axios";
import React, { useContext, useState } from "react";
import { LuBrain } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import FormContext from "@/context/FormContext";

const Summery = ({ id, activeFormIndex, setActiveFormIndex }) => {
  const { formData, setFormData, setRefreshResume } = useContext(FormContext);
  const [aiDailougeBox, setAiDilougeBox] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [loading, setLoading] = useState(false);
  const themeColor = formData?.themeColor || "#000";
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, summery: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `https://ai-based-resume-app-backend.onrender.com/summery/${id}`,
        {
          summery: formData.summery,
        }
      );

      if (res.status === 200) {
        setRefreshResume((prev) => !prev);
        alert("summary added successfully");
        setFormData((prev) => ({
          ...prev,
          summery: "", // textarea empty
        }));
        setActiveFormIndex(activeFormIndex + 1);
      }
    } catch (err) {
      console.error("Error saving summary:", err);
      alert("Failed to save summary");
    }
  };

  const handleAiSubmit = async () => {
    if (!aiInput.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://ai-based-resume-app-backend.onrender.com/ai",
        {
          prompt: aiInput,
        }
      );

      const summaryText = response.data.summary;
      setFormData((prev) => ({
        ...prev,
        summery: summaryText,
      }));

      setAiDilougeBox(false);
    } catch (err) {
      console.error("AI Error: ", err);
      alert("Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto my-6 p-2">
        <form
          onSubmit={handleSubmit}
          className="border p-6 border-t-[10px]  rounded-2xl bg-white shadow-lg"
          style={{ borderColor: themeColor }}
        >
          <h1 className="text-xl md:text-2xl font-bold">Summery</h1>
          <h3 className="mt-1 font-semibold">Add Summery For Your Job</h3>
          <div className="mt-2 flex justify-between">
            <p className=" text-md font-semibold">Add Summery</p>

            <button
              onClick={() => setAiDilougeBox(true)}
              className="px-5 cursor-pointer py-1 border-[2px] rounded-md  flex gap-2 justify-between items-center text-sm"
              style={{ borderColor: themeColor }}
              type="button"
            >
              <span>
                <LuBrain />
              </span>
              Generate From AI
            </button>
          </div>
          <textarea
            name="summery"
            required
            rows={15}
            value={formData.summery || ""}
            onChange={handleChange}
            placeholder="Add Summery for your Resume"
            onFocus={() => setFocused("summery")}
            onBlur={() => setFocused(null)}
            className={`p-2 w-full mt-2 border rounded-md focus:outline-none ${
              focused === "summery" ? "ring-2" : ""
            }`}
            style={{
              borderColor: focused === "summery" ? themeColor : "#ccc",
              boxShadow:
                focused === "summery" ? `0 0 0 2px ${themeColor}55` : "none",
            }}
          ></textarea>
          <div className="flex justify-end rounded-md">
            <button
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300"
              style={{ background: themeColor }}
            >
              Save
            </button>
          </div>
        </form>

        {/* dailouge box */}
        {aiDailougeBox ? (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-2  ">
            <div className="w-[520px]  bg-white p-4 rounded-2xl">
              <div
                onClick={() => setAiDilougeBox(!aiDailougeBox)}
                className="flex justify-end cursor-pointer  "
              >
                <ImCross
                  size={20}
                  style={{
                    padding: "2px",
                    border: "2px gray solid",
                  }}
                />
              </div>
              <label
                htmlFor=""
                className="p-1 text-xl font-bold flex justify-center"
              >
                Ask Summery
              </label>
              <div className="my-1 font-serif">
                {" "}
                Note - Ask to AI give summery for 2 to 3 Lines for specific
                JobTitle.
                <p className="my-1 ">
                  Ex.Give summery 2 to 3 line mern stack developer seeking an
                  entry level job position to leverage skills and contribute to
                  a dynamic team. Eager to learn and grow professionally.
                </p>
              </div>
              <input
                type="text"
                name="aiInput"
                required
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="ask summery for job title..."
                onFocus={() => setFocused("aiInput")}
                onBlur={() => setFocused(null)}
                className={`p-2 w-full mt-2 border rounded-md focus:outline-none ${
                  focused === "aiInput" ? "ring-2" : ""
                }`}
                style={{
                  borderColor: focused === "aiInput" ? themeColor : "#ccc",
                  boxShadow:
                    focused === "aiInput"
                      ? `0 0 0 2px ${themeColor}55`
                      : "none",
                }}
              />
              <div className="  flex justify-center ">
                <button
                  type="button"
                  onClick={handleAiSubmit}
                  className="p-2 w-full cursor-pointer  mt-2 rounded-md  hover:text-white"
                  style={{ background: themeColor }}
                >
                  {loading ? "Generating..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Summery;
