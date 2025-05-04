import React from "react";
import { useParams } from "react-router-dom";

const ResumeDetail = () => {
  const { id } = useParams();
  console.log("id of resume", id);
  return <div>ResumeDetail</div>;
};

export default ResumeDetail;
