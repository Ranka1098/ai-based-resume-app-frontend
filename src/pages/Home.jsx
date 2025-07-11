import { useEffect, useState } from "react";
import AddButton from "./AddButton";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Home = () => {
  const [resumeList, setAllResumeList] = useState([]);
  const navigate = useNavigate();

  const createResume = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email;

      const res = await axios.get(
        `https://ai-based-resume-app-backend.onrender.com/allresume?userEmail=${email}`
      );
      if (res.data && res.data.data) {
        setAllResumeList(res.data.data.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch resumes:", error.message);
    }
  };

  useEffect(() => {
    createResume();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (!isConfirmed) return;

    try {
      const res = await axios.post(
        `https://ai-based-resume-app-backend.onrender.com/deleteSingleResume/${id}`
      );

      if (res.status === 200) {
        setAllResumeList((prev) => prev.filter((resume) => resume._id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert("Failed to delete resume");
    }
  };

  return (
    <div className="px-6 py-6 md:px-14 md:py-8">
      <div className="mb-6">
        <h1 className="text-center md:text-left text-3xl font-bold text-gray-800">
          My Resume
        </h1>
        <p className="text-md md:text-lg mt-2 text-gray-600 ">
          Start creating AI-powered resumes for your next job
        </p>
      </div>
      {/* ------------------------ */}
      <div className="md:flex  gap-6 ">
        <div className="mt-[-19px]  ">
          <AddButton onResumeAdded={createResume} />
        </div>

        <div className="flex flex-wrap gap-6">
          {resumeList.map((val) => (
            <div
              key={val._id}
              className="relative group w-30 h-30 md:w-36 md:h-36 bg-gray-200  border border-gray-300 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
            >
              <Link to={`/resume/${val._id}`} className="block h-full">
                <div className="w-full h-full flex items-center justify-center px-2 text-center text-sm font-medium text-gray-700">
                  {val.title}
                </div>
              </Link>

              <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-600 hover:text-black focus:outline-none">
                    <HiDotsVertical className="text-lg" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md">
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(`/fullresume/${val._id}`, {
                          state: { resumeId: val._id },
                        })
                      }
                    >
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(`/fullresume/${val._id}`, {
                          state: { resumeId: val._id },
                        })
                      }
                    >
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(val._id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ------------------------ */}
    </div>
  );
};

export default Home;
