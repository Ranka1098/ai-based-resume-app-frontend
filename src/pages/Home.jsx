import { useEffect, useState } from "react";
import AddButton from "./AddButton";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [resumeList, setAllResumeList] = useState([]);

  const getResume = async () => {
    try {
      const res = await axios.get("http://localhost:8080/allresume");
      if (res.data && res.data.data) {
        setAllResumeList(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch resumes:", error.message);
    }
  };

  useEffect(() => {
    getResume();
  }, []);

  return (
    <div className="px-14 py-3">
      <h1 className="text-2xl font-bold text-gray-800">My Resume</h1>
      <p className="text-xl font-medium mt-1 text-gray-600">
        Start Creating AI Resume to Your Next Job
      </p>
      <div className="flex  gap-5">
        <div>
          <AddButton onResumeAdded={getResume} />
        </div>
        <div className="flex gap-4 flex-wrap">
          {resumeList.map((val) => (
            <div key={val._id}>
              <Link to={`/resume/${val._id}`}>
                <div className="w-36 h-36 bg-gray-200 flex justify-center text-wrap items-center cursor-pointer mt-5 border-2 border-dotted border-gray-400 rounded-md">
                  <p className="text-center">{val.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
