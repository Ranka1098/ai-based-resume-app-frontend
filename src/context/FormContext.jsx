import { createContext, useEffect, useState } from "react";

// create context
const FormContext = createContext();

// create provider
export const FormProvider = ({ children }) => {
  // initial values
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      address: "",
      phone: "",
      email: "",
    },
    summery: "",
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
    projects: [
      {
        title: "",
        feature: "",
      },
    ],
    skill: [],
    education: [],
  });

  return (
    // wrap value inside provider
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
