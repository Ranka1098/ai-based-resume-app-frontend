import FormContext from "@/context/FormContext";
import axios from "axios";
import { Phone } from "lucide-react";
import { useContext } from "react";

const PersonalDetail = ({ id, setActiveFormIndex, activeFormIndex }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", formData.personalInfo);

    // api call
    try {
      const res = await axios.put(`http://localhost:8080/personDetail/${id}`, {
        firstName: formData.personalInfo.firstName,
        lastName: formData.personalInfo.lastName,
        jobTitle: formData.personalInfo.jobTitle,
        address: formData.personalInfo.address,
        phone: formData.personalInfo.phone,
        email: formData.personalInfo.email,
      });

      if (res.status === 200) {
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

    console.log(formData);
  };
  return (
    <div className="max-w-3xl mx-auto my-6">
      <form
        onSubmit={handleSubmit}
        className="border p-6 border-t-[5px] border-t-purple-600 rounded-2xl bg-white shadow-lg"
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
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalDetail;
