import FormContext from "@/context/FormContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LuBrain } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import { Scale } from "lucide-react";

const Summery = ({ id }) => {
  const { formData, updateFormData } = useContext(FormContext);

  const [aiSummery, setAiSummery] = useState(false);

  const [loading, setLoading] = useState(false);

  const [aiInput, setAiInput] = useState("");

  const [userInput, setUserInput] = useState("");

  const [summeyResult, setSummerResult] = useState(null);
  console.log(summeyResult);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInput((prev) => ({ ...prev, [name]: value }));

    setSummerResult(value);

    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAskAi = () => {
    setAiSummery(true);
  };

  const HandleAskSummery = async (prompt) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/ai", {
        prompt: prompt,
      });
      if (res.status === 200) {
        console.log("res of ai summery", res);
        setSummerResult(res.data.summary);
        setAiInput("");
        setAiSummery(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8080/summery/${id}`, {
        summery: summeyResult,
      });

      if (res.status === 200) {
        alert("summery added successfully");
        setAiInput("");
        setSummerResult("");

        updateFormData({
          ...formData,
          summery: summeyResult,
        });
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="max-w-3xl mx-auto my-6">
        <form
          onSubmit={handleSubmit}
          className="border p-6 border-t-[5px] border-t-purple-600 rounded-2xl bg-white shadow-lg"
        >
          <h1 className="text-2xl font-bold">Summery</h1>
          <h3 className="mt-1 font-semibold">Add Summery For Your Job</h3>
          <div className="mt-2 flex justify-between">
            <p className="font-semibold">Add Summery</p>

            <button
              className="px-5 cursor-pointer py-1 border-[2px] border-purple-400 rounded-md hover:border-purple-600 flex gap-2 justify-between items-center"
              type="button"
              onClick={() => handleAskAi(aiInput)}
            >
              <span>
                <LuBrain />
              </span>
              Generate From AI
            </button>
          </div>
          <textarea
            name="summery"
            value={summeyResult}
            onChange={handleChange}
            required
            className="border-[2px]  p-3 w-full max-h-[350px] text-xl  mt-3  rounded-md border-gray-500    overflow-y-auto"
            placeholder="Add Summery for your Resume"
          ></textarea>
          <div className="flex justify-end rounded-md">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300">
              Save
            </button>
          </div>
        </form>

        {/* dailouge box */}
        {aiSummery ? (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center  ">
            <div className="w-[320px] bg-white p-4 rounded-2xl">
              <div
                className="flex justify-end cursor-pointer  "
                onClick={() => setAiSummery(false)}
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
              <input
                disabled={loading}
                type="text"
                value={aiInput}
                required
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="ask summery for job title..."
                className=" pl-2 mt-2 border-[2px] text-black border-gray-400 p-1 w-full rounded hover:border-purple-500"
              />
              <div className="  flex justify-center ">
                <button
                  disabled={!aiInput}
                  type="button"
                  onClick={() => {
                    HandleAskSummery(aiInput);
                  }}
                  className="p-2 w-full cursor-pointer bg-purple-500 mt-2 rounded-md hover:bg-purple-600 hover:text-white"
                >
                  Submit
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
