import { createContext, useState } from "react";

// create context
const FormContext = createContext();

// create provider
export const FormProvider = ({ children }) => {
  // initial values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
  });

  const updateFormData = (data) => {
    setFormData(data);
  };

  return (
    // wrap value inside provider
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
