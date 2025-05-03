import React, { useState } from "react";
import { FaPlusSquare } from "react-icons/fa";

const AddButton = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div>
      {/* Plus Button */}
      <div
        onClick={() => setShowDialog(true)}
        className="w-36 h-36 bg-gray-200 flex justify-center items-center cursor-pointer mt-5 border-2 border-dotted border-gray-400 rounded-md"
      >
        <FaPlusSquare size={40} />
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-1">Create new Resume</h2>
            <p className="text-sm mb-3">Add your new resume Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex.Full Stack Developer.."
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDialog(false);
                }}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButton;
