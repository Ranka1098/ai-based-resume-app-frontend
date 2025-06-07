import { createContext, useState } from "react";

// create context
const FormContext = createContext();

// create provider
export const FormProvider = ({ children }) => {
  const [refreshResume, setRefreshResume] = useState(false);
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
    isProfessionalInfoSkipped: false,
    themeColor: "#FF3380",
  });

  return (
    // wrap value inside provider
    <FormContext.Provider
      value={{ formData, setFormData, refreshResume, setRefreshResume }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
