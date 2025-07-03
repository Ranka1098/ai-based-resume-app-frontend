import FormContext from "@/context/FormContext";
import axios from "axios";
import { useContext, useState } from "react";

const PersonalDetail = ({ id, setActiveFormIndex, activeFormIndex }) => {
  const { formData, setFormData, setRefreshResume } = useContext(FormContext);
  const themeColor = formData?.themeColor || "#000";

  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // api call
    try {
      const res = await axios.put(
        `https://ai-based-resume-app-backend.onrender.com/personDetail/${id}`,
        {
          firstName: formData.personalInfo.firstName,
          lastName: formData.personalInfo.lastName,
          jobTitle: formData.personalInfo.jobTitle,
          address: formData.personalInfo.address,
          phone: formData.personalInfo.phone,
          email: formData.personalInfo.email,
        }
      );

      if (res.status === 200) {
        setRefreshResume((prev) => !prev);

        alert("personal detail added sucessfully");
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            firstName: "",
            lastName: "",
            jobTitle: "",
            address: "",
            phone: "",
            email: "",
          },
        }));

        setActiveFormIndex(activeFormIndex + 1);
      }
    } catch (error) {
      console.error("Error in submitting personal details:", error);
      alert("Submission failed. Check the console for error details.");
    }
  };
  return (
    <div className="max-w-3xl mx-auto my-6 p-2">
      <form
        onSubmit={handleSubmit}
        className="border p-6 border-t-[10px] rounded-2xl bg-white shadow-lg"
        style={{ borderColor: themeColor }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Personal Details
        </h2>
        <h3 className="font-semibold text-md mb-3">
          Add your personal details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="font-semibold mb-1">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              required
              onChange={handleChange}
              value={formData?.personalInfo?.firstName}
              placeholder="Enter first name"
              onFocus={() => setFocused("firstName")}
              onBlur={() => setFocused(null)}
              className={`p-2 border rounded-md focus:outline-none ${
                focused === "firstName" ? "ring-2" : ""
              }`}
              style={{
                borderColor: focused === "firstName" ? themeColor : "#ccc",
                boxShadow:
                  focused === "firstName"
                    ? `0 0 0 2px ${themeColor}55`
                    : "none",
              }}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="font-semibold mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              required
              onChange={handleChange}
              value={formData?.personalInfo?.lastName}
              placeholder="Enter last name"
              onFocus={() => setFocused("lastName")}
              onBlur={() => setFocused(null)}
              className={`p-2 border rounded-md focus:outline-none ${
                focused === "lastName" ? "ring-2" : ""
              }`}
              style={{
                borderColor: focused === "lastName" ? themeColor : "#ccc",
                boxShadow:
                  focused === "lastName" ? `0 0 0 2px ${themeColor}55` : "none",
              }}
            />
          </div>

          {/* Job Title */}
          <div className="flex flex-col">
            <label htmlFor="jobTitle" className="font-semibold mb-1">
              Job Title
            </label>
            <input
              name="jobTitle"
              type="text"
              required
              onChange={handleChange}
              value={formData?.personalInfo?.jobTitle}
              placeholder="Enter job title"
              onFocus={() => setFocused("jobTitle")}
              onBlur={() => setFocused(null)}
              className={`p-2 border rounded-md focus:outline-none ${
                focused === "jobTitle" ? "ring-2" : ""
              }`}
              style={{
                borderColor: focused === "jobTitle" ? themeColor : "#ccc",
                boxShadow:
                  focused === "jobTitle" ? `0 0 0 2px ${themeColor}55` : "none",
              }}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold mb-1">
              Address
            </label>
            <input
              name="address"
              type="text"
              required
              onChange={handleChange}
              value={formData?.personalInfo?.address}
              placeholder="Enter address"
              onFocus={() => setFocused("address")}
              onBlur={() => setFocused(null)}
              className={`p-2 border rounded-md focus:outline-none ${
                focused === "address" ? "ring-2" : ""
              }`}
              style={{
                borderColor: focused === "address" ? themeColor : "#ccc",
                boxShadow:
                  focused === "address" ? `0 0 0 2px ${themeColor}55` : "none",
              }}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="number"
              maxLength={10}
              required
              onChange={handleChange}
              value={formData?.personalInfo?.phone}
              placeholder="Enter phone number"
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused(null)}
              className={`p-2 border rounded-md focus:outline-none ${
                focused === "phone" ? "ring-2" : ""
              }`}
              style={{
                borderColor: focused === "phone" ? themeColor : "#ccc",
                boxShadow:
                  focused === "phone" ? `0 0 0 2px ${themeColor}55` : "none",
              }}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              value={formData?.personalInfo?.email}
              placeholder="Enter email"
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              className={`p-2 border rounded-md focus:outline-none ${
                focused === "email" ? "ring-2" : ""
              }`}
              style={{
                borderColor: focused === "email" ? themeColor : "#ccc",
                boxShadow:
                  focused === "email" ? `0 0 0 2px ${themeColor}55` : "none",
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{ background: themeColor }}
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalDetail;
