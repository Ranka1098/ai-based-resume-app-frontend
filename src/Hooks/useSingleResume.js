import axios from "axios";
import { useEffect, useState } from "react";

const useSingleResume = ({ id }) => {
  const [resumeData, setResumeData] = useState(null);
  useEffect(() => {
    const fetchResumeDetails = async () => {
      try {
        const response = await axios.post(
          `https://ai-based-resume-app-backend.onrender.com/singleResumeDetail/${id}`
        );
        console.log("Response Resume Details", response);
        if (response?.data) {
          setResumeData(response?.data);
        }
      } catch (error) {
        console.log("Error while Fetching Data", error);
      }
    };
    fetchResumeDetails();
  }, []);

  return { resumeData };
};

export default useSingleResume;
