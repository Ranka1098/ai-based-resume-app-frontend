import React from "react";
import { useParams } from "react-router-dom";
import FormSection from "./components/FormSection";
import ResumePreviewSection from "./components/ResumePreviewSection";

const ResumeDetail = () => {
  const { id } = useParams();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-16 py-5 gap-10">
      <FormSection id={id} />

      <ResumePreviewSection id={id} />
    </div>
  );
};

export default ResumeDetail;
